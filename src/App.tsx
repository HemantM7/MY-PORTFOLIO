import { useEffect, useState, useMemo, type ChangeEvent } from 'react'
import { Element, Link, Events, scroller } from 'react-scroll'
import { motion, useScroll, useSpring } from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
	Button,
	IconButton,
	Container,
	TextField,
	Card,
	CardContent,
	CardMedia,
	Chip,
	Snackbar,
	Alert,
	Avatar,
} from '@mui/material'
import { GitHub, LinkedIn, Instagram, InfoOutline } from '@mui/icons-material'
import { FaArrowUp } from 'react-icons/fa'
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined';
import PersonIcon from '@mui/icons-material/Person';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaptopMacRoundedIcon from '@mui/icons-material/LaptopMacRounded';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import CodeIcon from '@mui/icons-material/Code';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SchoolIcon from '@mui/icons-material/School';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import FolderIcon from '@mui/icons-material/Folder';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MailIcon from '@mui/icons-material/Mail';


const sections = ['home', 'about', 'projects', 'services', 'contact'] as const
type SectionId = typeof sections[number]

function BackgroundAnimation() {
	const circleData = useMemo(() => {
		return Array.from({ length: 8 }, () => ({
			width: Math.random() * 300 + 100,
			height: Math.random() * 300 + 100,
			left: Math.random() * 100,
			top: Math.random() * 100,
			x: Math.random() * 200 - 100,
			y: Math.random() * 200 - 100,
			duration: Math.random() * 10 + 15,
			delay: Math.random() * 5,
		}))
	}, [])

	return (
		<div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
			{circleData.map((data, i) => (
				<motion.div
					key={i}
					className="absolute rounded-full bg-gray-200/50"
					style={{
						width: data.width,
						height: data.height,
						left: `${data.left}%`,
						top: `${data.top}%`,
					}}
					animate={{
						x: [0, data.x, 0],
						y: [0, data.y, 0],
						scale: [1, 1.2, 1],
						opacity: [0.2, 0.4, 0.2],
					}}
					transition={{
						duration: data.duration,
						repeat: Infinity,
						ease: "easeInOut",
						delay: data.delay,
					}}
				/>
			))}
			{/* Animated gradient orbs */}
			<motion.div
				className="absolute w-96 h-96 rounded-full bg-gray-500/20 blur-3xl"
				style={{ left: '10%', top: '20%' }}
				animate={{
					x: [0, 100, 0],
					y: [0, 80, 0],
					scale: [1, 1.3, 1],
				}}
				transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
			/>
			<motion.div
				className="absolute w-96 h-96 rounded-full bg-gray-400/30 blur-3xl"
				style={{ right: '10%', bottom: '20%' }}
				animate={{
					x: [0, -100, 0],
					y: [0, -80, 0],
					scale: [1, 1.4, 1],
				}}
				transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
			/>
			<motion.div
				className="absolute w-36 h-36 rounded-full bg-gray-400/30 blur-3xl"
				style={{ right: '10%', bottom: '20%' }}
				animate={{
					x: [0, 10, 0],
					y: [0, -30, 0],
					scale: [1, 1.7, 1],
				}}
				transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
			/>
		</div>
	)
}

/**
 * TypingEffect
 * Cycles through an array of phrases, typing and deleting each one.
 */
function TypingEffect({ words, typingSpeed = 90, deletingSpeed = 40, pause = 1200 }: { words: string[]; typingSpeed?: number; deletingSpeed?: number; pause?: number }) {
	const [wordIndex, setWordIndex] = useState(0)
	const [displayed, setDisplayed] = useState('')
	const [isDeleting, setIsDeleting] = useState(false)

	useEffect(() => {
		if (!words || words.length === 0) return
		const current = words[wordIndex]
		let timeout: number

		if (!isDeleting && displayed === current) {
			// pause at end of word, then start deleting
			timeout = window.setTimeout(() => setIsDeleting(true), pause)
		} else if (isDeleting && displayed === '') {
			// move to next word after deleting
			timeout = window.setTimeout(() => {
				setIsDeleting(false)
				setWordIndex((wi) => (wi + 1) % words.length)
			}, 200)
		} else {
			// type or delete one character
			timeout = window.setTimeout(() => {
				setDisplayed((prev) => {
					if (isDeleting) return current.slice(0, prev.length - 1)
					return current.slice(0, prev.length + 1)
				})
			}, isDeleting ? deletingSpeed : typingSpeed)
		}

		return () => window.clearTimeout(timeout)
	}, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pause])

	return (
		<span className="typing-text">
			{displayed}
			<span className="typing-cursor">|</span>
		</span>
	)
}


export default function App() {
	const [active, setActive] = useState<SectionId>('home')
	const [showTop, setShowTop] = useState(false)
	const { scrollYProgress } = useScroll()
	const progressX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 })

	useEffect(() => {
		AOS.init({ duration: 700, once: true })
		Events.scrollEvent.register('begin', () => { })
		Events.scrollEvent.register('end', () => { })

		const onScroll = () => setShowTop(window.scrollY > 500)
		window.addEventListener('scroll', onScroll)
		return () => {
			window.removeEventListener('scroll', onScroll)
			Events.scrollEvent.remove('begin')
			Events.scrollEvent.remove('end')
		}
	}, [])

	// Fake loader timeout
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const t = setTimeout(() => setLoading(false), 1200)
		return () => clearTimeout(t)
	}, [])

	if (loading) return <Loader />

	return (
		<div className="relative">
			<BackgroundAnimation />
			<motion.div style={{ scaleX: progressX }} className="fixed left-0 top-0 right-0 h-1 origin-left bg-accent.blue z-[1200]" />
			<NavBar active={active} setActive={setActive} />
			<div className="relative z-10">
				<Element name="home">
					<div className="py-10 md:py-0"><Home /></div>
				</Element>
				<Element name="about">
					<div className="py-10 md:py-0"><About /></div>
				</Element>
				<Element name="projects">
					<div className="py-10 md:py-0"><Projects /></div>
				</Element>
				<Element name="services">
					<div className="py-10 md:py-0"><Services /></div>
				</Element>
				<Element name="contact">
					<div className="py-10 md:py-0"><Contact /></div>
				</Element>
				<Footer />
			</div>
			{showTop && (
				<button
					aria-label="Back to top"
					className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg border border-black hover:bg-white hover:text-black z-[1300]"
					onClick={() => scroller.scrollTo('home', { smooth: true, duration: 500, offset: -80 })}
				>
					<FaArrowUp />
				</button>
			)}
		</div>
	)
}

function NavBar({ active, setActive }: { active: SectionId; setActive: (s: SectionId) => void }) {
	const [open, setOpen] = useState(false)
	const navItemBase = 'px-4 py-2 rounded-full text-base md:text-lg font-semibold transition-colors duration-200 inline-flex items-center gap-2'
	const meta: Record<SectionId, { label: string; Icon: any }> = {
		home: { label: 'Home', Icon: HomeOutlinedIcon },
		about: { label: 'About', Icon: InfoOutline },
		projects: { label: 'Projects', Icon: FolderCopyOutlinedIcon },
		services: { label: 'Services', Icon: CodeIcon },
		contact: { label: 'Contact', Icon: MailOutlineOutlinedIcon },
	}
	return (
		<div className="sticky top-4 z-[1100]">
			<div className="container-pad flex justify-center">
				<motion.nav
					initial={{ opacity: 0, y: -8 }}
					animate={{ opacity: 1, y: 0 }}
					className="w-full md:w-auto bg-white/90 backdrop-blur rounded-full shadow-card border border-black/5 px-5 py-3 flex items-center gap-4"
				>
					<div className="flex-1 md:flex-none font-bold ml-2 text-lg md:text-xl">
						<Avatar
							alt="HM"
							sx={{ width: 40, height: 40, bgcolor: 'black', color: 'white', fontWeight: 700, cursor: 'pointer' }}
							onClick={() => scroller.scrollTo('home', { smooth: true, duration: 500, offset: -80 })}
						>
							HM
						</Avatar>
					</div>
					<button
						aria-label="Toggle menu"
						className="md:hidden ml-auto mr-2 inline-flex flex-col gap-1.5"
						onClick={() => setOpen((v) => !v)}
					>
						<span className="block h-0.5 w-6 bg-black rounded" />
						<span className="block h-0.5 w-6 bg-black rounded" />
						<span className="block h-0.5 w-6 bg-black rounded" />
					</button>
					<div className="hidden md:flex items-center gap-2">
						{sections.map((id) => {
							const { label, Icon } = meta[id]
							return (
								<Link key={id} to={id} spy smooth offset={-80} duration={500} onSetActive={() => setActive(id)}>
									<span
										className={
											active === id
												? `${navItemBase} bg-black text-white`
												: `${navItemBase} text-black hover:bg-black hover:text-white`
										}
									>
										<Icon fontSize="medium" /> {label}
									</span>
								</Link>
							)
						})}
					</div>
				</motion.nav>
			</div>
			{open && (
				<div className="container-pad md:hidden">
					<motion.div
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						className="mt-2 bg-white rounded-2xl shadow-card border border-black/5 p-2"
					>
						<div className="flex flex-col gap-1">
							{sections.map((id) => {
								const { label, Icon } = meta[id]
								return (
									<Link key={id} to={id} smooth offset={-80} duration={500} onSetActive={() => { setActive(id); setOpen(false) }}>
										<span
											className={
												active === id
													? `${navItemBase} bg-black text-white block`
													: `${navItemBase} text-black hover:bg-black hover:text-white block`
											}
										>
											<Icon fontSize="inherit" /> {label}
										</span>
									</Link>
								)
							})}
						</div>
					</motion.div>
				</div>
			)}
		</div>
	)
}

function Loader() {
	return (
		<div className="h-screen bg-black text-accent.cyan flex items-center justify-center">
			<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
				<IconButton color="primary" sx={{ color: '#00e5ff', mb: 2, width: 80, height: 80 }}>
					<LaptopMacRoundedIcon sx={{ fontSize: 88 }} />
				</IconButton>
				<div className="font-semibold text-lg tracking-wide text-accent-cyan" >MY PROFILE</div>
				<ul className='flex gap-2 items-center text-center justify-center'>
					<li>
						<IconButton color="primary" sx={{ color: '#00e5ff' }}>
							<GitHubIcon />
						</IconButton>
					</li>
					<li>
						<IconButton color="primary" sx={{ color: '#00e5ff' }}>
							<TerminalOutlinedIcon />
						</IconButton>
					</li>
					<li>
						<IconButton color="primary" sx={{ color: '#00e5ff' }}>
							<PersonIcon />
						</IconButton>
					</li>
				</ul>
				<div className="font-semibold text-sm mt-3 text-accent-cyan">Designed by Hemant Mistri</div>
			</motion.div>
		</div>
	)
}

function Home() {
	const handleDownloadCV = () => {
		// Option 1: If you have a CV file in the public folder, use this:
		const cvUrl = '/cv.pdf' // Change this to your CV file path (e.g., '/cv.pdf', '/resume.pdf')
		const link = document.createElement('a')
		link.href = cvUrl
		link.download = 'Hemant_Mistri_CV.pdf' // Change filename as needed
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)

		// Option 2: If your CV is hosted online, use this instead:
		// window.open('https://your-cv-url.com/cv.pdf', '_blank')
	}

	return (
		<section className="container-pad min-h-[calc(100vh-64px)] py-6 md:py-0 pt-14 md:pt-0 grid md:grid-cols-2 gap-10 items-center">
			<div>
				<p className='bg-gray-300 rounded-2xl px-3 mb-7 inline-block'>Avalable for freelance work.</p>
				<motion.h1 data-aos="fade-up" className="text-5xl font-semibold mb-4">
					Hi, I'm Hemant Mistri.
				</motion.h1>
				<motion.h2 data-aos="fade-up" data-aos-delay="100" className="text-xl font-semibold mb-3">
					<TypingEffect words={[
						'React Developer',
						'Frontend Developer',
						'Web Enthusiast',
						'JavaScript Developer',
					]} />
				</motion.h2>
				<p data-aos="fade-up" data-aos-delay="200" className="text-gray-600 mb-4">
					Enthusiastic React developer with internship experience building responsive and scalable web
					applications. Skilled in HTML5, CSS3, JavaScript, TypeScript, React.js and Node.js. I enjoy
					solving problems and turning ideas into polished user experiences.
				</p>
				<div className="flex gap-2 items-center mb-3">
					<p className="flex items-center gap-2">
						<LocationPinIcon /> Indore, MP
					</p>
					<p className="flex items-center gap-2">
						<BusinessCenterIcon /> Open for opportunities
					</p>
				</div>
				<div className="flex gap-3 mb-6" data-aos="fade-up" data-aos-delay="300">
					<Button variant="contained" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'white', color: 'black', border: '1px solid black' } }}>Hire Me</Button>
					<Button
						variant="outlined"
						sx={{ borderColor: 'black', color: 'black', '&:hover': { backgroundColor: 'black', color: 'white', borderColor: 'black' } }}
						onClick={handleDownloadCV}
					>
						Download CV
					</Button>
				</div>
				<hr style={{ border: '1px solid #dadada', marginBottom: '10px' }} />
				<div className="flex gap-3 items-center " data-aos="fade-up" data-aos-delay="400">
					<span>Follow me:</span>
					<IconButton color="inherit" href="https://github.com/HemantM7" target="_blank" sx={{ color: 'black', '&:hover': { backgroundColor: 'black', color: 'white' } }}><GitHub fontSize='large' /></IconButton>
					<IconButton color="inherit" href="https://www.linkedin.com/in/hemant-mistri-26b392280/" target="_blank" sx={{ color: 'black', '&:hover': { backgroundColor: 'black', color: 'white' } }}><LinkedIn fontSize='large' /></IconButton>
					<IconButton color="inherit" href="mailto:hemantmistri00@gmail.com" sx={{ color: 'black', '&:hover': { backgroundColor: 'black', color: 'white' } }}><MailIcon fontSize='large' /></IconButton>
				</div>
			</div>
			<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} className="justify-self-center">
				<div className="w-96 h-96 rounded-2xl bg-gray-100 flex items-center justify-center text-8xl overflow-hidden">
					<img src="/15.jpeg" alt="Profile" className="w-full h-full object-cover rounded-2xl" />
				</div>
			</motion.div>
		</section>
	)
}

function About() {
	return (
		<section className="container-pad min-h-[calc(100vh-64px)] pt-4 pb-16 md:pb-24 py-6 md:py-0">
			<p className=' mb-7 '>ABOUT ME</p>
			<h2 className=" text-4xl font-semibold">Building Meaningful</h2>
			<h2 className=" text-4xl font-semibold inline-block">Digital Experiences
				<hr style={{ border: '1px solid #dadada', marginTop: '18px' }} />
			</h2>
			<div className="grid md:grid-cols-[66%_34%] gap-6 items-center">
				<div className="text-center md:text-left">
					<p className="text-gray-600 text-lg leading-relaxed">
						I am an enthusiastic React developer with internship experience building responsive and scalable web
						applications. I have worked with modern web technologies including HTML5, CSS3, JavaScript,
						TypeScript, React.js, Next.js, Node.js and Express.js. I enjoy solving problems and learning
						new technologies to create polished, user-centered experiences.
					</p>
					<br />
					<p className="text-gray-600 text-lg leading-relaxed">
						During internships I contributed to full-stack features, worked with REST APIs, and used Tailwind
						CSS and Material UI for component design. I have basic database experience with MongoDB and
						PostgreSQL and a strong foundation in C++/C.
					</p>
					<h2 className="text-2xl font-bold mt-10 mb-5">What Explain Me</h2>
					<div className="grid md:grid-cols-3 gap-6 mt-10">
						{/* Flip card - Skills */}
						<div className="flip-card" data-aos="fade-up">
							<div className="card-inner card-base border border-black">
								<div className="flip-card-front">
									<h3 className="font-semibold mb-2 text-[18px]"> <CodeIcon /> Skills</h3>
									<p>HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Tailwind CSS, MUI, SQL, Node.js, Express.js, C++/C</p>
								</div>
							</div>
						</div>

						{/* Flip card - Education */}
						<div className="flip-card" data-aos="fade-up" data-aos-delay="100">
							<div className="card-inner card-base border border-black">
								<div className="flip-card-front">
									<h3 className="font-semibold mb-2 text-[18px]"> <SchoolIcon /> Education</h3>
									<p>Patel College of Science & Technology — B.Tech (CSE), CGPA 7.88 (June 2024)</p>
								</div>
							</div>
						</div>

						{/* Flip card - Projects */}
						<div className="flip-card" data-aos="fade-up" data-aos-delay="200">
							<div className="card-inner card-base border border-black">
								<div className="flip-card-front">
									<h3 className="font-semibold mb-2 text-[18px]"> <FolderIcon /> Projects</h3>
									<p>Built multiple projects including receipt management systems and responsive web apps.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true, amount: 0.3 }}
					className="flex justify-center"
				>
					<div className="w-50 h-auto md:w-72 md:h-auto ">
						<img src="/without-bg.png" alt="Profile" className="w-full h-full object-cover relative md:-top-16" />
					</div>
				</motion.div>
			</div>

		</section>
	)
}

function ProjectCard({ image, title, desc, stack, githubLink, liveLink }: { image: string; title: string; desc: string; stack: string[]; githubLink?: string; liveLink?: string }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			whileHover={{ scale: 1.03, y: -6 }}
			whileTap={{ scale: 0.99 }}
			transition={{ type: 'spring', stiffness: 220, damping: 18 }}
			className="group"
		>
			<Card className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100">
				<div className="relative">
					<CardMedia component="img" image={image} alt={title} sx={{ height: 180, objectFit: 'content' }} />

					{/* Gradient overlay that appears on hover */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

					{/* Floating title badge */}
					<div className="absolute left-4 bottom-4 text-white">
						<div className="bg-black/60 backdrop-blur px-3 py-1 rounded-md text-sm font-semibold">{title}</div>
					</div>
				</div>

				<CardContent className="pt-4">
					<p className="text-sm text-gray-600 mb-3 line-clamp-3">{desc}</p>

					<div className="flex flex-wrap gap-2 mb-3">
						{stack.map((s) => (
							<Chip key={s} label={s} size="small" className="bg-gray-100/80 text-gray-800" />
						))}
					</div>

					{/* Action buttons - subtly hidden until hover */}
					<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						{githubLink && (
							<Button 
								size="small" 
								variant="outlined" 
								href={githubLink}
								target="_blank"
								rel="noopener noreferrer"
								sx={{ borderColor: 'black', color: 'black', '&:hover': { backgroundColor: 'black', color: 'white', borderColor: 'black' } }}
							>
								GitHub
							</Button>
						)}
						{liveLink && (
							<Button 
								size="small" 
								variant="contained" 
								href={liveLink}
								target="_blank"
								rel="noopener noreferrer"
								sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'white', color: 'black', border: '1px solid black' } }}
							>
								Live Demo
							</Button>
						)}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)
}

function Projects() {
	const cards = [
		// Projects extracted from CV (links left blank for you to fill)
		{
			title: 'Interactive Receipt Management System',
			image: '/dist/RMS.png',
			desc: 'Single-page app for receipt data entry and management using React (Vite), TypeScript, Tailwind and MUI. Features inline editable grids and perform CRUD operations on the Reciepts, auto-generated IDs and local-storage persistence with print the pdf of all the data and download in excel sheet. Also display all the data of the recipts in the form of graphs on the dashboard.',
			stack: ['React 18', 'TypeScript', 'Tailwind', 'MUI', 'Next.js'],
			githubLink: 'https://github.com/HemantM7/Reciept-management-system',
			liveLink: 'https://reciept-management-system.vercel.app/'
		},
		{
			title: 'Portfoio Website',
			image: '/dist/portfolio.png',
			desc: 'Modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth scroll navigation, animated sections with Framer Motion and AOS, interactive project cards with hover effects, and a contact form with email integration. Showcases skills, projects, and services with a clean, professional design and engaging user experience.',
			stack: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'AOS'],
			githubLink: 'https://github.com/yourusername/portfolio',
			liveLink: 'https://your-portfolio.com'
		},
		{ 
			title: 'Solo Leveling-Arise', 
			image: '/dist/arise.png', 
			desc: 'A modern sci-fi landing page for "Solo Leveling: Arise" with 3D animations, glassmorphic UI, and responsive design. Built with React, Three.js, and Tailwind CSS; deployed to GitHub Pages.', 
			stack: ['React 18', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Three.js'],
			githubLink: 'https://github.com/yourusername/ecommerce',
			liveLink: 'https://arise-landing-page.vercel.app/'
		},
		{ 
			title: 'TO-DO-List', 
			image: '/dist/To_do_list.png',
			desc: 'A simple TO Do List app for making list of the items. it is create using HTML5 CSS and JavaScript. It have feature to add delete and mark done to the items.', 
			stack: ['HTML', 'CSS', 'JavaScript'],
			githubLink: 'https://github.com/HemantM7/To-Do-List',
			liveLink: 'https://to-do-list-six-sepia-94.vercel.app/'
		},
		{ 
			title: 'Gallerie Website', 
			image: '/dist/Gallerie.png', 
			desc: 'Gallerie is a clean and minimal photo-search web app built with a focus on simplicity and smooth user experience. It offers a responsive, visually appealing interface for browsing curated image collections.', 
			stack: ['HTML', 'Bootstrap', 'JavaScript', 'Unsplash API'],
			githubLink: 'https://github.com/HemantM7/photo-album-',
			liveLink: 'https://your-blog.vercel.app'
		},
		{ 
			title: 'Farmer Forge-Website',
			image: 'https://picsum.photos/600/400?5', 
			desc: 'A full-stack web application for a farmer tool-making business showcasing products, company story, and customer testimonials. Features an interactive storytelling experience with scroll-based animations, a product catalog, customer testimonial map visualization, admin dashboard for content management, and automated email notifications via contact forms.', 
			stack: ['React 18', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Node.js/Express', ' MongoDB with Mongoose', 'Nodemailer', 'Docker', 'Helmet', 'CORS', 'JWT tokens'],
			githubLink: 'https://github.com/yourusername/game-landing',
			liveLink: 'https://your-game-landing.com'
		},
	]
	return (
		<section className="container-pad min-h-[calc(100vh-64px)] pt-4 pb-16 md:pb-40">
			<h2 className="section-title">Featured Work
				<hr style={{ border: '1px solid #dadada', marginTop: '14px', width: '14%', marginLeft: 'auto', marginRight: 'auto', }} />
			</h2>
			<motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
				<p className="text-center text-gray-600">A showcase of my recent projects demonstrating full-stack development with</p>
				<p className="text-center text-gray-600 mb-10">
					modern frameworks, and creative solutions. Want to see more? <a href="https://github.com/HemantM7" className="text-accent.blue font-semibold underline">Visit my GitHub</a>.
				</p>
			</motion.div>
			<div className="grid md:grid-cols-3 gap-6">
				{cards.map((c) => (
					<ProjectCard key={c.title} {...c} />
				))}
			</div>
		</section>
	)
}

function Services() {
	const services = [
		{
			title: 'Web & Frontend Development',
			Icon: CodeIcon,
			text: 'Responsive, accessible websites and SPAs using React, TypeScript, Tailwind CSS and MUI. I focus on performance and clean component architecture.'
		},
		{
			title: 'PWAs & Mobile-first',
			Icon: PhoneAndroidIcon,
			text: 'Progressive Web Apps and mobile-first interfaces — offline support, responsive layouts and fast load times.'
		},
		{
			title: 'Backend & APIs',
			Icon: TerminalOutlinedIcon,
			text: 'REST APIs and server-side features with Node.js and Express. Experience integrating databases (MongoDB / PostgreSQL) from internship projects.'
		},
		{
			title: 'Email & Automation',
			Icon: MailIcon,
			text: 'Transactional emails, contact form handling and automation using SMTP/nodemailer and robust server-side delivery.'
		},
	]

	return (
		<section className="container-pad min-h-[calc(100vh-64px)] py-16 md:py-24 md:pb-40">
			<h2 className="section-title">Our Features & Services
				<hr style={{ border: '1px solid #dadada', marginTop: '14px', width: '14%', marginLeft: 'auto', marginRight: 'auto', }} />
			</h2>
			<p className="text-gray-600 max-w-2xl mx-auto text-center mb-8">I help businesses and individuals build delightful, accessible, and high-performance web experiences. Below are a few areas I specialize in.</p>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
				{services.map((s, i) => (
					<motion.div
						key={s.title}
						initial={{ opacity: 0, y: 18 }}
						whileInView={{ opacity: 1, y: 0 }}
						whileHover={{ y: -8, rotateX: 2, rotateY: -3, scale: 1.02 }}
						viewport={{ once: true }}
						transition={{ type: 'spring', stiffness: 160, damping: 16, delay: i * 0.06 }}
						className="transform-gpu"
					>
						<Card
							variant="outlined"
							sx={{
								borderRadius: 3,
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								textAlign: 'center',
								justifyContent: 'flex-start',
								p: 0,
								boxShadow: '0 6px 18px rgba(15,23,42,0.06)'
							}}
						>
							<CardContent sx={{ pt: 6, px: 4 }}>
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<Avatar sx={{ width: 64, height: 64, background: 'linear-gradient(135deg,#06b6d4,#3b82f6)', boxShadow: '0 10px 30px rgba(6,182,212,0.08)' }}>
										{(() => {
											const IconComp = (s as any).Icon
											return <IconComp fontSize="large" sx={{ color: '#fff' }} />
										})()}
									</Avatar>
								</div>
								<h3 className="text-lg font-semibold mt-4 mb-2 text-gray-900">{s.title}</h3>
								<p className="text-sm text-gray-600 mx-auto" style={{ maxWidth: 220 }}>{s.text}</p>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</div>
		</section>
	)
}

function Contact() {
	const [sending, setSending] = useState(false)
	const [snack, setSnack] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' })
	// Controlled form state to reliably clear fields on success
	const [form, setForm] = useState({ name: '', email: '', message: '' })

	const handleCloseSnack = () => setSnack((s) => ({ ...s, open: false }))

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		const { name, email, message } = form

		try {
			setSending(true)
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, message }),
			})

			// If the HTTP status indicates success, mark as success immediately.
			if (response.ok) {
				setSnack({ open: true, message: 'Message sent successfully — thank you!', severity: 'success' })
				setForm({ name: '', email: '', message: '' })
				return
			}

			// Attempt to parse JSON response (try regardless of status). Some environments
			// may return a non-2xx status but include a helpful JSON body — prefer the
			// explicit `{ ok: true }` signal when available.
			let parsed: any = null
			try {
				parsed = await response.json()
			} catch (parseErr) {
				// parsing failed and status not OK — fall through to error handling below
			}

			// If server explicitly signaled success in JSON, treat as success.
			if (parsed && parsed.ok) {
				setSnack({ open: true, message: 'Message sent successfully — thank you!', severity: 'success' })
				setForm({ name: '', email: '', message: '' })
				return
			}

			// Non-OK status and no explicit success signal — log but do not show intrusive UI error.
			let bodyText = ''
			try { bodyText = parsed ? JSON.stringify(parsed) : await response.text() } catch (e) { bodyText = '<<unreadable>>' }
			console.error('Server returned non-OK status', response.status, bodyText)
		} catch (err) {
			console.error('Send error:', err)
		} finally {
			setSending(false)
		}
	}
	return (
		<section className="container-pad min-h-[calc(100vh-64px)] py-16 md:py-24">
			<h2 className="section-title">Get in Touch with Us
				<hr style={{ border: '1px solid #dadada', marginTop: '14px', width: '14%', marginLeft: 'auto', marginRight: 'auto', }} />
			</h2>
			<div className="grid md:grid-cols-2 gap-10 items-start">
				<div className="space-y-3">
					<p>I'm always open to discuss exciting projects and new opportunities. Let's collaborate!</p>
					<p>Email: hemantmistri00@gmail.com</p>
					<p>Phone: +91 95226 21501</p>
					<p>Location: Indore, Madhya Pradesh, India</p>
				</div>
				<form onSubmit={handleSubmit} className="space-y-4">
					<TextField fullWidth name="name" label="Your Name" required value={form.name} onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((s) => ({ ...s, name: e.target.value }))} />
					<TextField fullWidth name="email" label="Your Email" type="email" required value={form.email} onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((s) => ({ ...s, email: e.target.value }))} />
					<TextField fullWidth name="message" label="Your Message" multiline minRows={4} required value={form.message} onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((s) => ({ ...s, message: e.target.value }))} />
					<Button disabled={sending} variant="contained" type="submit" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'white', color: 'black', border: '1px solid black' } }}>{sending ? 'Sending...' : 'Send Message'}</Button>
				</form>
				<Snackbar open={snack.open} autoHideDuration={5000} onClose={handleCloseSnack} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
					<Alert onClose={handleCloseSnack} severity={snack.severity} sx={{ width: '100%' }}>
						{snack.message}
					</Alert>
				</Snackbar>
			</div>
		</section>
	)
}

function Footer() {
	return (
		<footer className="bg-black text-white py-10 mt-10">
			<Container>
				<div className="flex flex-col items-center gap-4">
					<nav className="flex gap-4">
						{sections.map((id) => (
							<Link key={id} to={id} smooth offset={-80} duration={500}>
								<Button size="small" sx={{ color: 'white', textTransform: 'none', '&:hover': { backgroundColor: 'white', color: 'black' } }}>{cap(id)}</Button>
							</Link>
						))}
					</nav>
					<div className="flex gap-3">
						<IconButton href="https://github.com/HemantM7" target="_blank" sx={{ color: 'white', '&:hover': { backgroundColor: 'white', color: 'black' } }}><GitHub /></IconButton>
						<IconButton href="https://www.linkedin.com/in/hemantmistri/" target="_blank" sx={{ color: 'white', '&:hover': { backgroundColor: 'white', color: 'black' } }}><LinkedIn /></IconButton>
						<IconButton href="https://www.instagram.com/mistri.hemant/" target="_blank" sx={{ color: 'white', '&:hover': { backgroundColor: 'white', color: 'black' } }}><Instagram /></IconButton>
					</div>
					<div className="text-sm text-white/70">© {new Date().getFullYear()} Hemant Mistri. All Rights Reserved.</div>
				</div>
			</Container>
		</footer>
	)
}

function cap(id: string) {
	return id.charAt(0).toUpperCase() + id.slice(1)
}


