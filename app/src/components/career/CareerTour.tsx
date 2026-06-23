import { useEffect, useMemo, useRef, useState } from 'react'
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
	// Memoized so a re-render (e.g. on scroll) doesn't churn the scene effect.
	const stops = useMemo(() => [...experiences].reverse(), [experiences])
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
			deskTop: track(new THREE.BoxGeometry(3.0, 0.09, 1.15)),
			deskLeg: track(new THREE.BoxGeometry(0.1, 1.0, 1.05)),
			monBase: track(new THREE.BoxGeometry(0.5, 0.04, 0.3)),
			monStand: track(new THREE.BoxGeometry(0.12, 0.5, 0.12)),
			screen: track(new THREE.BoxGeometry(1.25, 0.76, 0.06)),
			kb: track(new THREE.BoxGeometry(0.8, 0.05, 0.28)),
			seat: track(new THREE.BoxGeometry(0.62, 0.1, 0.6)),
			back: track(new THREE.BoxGeometry(0.62, 0.75, 0.1)),
			// Body
			hips: track(new THREE.BoxGeometry(0.52, 0.34, 0.42)),
			torso: track(new THREE.BoxGeometry(0.5, 0.66, 0.32)),
			jacket: track(new THREE.BoxGeometry(0.62, 0.66, 0.42)),
			lapel: track(new THREE.BoxGeometry(0.07, 0.42, 0.05)),
			tie: track(new THREE.BoxGeometry(0.08, 0.34, 0.04)),
			neck: track(new THREE.CylinderGeometry(0.09, 0.1, 0.18, 16)),
			head: track(new THREE.SphereGeometry(0.21, 24, 24)),
			hair: track(new THREE.SphereGeometry(0.225, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.62)),
			shoulder: track(new THREE.SphereGeometry(0.13, 16, 16)),
			upperArm: track(new THREE.BoxGeometry(0.14, 0.42, 0.14)),
			foreArm: track(new THREE.BoxGeometry(0.12, 0.12, 0.46)),
			hand: track(new THREE.BoxGeometry(0.14, 0.08, 0.17)),
			thigh: track(new THREE.BoxGeometry(0.18, 0.16, 0.54)),
			shin: track(new THREE.BoxGeometry(0.16, 0.5, 0.16)),
			shoe: track(new THREE.BoxGeometry(0.2, 0.1, 0.34)),
		}
		// Shared "set dressing" materials.
		const deskMat = track(new THREE.MeshStandardMaterial({ color: 0xb08968, roughness: 0.85 }))
		const darkMat = track(new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.6, metalness: 0.2 }))
		const skinMat = track(new THREE.MeshStandardMaterial({ color: 0xeab38a, roughness: 0.7 }))
		const hairMat = track(new THREE.MeshStandardMaterial({ color: 0x2b2b2b, roughness: 0.85 }))
		const shoeMat = track(new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.7 }))
		const maxAniso = renderer.capabilities.getMaxAnisotropy()

		// Cache attire materials so stations of the same tier share them.
		const matCache = new Map<string, THREE.MeshStandardMaterial>()
		const mat = (key: string, color: number) => {
			let m = matCache.get(key)
			if (!m) {
				m = track(new THREE.MeshStandardMaterial({ color, roughness: 0.72 }))
				matCache.set(key, m)
			}
			return m
		}

		// Attire progression: earliest role → latest. id keys the material cache.
		interface Tier {
			id: number
			top: number
			pants: number
			jacket?: number
			tie?: number
		}
		const TIERS: Tier[] = [
			{ id: 0, top: 0x14b8a6, pants: 0x1e3a5f }, // student — casual tee + jeans
			{ id: 1, top: 0x0ea5e9, pants: 0x4b5563 }, // junior — polo
			{ id: 2, top: 0xe5e7eb, pants: 0x374151, tie: 0x1e40af }, // mid — dress shirt + tie
			{ id: 3, top: 0xe5e7eb, pants: 0x111827, jacket: 0x1f2937, tie: 0x991b1b }, // senior — suit
		]
		const tierFor = (frac: number): Tier =>
			frac < 0.25 ? TIERS[0] : frac < 0.5 ? TIERS[1] : frac < 0.78 ? TIERS[2] : TIERS[3]

		/** Builds an anatomical seated figure with stage-appropriate attire. */
		const buildPerson = (parent: THREE.Group, tier: Tier): THREE.Group[] => {
			const person = new THREE.Group()
			person.position.set(0, 0, -0.35)
			const topMat = mat(`top${tier.id}`, tier.top)
			const pantsMat = mat(`pants${tier.id}`, tier.pants)
			const sleeveMat = tier.jacket ? mat(`jacket${tier.id}`, tier.jacket) : topMat

			const hips = new THREE.Mesh(g.hips, pantsMat)
			hips.position.set(0, 0.66, -0.05)
			person.add(hips)

			for (const sx of [-1, 1]) {
				const thigh = new THREE.Mesh(g.thigh, pantsMat)
				thigh.position.set(0.14 * sx, 0.62, 0.18)
				const shin = new THREE.Mesh(g.shin, pantsMat)
				shin.position.set(0.14 * sx, 0.34, 0.44)
				const shoe = new THREE.Mesh(g.shoe, shoeMat)
				shoe.position.set(0.14 * sx, 0.06, 0.56)
				person.add(thigh, shin, shoe)
			}

			const torso = new THREE.Mesh(g.torso, topMat)
			torso.position.set(0, 1.08, -0.08)
			torso.rotation.x = -0.06
			person.add(torso)

			if (tier.jacket) {
				const jacketMat = mat(`jacket${tier.id}`, tier.jacket)
				const jacket = new THREE.Mesh(g.jacket, jacketMat)
				jacket.position.set(0, 1.06, -0.09)
				jacket.rotation.x = -0.06
				person.add(jacket)
				for (const sx of [-1, 1]) {
					const lapel = new THREE.Mesh(g.lapel, jacketMat)
					lapel.position.set(0.1 * sx, 1.2, 0.13)
					lapel.rotation.z = 0.2 * sx
					person.add(lapel)
				}
			}
			if (tier.tie) {
				const tie = new THREE.Mesh(g.tie, mat(`tie${tier.id}`, tier.tie))
				tie.position.set(0, 1.08, 0.15)
				person.add(tie)
			}

			const neck = new THREE.Mesh(g.neck, skinMat)
			neck.position.set(0, 1.42, -0.06)
			const head = new THREE.Mesh(g.head, skinMat)
			head.position.set(0, 1.58, -0.04)
			const hair = new THREE.Mesh(g.hair, hairMat)
			hair.position.set(0, 1.6, -0.05)
			person.add(neck, head, hair)

			const armGroups: THREE.Group[] = []
			for (const sx of [-1, 1]) {
				const ag = new THREE.Group()
				ag.position.set(0.31 * sx, 1.34, -0.08)
				const shoulder = new THREE.Mesh(g.shoulder, sleeveMat)
				const upper = new THREE.Mesh(g.upperArm, sleeveMat)
				upper.position.set(0, -0.2, 0.02)
				const fore = new THREE.Mesh(g.foreArm, sleeveMat)
				fore.position.set(0, -0.4, 0.22)
				const hand = new THREE.Mesh(g.hand, skinMat)
				hand.position.set(0, -0.42, 0.46)
				ag.add(shoulder, upper, fore, hand)
				person.add(ag)
				armGroups.push(ag)
			}

			parent.add(person)
			return armGroups
		}

		/** A monitor screen showing the company logo (or monogram). */
		const makeLogoScreen = (stop: (typeof stops)[number]) => {
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
				ctx.fillRect(0, 0, 256, 12)
				if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
					const box = 150
					const scale = Math.min(box / logoImg.naturalWidth, box / logoImg.naturalHeight)
					const w = logoImg.naturalWidth * scale
					const h = logoImg.naturalHeight * scale
					ctx.fillStyle = '#ffffff'
					ctx.fillRect((256 - w) / 2 - 10, (256 - h) / 2 - 4, w + 20, h + 20)
					ctx.drawImage(logoImg, (256 - w) / 2, (256 - h) / 2 + 6, w, h)
				} else {
					ctx.fillStyle = accentCss
					ctx.font = 'bold 120px -apple-system, "Segoe UI", sans-serif'
					ctx.textAlign = 'center'
					ctx.textBaseline = 'middle'
					ctx.fillText((stop.company || '?').trim().charAt(0).toUpperCase(), 128, 140)
				}
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

		// Shared "code editor" texture for the secondary monitor (same on every desk).
		const codeCanvas = document.createElement('canvas')
		codeCanvas.width = 256
		codeCanvas.height = 256
		const codeCtx = codeCanvas.getContext('2d')!
		const codeTex = track(new THREE.CanvasTexture(codeCanvas))
		codeTex.anisotropy = maxAniso
		const drawCode = () => {
			const accentCss = readCssColor('--theme-accent', '#16a34a')
			codeCtx.fillStyle = '#0b1220'
			codeCtx.fillRect(0, 0, 256, 256)
			codeCtx.fillStyle = accentCss
			codeCtx.fillRect(0, 0, 256, 12)
			const palette = ['rgba(148,163,184,0.7)', accentCss, 'rgba(248,250,252,0.55)']
			for (let r = 0; r < 16; r++) {
				codeCtx.fillStyle = palette[r % palette.length]
				const x = 16 + ((r * 37) % 60)
				const w = 50 + ((r * 53) % 150)
				codeCtx.fillRect(x, 28 + r * 13, w, 5)
			}
			codeTex.needsUpdate = true
		}
		drawCode()
		const codeScreenMat = track(
			new THREE.MeshStandardMaterial({
				map: codeTex,
				emissive: 0xffffff,
				emissiveMap: codeTex,
				emissiveIntensity: 0.45,
				roughness: 0.4,
			})
		)

		/** Adds a monitor (base + stand + screen) at x, angled by rotY, to a group. */
		const addMonitor = (parent: THREE.Group, x: number, screenMat: THREE.Material, rotY: number) => {
			const m = new THREE.Group()
			m.position.set(x, 0, -0.42)
			m.rotation.y = rotY
			const base = new THREE.Mesh(g.monBase, darkMat)
			base.position.y = 1.06
			const stand = new THREE.Mesh(g.monStand, darkMat)
			stand.position.y = 1.32
			const screen = new THREE.Mesh(g.screen, [darkMat, darkMat, darkMat, darkMat, screenMat, darkMat])
			screen.position.y = 1.68
			m.add(base, stand, screen)
			parent.add(m)
		}

		interface Station {
			logoMat: THREE.MeshStandardMaterial
			armGroups: THREE.Group[]
			redraw: () => void
		}

		const stations: Station[] = stops.map((stop, i) => {
			const group = new THREE.Group()
			group.position.z = -i * deskGap
			const tier = tierFor(count > 1 ? i / (count - 1) : 1)

			// Desk
			const top = new THREE.Mesh(g.deskTop, deskMat)
			top.position.y = 1.0
			const legL = new THREE.Mesh(g.deskLeg, deskMat)
			legL.position.set(-1.4, 0.5, 0)
			const legR = new THREE.Mesh(g.deskLeg, deskMat)
			legR.position.set(1.4, 0.5, 0)
			const kb = new THREE.Mesh(g.kb, darkMat)
			kb.position.set(0, 1.06, 0.05)
			group.add(top, legL, legR, kb)

			// Dual-monitor setup flanking the person: logo (left) + code (right).
			const { tex, redraw } = makeLogoScreen(stop)
			const logoMat = track(
				new THREE.MeshStandardMaterial({
					map: tex,
					emissive: 0xffffff,
					emissiveMap: tex,
					emissiveIntensity: 0.5,
					roughness: 0.4,
				})
			)
			addMonitor(group, -1.15, logoMat, 0.32)
			addMonitor(group, 1.15, codeScreenMat, -0.32)

			// Chair (behind the person)
			const seat = new THREE.Mesh(g.seat, darkMat)
			seat.position.set(0, 0.55, -0.45)
			const back = new THREE.Mesh(g.back, darkMat)
			back.position.set(0, 0.95, -0.72)
			group.add(seat, back)

			// The programmer — me, dressed for the era.
			const armGroups = buildPerson(group, tier)

			scene.add(group)
			return { logoMat, armGroups, redraw }
		})

		// Lighting
		scene.add(new THREE.HemisphereLight(0xffffff, 0x202830, 0.75))
		scene.add(new THREE.AmbientLight(0xffffff, 0.4))
		const keyLight = new THREE.PointLight(0xffffff, 1.2, 80)
		scene.add(keyLight)
		const accentLight = new THREE.PointLight(accent.getHex(), 1.6, 26)
		scene.add(accentLight)

		// --- Theme reactivity ------------------------------------------------------
		const applyAccent = () => {
			accent = new THREE.Color(readCssColor('--theme-accent', '#16a34a'))
			gridMat.color = accent
			accentLight.color = accent
			drawCode()
			stations.forEach((s) => s.redraw())
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
		let smooth = progressRef.current // seed from current scroll, no replay from desk 1
		let firstFrame = true
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

			// Camera holds a slightly raised 3/4 angle on the active desk.
			camPos.set(1.5, 1.95, focusZ + 5.3)
			if (firstFrame) {
				camera.position.copy(camPos)
				firstFrame = false
			} else {
				camera.position.lerp(camPos, 0.06)
			}
			lookAt.set(0, 1.25, focusZ - 0.45)
			camera.lookAt(lookAt)
			keyLight.position.set(camera.position.x, camera.position.y + 2, camera.position.z)
			accentLight.position.set(0, 2.5, -fi * deskGap + 0.2)
			accentLight.intensity = 1.4 + Math.sin(t * 2) * 0.25

			stations.forEach((s, i) => {
				const isActive = i === fi
				// Brighten the active desk's logo screen.
				s.logoMat.emissiveIntensity += ((isActive ? 1.15 : 0.45) - s.logoMat.emissiveIntensity) * 0.1
				// Typing motion: rock the forearms at the shoulder pivot.
				s.armGroups[0].rotation.x = isActive ? Math.sin(t * 9) * 0.06 : 0
				s.armGroups[1].rotation.x = isActive ? Math.sin(t * 9 + 1.1) * 0.06 : 0
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
