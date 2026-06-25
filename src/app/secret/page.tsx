"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const notes = [
	{
		emoji: "🎓",
		title: "miss lorem ipsum",
		text: "summa cum laude is crazy bc the rest of us graduated cum nothing. the academy should be afraid. placeholder text became the final boss.",
	},
	{
		emoji: "🐤",
		title: "the chick (legal entity)",
		text: "your stress toy filed for emotional damages. it has seen things. it squeaks now purely out of obligation. we don't talk about what it knows.",
	},
	{
		emoji: "👀",
		title: "googly eye situation",
		text: "you told me to put googly eyes on the roomba and accidentally created a lifelong supply chain. the roomba has a personality now. it has opinions. send help.",
	},
	{
		emoji: "🌸",
		title: "blush.exe",
		text: "you put on a little blush and immediately look like a wholesome cartoon protagonist who befriends a forest animal in act one. deeply unserious. ten out of ten render.",
	},
	{
		emoji: "🍁",
		title: "ottawa lore (2015–2020)",
		text: "we were in the same city for years and the universe simply did not load us into the same chunk. classic rendering bug. we 100% clipped past each other in a shoppers drug mart.",
	},
	{
		emoji: "☘️",
		title: "irish + french = ???",
		text: "genetically you are a pub and a croissant in a trench coat. scientists are confused. it's working though.",
	},
	{
		emoji: "🎧",
		title: "asmr retirement plan",
		text: "if you did asmr you'd be retired by 30 and own a small island shaped like an ear. economists hate this one weird trick (whispering).",
	},
	{
		emoji: "🏎️",
		title: "sf90 stradale (vehicle)",
		text: "i once said you look like a ferrari sf90 stradale. i refuse to elaborate. zero further context. the comparison stands and the warranty does not.",
	},
];

function GooglyEye({ size = 64 }: { size?: number }) {
	const eyeRef = useRef<HTMLDivElement>(null);
	const [pupil, setPupil] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMove = (e: MouseEvent) => {
			const eye = eyeRef.current;
			if (!eye) return;
			const rect = eye.getBoundingClientRect();
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;
			const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
			const radius = size * 0.18;
			setPupil({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius });
		};
		window.addEventListener("mousemove", handleMove);
		return () => window.removeEventListener("mousemove", handleMove);
	}, [size]);

	return (
		<div
			ref={eyeRef}
			className="relative rounded-full bg-white shadow-lg ring-2 ring-gray-200"
			style={{ width: size, height: size }}
		>
			<motion.div
				className="absolute rounded-full bg-gray-900"
				style={{
					width: size * 0.42,
					height: size * 0.42,
					top: "50%",
					left: "50%",
				}}
				animate={{ x: pupil.x - size * 0.21, y: pupil.y - size * 0.21 }}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}
			/>
		</div>
	);
}

export default function SecretPage() {
	const [opened, setOpened] = useState(false);

	return (
		<div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-violet-100 dark:from-gray-900 dark:via-rose-950/40 dark:to-violet-950/40">
			

			<main className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center">
				<motion.div
					className="mb-6 flex items-center gap-3"
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<GooglyEye size={56} />
					<GooglyEye size={56} />
				</motion.div>

				<motion.span
					className="mb-4 rounded-full bg-white/70 px-4 py-1 text-sm font-medium text-rose-500 shadow-sm backdrop-blur dark:bg-white/10"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.6 }}
				>
					unserious website. handle with care.
				</motion.span>

				<motion.h1
					className="bg-gradient-to-r from-rose-500 via-pink-500 to-violet-500 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.7 }}
				>
					hello my fav office person 🐤
				</motion.h1>

				<motion.p
					className="mt-5 max-w-xl text-lg text-gray-700 dark:text-gray-300"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.45, duration: 0.7 }}
				>
					you are managing 21 humans, translating an entire company into french
					by september, and somehow still upright. respectfully, the grind is
					diabolical. so here is a useless little webpage with no deadlines, no
					meetings, and one (1) emotionally compromised chick.
				</motion.p>

				{!opened ? (
					<motion.button
						onClick={() => setOpened(true)}
						className="mt-10 rounded-full bg-gradient-to-r from-rose-500 to-violet-500 px-8 py-3 text-lg font-semibold text-white shadow-lg shadow-rose-500/30 transition hover:scale-105"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.6, duration: 0.6 }}
						whileTap={{ scale: 0.96 }}
					>
						press for unexplained content
					</motion.button>
				) : (
					<motion.div
						className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
						initial="hidden"
						animate="show"
						variants={{
							hidden: {},
							show: { transition: { staggerChildren: 0.08 } },
						}}
					>
						{notes.map((note) => (
							<motion.div
								key={note.title}
								className="rounded-2xl border border-white/60 bg-white/70 p-5 text-left shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/5"
								variants={{
									hidden: { opacity: 0, y: 20 },
									show: { opacity: 1, y: 0 },
								}}
							>
								<div className="mb-2 text-3xl">{note.emoji}</div>
								<h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
									{note.title}
								</h3>
								<p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
									{note.text}
								</p>
							</motion.div>
						))}
					</motion.div>
				)}

				{opened && (
					<motion.div
						className="mt-12 max-w-xl"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8, duration: 0.8 }}
					>
						<p className="text-base text-gray-700 dark:text-gray-300">
						anyway no big message here. you are objectively too smart and the
							blush is a public hazard, but mostly i just needed somewhere to
							legally store these jokes. nelson cannot have them. they are mine.
						</p>
						<p className="mt-4 text-sm italic text-rose-500">
							ok go squeeze the chick. it has earned a break. so have you. 🐤
						</p>
					</motion.div>
				)}
			</main>
		</div>
	);
}
