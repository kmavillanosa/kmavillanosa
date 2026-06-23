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

		// Track every disposable so cleanup is a single loop.
		const disposables: { dispose(): void }[] = []
		const track = <T extends { dispose(): void }>(o: T): T => {
			disposables.push(o)
			return o
		}

		// --- The office room -------------------------------------------------------
		const deskGap = 7
		const roomLen = count * deskGap + 40

		// Floor + subtle grid.
		const floor = new THREE.Mesh(
			track(new THREE.PlaneGeometry(60, roomLen)),
			track(new THREE.MeshStandardMaterial({ color: 0x0b1220, roughness: 1 }))
		)
		floor.rotation.x = -Math.PI / 2
		floor.position.z = -(count * deskGap) / 2 + deskGap / 2
		scene.add(floor)

		const grid = new THREE.GridHelper(80, 80, accent.getHex(), accent.getHex())
		grid.position.set(0, 0.01, floor.position.z)
		const gridMat = grid.material as THREE.LineBasicMaterial
		gridMat.transparent = true
		gridMat.opacity = 0.1
		track(grid.geometry)
		track(gridMat)
		scene.add(grid)

		// Shared geometries.
		const g = {
			deskTop: track(new THREE.BoxGeometry(2.4, 0.09, 1.1)),
			deskLeg: track(new THREE.BoxGeometry(0.1, 1.0, 1.0)),
			monBase: track(new THREE.BoxGeometry(0.5, 0.04, 0.3)),
			monStand: track(new THREE.BoxGeometry(0.12, 0.45, 0.12)),
			screen: track(new THREE.BoxGeometry(1.35, 0.82, 0.06)),
			seat: track(new THREE.BoxGeometry(0.62, 0.1, 0.6)),
			back: track(new THREE.BoxGeometry(0.62, 0.75, 0.1)),
			torso: track(new THREE.BoxGeometry(0.55, 0.7, 0.34)),
			head: track(new THREE.SphereGeometry(0.22, 24, 24)),
			hair: track(new THREE.SphereGeometry(0.235, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.62)),
			arm: track(new THREE.BoxGeometry(0.13, 0.13, 0.62)),
			kb: track(new THREE.BoxGeometry(0.7, 0.05, 0.26)),
		}
		// Shared materials (the "set dressing" — same across every desk).
		const deskMat = track(new THREE.MeshStandardMaterial({ color: 0xb08968, roughness: 0.85 }))
		const darkMat = track(new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.6, metalness: 0.2 }))
		const skinMat = track(new THREE.MeshStandardMaterial({ color: 0xeab38a, roughness: 0.7 }))
		const hairMat = track(new THREE.MeshStandardMaterial({ color: 0x2b2b2b, roughness: 0.85 }))
		const maxAniso = renderer.capabilities.getMaxAnisotropy()

		/** Draws a monitor screen: dark background + the company logo (or monogram). */
		const makeScreen = (stop: (typeof stops)[number]) => {
			const c = document.createElement('canvas')
			c.width = 256
			c.height = 256
			const ctx = c.getContext('2d')!
			const tex = track(new THREE.CanvasTexture(c))
			tex.anisotropy = maxAniso
			let logoImg: HTMLImageElement | null = null
			const redraw = () => {
				const accentCss = readCssColor('--theme-accent', '#16a34a')
				ctx.fillStyle = '#0b1220'
				ctx.fillRect(0, 0, 256, 256)
				ctx.fillStyle = accentCss
				ctx.fillRect(0, 0, 256, 12) // title bar
				if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
					const box = 150
					const scale = Math.min(box / logoImg.naturalWidth, box / logoImg.naturalHeight)
					const w = logoImg.naturalWidth * scale
					const h = logoImg.naturalHeight * scale
					// White plate so transparent/letter logos read on the dark screen.
					ctx.fillStyle = '#ffffff'
					ctx.fillRect((256 - w) / 2 - 10, (256 - h) / 2 - 10 + 6, w + 20, h + 20)
					ctx.drawImage(logoImg, (256 - w) / 2, (256 - h) / 2 + 6, w, h)
				} else {
					ctx.fillStyle = accentCss
					ctx.font = 'bold 120px -apple-system, "Segoe UI", sans-serif'
					ctx.textAlign = 'center'
					ctx.textBaseline = 'middle'
					ctx.fillText((stop.company || '?').trim().charAt(0).toUpperCase(), 128, 140)
				}
				// Faint "code" lines.
				ctx.fillStyle = 'rgba(255,255,255,0.12)'
				for (let r = 0; r < 3; r++) ctx.fillRect(24, 210 + r * 12, 120 + r * 30, 4)
				tex.needsUpdate = true
			}
			redraw()
			if (stop.companyLogo && stop.companyLogo.trim()) {
				const img = new Image()
				img.onload = () => {
					logoImg = img
					redraw()
				}
				img.src = stop.companyLogo
			}
			return { tex, redraw }
		}

		interface Station {
			shirt: THREE.MeshStandardMaterial
			screenMat: THREE.MeshStandardMaterial
			arms: THREE.Mesh[]
			redraw: () => void
		}

		const stations: Station[] = stops.map((stop, i) => {
			const group = new THREE.Group()
			group.position.z = -i * deskGap

			// Desk
			const top = new THREE.Mesh(g.deskTop, deskMat)
			top.position.y = 1.0
			const legL = new THREE.Mesh(g.deskLeg, deskMat)
			legL.position.set(-1.1, 0.5, 0)
			const legR = new THREE.Mesh(g.deskLeg, deskMat)
			legR.position.set(1.1, 0.5, 0)
			group.add(top, legL, legR)

			// Monitor (faces +Z, toward the aisle/camera)
			const base = new THREE.Mesh(g.monBase, darkMat)
			base.position.set(0, 1.06, -0.3)
			const stand = new THREE.Mesh(g.monStand, darkMat)
			stand.position.set(0, 1.28, -0.3)
			const { tex, redraw } = makeScreen(stop)
			const screenMat = track(
				new THREE.MeshStandardMaterial({
					map: tex,
					emissive: 0xffffff,
					emissiveMap: tex,
					emissiveIntensity: 0.5,
					roughness: 0.4,
				})
			)
			const screen = new THREE.Mesh(g.screen, [darkMat, darkMat, darkMat, darkMat, screenMat, darkMat])
			screen.position.set(0, 1.62, -0.28)
			const kb = new THREE.Mesh(g.kb, darkMat)
			kb.position.set(0, 1.06, 0.25)
			group.add(base, stand, screen, kb)

			// Chair
			const seat = new THREE.Mesh(g.seat, darkMat)
			seat.position.set(0, 0.55, -0.95)
			const back = new THREE.Mesh(g.back, darkMat)
			back.position.set(0, 0.95, -1.25)
			group.add(seat, back)

			// The programmer — me, at every desk.
			const shirt = track(
				new THREE.MeshStandardMaterial({
					color: accent.clone(),
					emissive: accent.clone(),
					emissiveIntensity: 0,
					roughness: 0.6,
				})
			)
			const torso = new THREE.Mesh(g.torso, shirt)
			torso.position.set(0, 0.95, -0.7)
			const head = new THREE.Mesh(g.head, skinMat)
			head.position.set(0, 1.45, -0.7)
			const hair = new THREE.Mesh(g.hair, hairMat)
			hair.position.set(0, 1.47, -0.7)
			const armL = new THREE.Mesh(g.arm, shirt)
			armL.position.set(-0.28, 1.05, -0.35)
			armL.rotation.x = -0.45
			const armR = new THREE.Mesh(g.arm, shirt)
			armR.position.set(0.28, 1.05, -0.35)
			armR.rotation.x = -0.45
			group.add(torso, head, hair, armL, armR)

			scene.add(group)
			return { shirt, screenMat, arms: [armL, armR], redraw }
		})

		// Lighting
		scene.add(new THREE.HemisphereLight(0xffffff, 0x202830, 0.7))
		scene.add(new THREE.AmbientLight(0xffffff, 0.35))
		const keyLight = new THREE.PointLight(0xffffff, 1.2, 80)
		scene.add(keyLight)
		const accentLight = new THREE.PointLight(accent.getHex(), 1.6, 26)
		scene.add(accentLight)

		// --- Theme reactivity ------------------------------------------------------
		const applyAccent = () => {
			accent = new THREE.Color(readCssColor('--theme-accent', '#16a34a'))
			gridMat.color = accent
			accentLight.color = accent
			stations.forEach((s) => {
				s.shirt.color = accent
				s.shirt.emissive = accent
				s.redraw()
			})
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
		const clock = new THREE.Clock()

		const tick = () => {
			raf = requestAnimationFrame(tick)
			const t = clock.getElapsedTime()
			// Ease the camera toward the scroll target.
			smooth += (progressRef.current - smooth) * 0.03

			const u = clamp(smooth, 0, 1)
			const f = u * (count - 1) // continuous focus position
			const fi = Math.round(f)
			const focusZ = -f * deskGap

			// Camera walks down the aisle at a 3/4 angle to the active desk.
			camPos.set(2.2, 1.75, focusZ + 5.0)
			camera.position.lerp(camPos, 0.06)
			lookAt.set(0, 1.35, focusZ - 0.4)
			camera.lookAt(lookAt)
			keyLight.position.set(camera.position.x, camera.position.y + 2, camera.position.z)
			accentLight.position.set(0, 2.4, -fi * deskGap - 0.3)

			stations.forEach((s, i) => {
				const isActive = i === fi
				// Highlight the active desk: shirt glow + brighter screen.
				s.shirt.emissiveIntensity += ((isActive ? 0.45 : 0) - s.shirt.emissiveIntensity) * 0.1
				s.screenMat.emissiveIntensity += ((isActive ? 1.1 : 0.4) - s.screenMat.emissiveIntensity) * 0.1
				// Typing bob on the active programmer's arms.
				s.arms[0].position.y = 1.05 + (isActive ? Math.sin(t * 9) * 0.045 : 0)
				s.arms[1].position.y = 1.05 + (isActive ? Math.sin(t * 9 + 1.1) * 0.045 : 0)
			})

			renderer.render(scene, camera)
		}
		tick()

		return () => {
			cancelAnimationFrame(raf)
			window.removeEventListener('scroll', onScroll)
			ro.disconnect()
			themeObserver.disconnect()
			disposables.forEach((d) => d.dispose())
			renderer.dispose()
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
			style={{ height: `${count * 115 + 60}vh` }}
			aria-label="3D tour of my career"
		>
			<div className="sticky top-0 h-screen w-full overflow-hidden">
				<canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

				{/* Heading */}
				<div className="pointer-events-none absolute top-0 inset-x-0 pt-20 sm:pt-24 px-6 text-center text-white">
					<span className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>Career tour</span>
					<h2 className="mt-3 text-2xl sm:text-3xl font-bold drop-shadow">Every desk, a different chapter</h2>
					<p className="mt-1 text-sm text-white/70">Scroll to walk through the office — that's me at every desk</p>
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
