import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useExperiences } from '@/hooks/useExperiences'

/** Reads a CSS custom property from :root as a hex/rgb string. */
function readCssColor(name: string, fallback: string): string {
	if (typeof window === 'undefined') return fallback
	const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
	return v || fallback
}

const prefersReducedMotion = () =>
	typeof window !== 'undefined' &&
	window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function clamp(v: number, min: number, max: number) {
	return Math.min(max, Math.max(min, v))
}

function CareerTour() {
	const { data: experiences } = useExperiences()
	const sectionRef = useRef<HTMLDivElement>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const progressRef = useRef(0)
	const [activeIndex, setActiveIndex] = useState(0)
	const reduced = prefersReducedMotion()

	// Most-recent-first from the loader; reverse so the tour reads start → now.
	const stops = [...experiences].reverse()
	const count = stops.length

	useEffect(() => {
		if (reduced || count === 0) return
		const canvas = canvasRef.current
		const section = sectionRef.current
		if (!canvas || !section) return

		const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200)

		let accent = new THREE.Color(readCssColor('--theme-accent', '#16a34a'))

		// --- Build the career path -------------------------------------------------
		const gap = 9
		const spread = 5
		const pts = stops.map(
			(_, i) =>
				new THREE.Vector3(
					Math.sin(i * 0.9) * spread,
					Math.cos(i * 0.6) * spread * 0.45,
					-i * gap
				)
		)
		// Pad ends so the camera has runway before the first / after the last node.
		const curvePts = [
			pts[0].clone().add(new THREE.Vector3(0, 0, gap)),
			...pts,
			pts[pts.length - 1].clone().add(new THREE.Vector3(0, 0, -gap)),
		]
		const curve = new THREE.CatmullRomCurve3(curvePts, false, 'catmullrom', 0.4)

		// Glowing ribbon along the path.
		const tubeGeo = new THREE.TubeGeometry(curve, 240, 0.06, 8, false)
		const tubeMat = new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.35 })
		const tube = new THREE.Mesh(tubeGeo, tubeMat)
		scene.add(tube)

		// Node markers + halos at each career stop.
		const nodes: THREE.Mesh[] = []
		const halos: THREE.Mesh[] = []
		const nodeGeo = new THREE.SphereGeometry(0.55, 32, 32)
		const haloGeo = new THREE.SphereGeometry(0.9, 24, 24)
		pts.forEach((p) => {
			const node = new THREE.Mesh(
				nodeGeo,
				new THREE.MeshStandardMaterial({
					color: accent,
					emissive: accent,
					emissiveIntensity: 0.7,
					roughness: 0.3,
					metalness: 0.1,
				})
			)
			node.position.copy(p)
			scene.add(node)
			nodes.push(node)

			const halo = new THREE.Mesh(
				haloGeo,
				new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.12 })
			)
			halo.position.copy(p)
			scene.add(halo)
			halos.push(halo)
		})

		// Starfield for depth.
		const starCount = 600
		const starPos = new Float32Array(starCount * 3)
		for (let i = 0; i < starCount; i++) {
			starPos[i * 3] = (Math.random() - 0.5) * 80
			starPos[i * 3 + 1] = (Math.random() - 0.5) * 60
			starPos[i * 3 + 2] = -Math.random() * count * gap - 5
		}
		const starGeo = new THREE.BufferGeometry()
		starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
		const stars = new THREE.Points(
			starGeo,
			new THREE.PointsMaterial({ color: accent, size: 0.12, transparent: true, opacity: 0.5 })
		)
		scene.add(stars)

		scene.add(new THREE.AmbientLight(0xffffff, 0.6))
		const keyLight = new THREE.PointLight(accent.getHex(), 2, 60)
		scene.add(keyLight)

		// --- Theme reactivity ------------------------------------------------------
		const applyAccent = () => {
			accent = new THREE.Color(readCssColor('--theme-accent', '#16a34a'))
			tubeMat.color = accent
			stars.material.color = accent
			keyLight.color = accent
			nodes.forEach((n) => {
				const m = n.material as THREE.MeshStandardMaterial
				m.color = accent
				m.emissive = accent
			})
			halos.forEach((h) => ((h.material as THREE.MeshBasicMaterial).color = accent))
		}
		const themeObserver = new MutationObserver(applyAccent)
		themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

		// --- Sizing ----------------------------------------------------------------
		const resize = () => {
			const w = canvas.clientWidth
			const h = canvas.clientHeight
			renderer.setSize(w, h, false)
			camera.aspect = w / h
			camera.updateProjectionMatrix()
		}
		resize()
		const ro = new ResizeObserver(resize)
		ro.observe(canvas)

		// --- Scroll → progress -----------------------------------------------------
		let lastIdx = -1
		const onScroll = () => {
			const rect = section.getBoundingClientRect()
			const total = section.offsetHeight - window.innerHeight
			const scrolled = clamp(-rect.top, 0, Math.max(total, 1))
			const p = total > 0 ? scrolled / total : 0
			progressRef.current = p
			const idx = Math.round(p * (count - 1))
			if (idx !== lastIdx) {
				lastIdx = idx
				setActiveIndex(idx)
			}
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		onScroll()

		// --- Render loop -----------------------------------------------------------
		let raf = 0
		let smooth = 0
		const camPos = new THREE.Vector3()
		const lookAt = new THREE.Vector3()
		const tmp = new THREE.Vector3()
		const clock = new THREE.Clock()

		const tick = () => {
			raf = requestAnimationFrame(tick)
			const t = clock.getElapsedTime()
			// Ease the camera toward the scroll target.
			smooth += (progressRef.current - smooth) * 0.06

			const u = clamp(smooth, 0, 1)
			// Map progress onto the inner (un-padded) span of the curve.
			const lo = 1 / (count + 1)
			const span = (count - 1) / (count + 1)
			const cu = lo + u * span
			curve.getPointAt(clamp(cu, 0, 1), tmp)
			camPos.copy(tmp).add(new THREE.Vector3(0, 2.2, 7.5))
			camera.position.lerp(camPos, 0.1)
			curve.getPointAt(clamp(cu + 0.03, 0, 1), lookAt)
			camera.lookAt(lookAt)
			keyLight.position.copy(camera.position)

			// Pulse the active node, settle the rest.
			nodes.forEach((n, i) => {
				const isActive = i === Math.round(u * (count - 1))
				const target = isActive ? 1.35 + Math.sin(t * 3) * 0.12 : 1
				n.scale.lerp(tmp.set(target, target, target), 0.12)
				const m = n.material as THREE.MeshStandardMaterial
				m.emissiveIntensity += ((isActive ? 1.3 : 0.55) - m.emissiveIntensity) * 0.12
				halos[i].scale.copy(n.scale)
				halos[i].rotation.y = t * 0.3
			})
			stars.rotation.z = t * 0.01

			renderer.render(scene, camera)
		}
		tick()

		return () => {
			cancelAnimationFrame(raf)
			window.removeEventListener('scroll', onScroll)
			ro.disconnect()
			themeObserver.disconnect()
			renderer.dispose()
			tubeGeo.dispose()
			tubeMat.dispose()
			nodeGeo.dispose()
			haloGeo.dispose()
			starGeo.dispose()
			nodes.forEach((n) => (n.material as THREE.Material).dispose())
			halos.forEach((h) => (h.material as THREE.Material).dispose())
		}
	}, [count, reduced, stops])

	if (count === 0) return null

	const active = stops[clamp(activeIndex, 0, count - 1)]

	// Reduced-motion / no-WebGL friendly: skip the canvas, keep it accessible.
	if (reduced) {
		return (
			<section id="career-tour-section" className="py-14 sm:py-20 px-4 sm:px-6 bg-theme-cta-bg text-theme-accent-foreground">
				<div className="max-w-3xl mx-auto text-center">
					<span className="section-eyebrow mb-3" style={{ color: 'rgba(255,255,255,0.85)' }}>Career tour</span>
					<h2 className="text-2xl sm:text-3xl font-bold mt-3 mb-3">A journey through my career</h2>
					<p className="text-sm sm:text-base text-white/85">
						{count} stops, from {stops[0]?.company} to {stops[count - 1]?.company}. Scroll down to the
						timeline below for the full story.
					</p>
				</div>
			</section>
		)
	}

	return (
		<section
			id="career-tour-section"
			ref={sectionRef}
			className="relative bg-theme-cta-bg"
			style={{ height: `${count * 75 + 60}vh` }}
			aria-label="3D tour of my career"
		>
			<div className="sticky top-0 h-screen w-full overflow-hidden">
				<canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

				{/* Heading */}
				<div className="pointer-events-none absolute top-0 inset-x-0 pt-20 sm:pt-24 px-6 text-center text-white">
					<span className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>Career tour</span>
					<h2 className="mt-3 text-2xl sm:text-3xl font-bold drop-shadow">A journey through my career</h2>
					<p className="mt-1 text-sm text-white/70">Scroll to fly through each chapter</p>
				</div>

				{/* Active stop card */}
				<div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[min(92%,560px)] px-2">
					<div className="rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 p-5 sm:p-6 text-white shadow-2xl transition-all">
						<div className="flex items-center gap-2 text-xs font-semibold text-white/70 mb-1.5">
							<span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-theme-accent text-theme-accent-foreground text-[11px]">
								{activeIndex + 1}
							</span>
							<span>{active?.period}</span>
							{active?.type && <span className="text-white/40">· {active.type}</span>}
						</div>
						<h3 className="text-lg sm:text-xl font-bold leading-tight">{active?.position}</h3>
						<p className="text-sm text-white/80 mt-0.5">{active?.company}</p>
						{active?.companyLocation && (
							<p className="text-xs text-white/55 mt-1">{active.companyLocation}</p>
						)}

						{/* Progress dots */}
						<div className="flex items-center gap-1.5 mt-4">
							{stops.map((s, i) => (
								<span
									key={s.slug}
									className={`h-1.5 rounded-full transition-all ${
										i === activeIndex ? 'w-6 bg-theme-accent' : 'w-1.5 bg-white/30'
									}`}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CareerTour
