
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Disc3, Play } from "lucide-react";

export default function Hero() {
    return (

        <section
            id="home"
            className="relative isolate flex min-h-[calc(100svh-5rem)] w-full items-center overflow-hidden bg-[#080a07] bg-cover bg-center text-[#f3f0df]"
            style={{
                backgroundImage: `
            linear-gradient(
                to right,
                rgba(8, 10, 7, 0.82) 0%,
                rgba(8, 10, 7, 0.48) 45%,
                rgba(8, 10, 7, 0.12) 100%
            ),
            linear-gradient(
                to top,
                rgba(8, 10, 7, 0.65),
                transparent 55%
            ),
            url("/images/kevin-parker-lead-singer-of-tame-impala-DP6PHKZCIJFIPDSUPEWNPG6C7M.avif")
        `,
            }}
        >
            {/* Keep your existing hero content here.
        Delete the old <img> and background overlay divs. */}


            {/* Background image */}
            <img
                style={{ zIndex: 1 }}
                src="/images/kevin-parker-lead-singer-of-tame-impala-DP6PHKZCIJFIPDSUPEWNPG6C7M.avif"
                alt="Tame Impala performing live"
                className="absolute inset-0 z-0 h-full w-full object-cover object-center"
                loading="eager"
                fetchPriority="high"
            />

            {/* Cinematic overlays */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#080a07]/80 via-[#080a07]/35 to-transparent" />

            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#080a07]/70 via-transparent to-black/15" />

            {/* Atmospheric lighting */}
            <div className="pointer-events-none absolute -left-32 top-1/4 z-10 h-80 w-80 rounded-full bg-lime-500/10 blur-[120px]" />

            <div className="pointer-events-none absolute right-[10%] top-[15%] z-10 h-72 w-72 rounded-full bg-orange-600/20 blur-[110px]" />

            {/* Decorative index */}
            <div className="absolute left-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 text-[9px] tracking-[0.3em] text-white/60 md:flex">
                <span className="text-orange-400">01</span>
                <span className="h-12 w-px bg-white/30" />
                <span className="[writing-mode:vertical-rl]">
                    THE LIVE EXPERIENCE
                </span>
            </div>

            {/* Main content */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: {
                        transition: { staggerChildren: 0.12 },
                    },
                }}
                className="relative z-20 w-full px-6 py-24 sm:px-10 md:px-16 lg:px-24"
            >
                <div className="max-w-5xl">
                    {/* Eyebrow */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 16 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.7 },
                            },
                        }}
                        className="mb-6 flex items-center gap-3"
                    >
                        <Disc3 size={19} className="shrink-0 text-orange-400" />

                        <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-lime-300 sm:text-xs">
                            Tame Impala · Live
                        </span>

                        <span className="h-px w-10 bg-white/40" />

                        <span className="text-[9px] uppercase tracking-[0.25em] text-white/70">
                            A new chapter
                        </span>
                    </motion.div>

                    {/* Hero title */}
                    <motion.h1
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 35,
                                filter: "blur(8px)",
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                                filter: "blur(0px)",
                                transition: {
                                    duration: 0.9,
                                    ease: [0.22, 1, 0.36, 1],
                                },
                            },
                        }}
                        className="select-none text-[clamp(4rem,12.5vw,10.5rem)] font-black uppercase leading-[0.78] tracking-[-0.085em]"
                    >
                        DEAD
                        <span className="block text-[#f3f0df]">
                            BEAT<span className="text-orange-400">.</span>
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 15 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.7 },
                            },
                        }}
                        className="mt-8 text-[10px] uppercase tracking-[0.3em] text-white/90 sm:text-xs md:text-sm"
                    >
                        A new album. A new chapter. Live.
                    </motion.p>

                    {/* Description */}
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 15 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.7 },
                            },
                        }}
                        className="mt-4 max-w-lg text-sm leading-7 text-white/75 md:text-base"
                    >
                        Enter the world of Deadbeat. Hypnotic rhythms,
                        psychedelic visuals, and an immersive live experience
                        by Tame Impala.
                    </motion.p>

                    {/* Actions */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 15 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.7 },
                            },
                        }}
                        className="mt-9 flex flex-wrap items-center gap-4"
                    >
                        <a
                            href="#tour"
                            className="group inline-flex items-center gap-5 rounded-full bg-lime-300 px-7 py-4 text-[10px] font-bold tracking-[0.15em] text-black transition duration-300 hover:bg-[#f3f0df]"
                        >
                            GET TICKETS

                            <ArrowUpRight
                                size={16}
                                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </a>

                        <a
                            href="#album"
                            className="group inline-flex items-center gap-3 rounded-full border border-white/40 bg-black/30 px-6 py-4 text-[10px] tracking-[0.12em] backdrop-blur-md transition hover:border-orange-400"
                        >
                            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/50 transition group-hover:border-orange-400 group-hover:text-orange-400">
                                <Play size={11} fill="currentColor" />
                            </span>

                            EXPLORE THE ALBUM
                        </a>
                    </motion.div>
                </div>
            </motion.div>

            {/* Bottom-left scroll indicator */}
            <a
                href="#album"
                className="absolute bottom-6 left-6 z-20 inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-white/70 transition hover:text-lime-300 sm:left-10 md:left-16"
            >
                <ArrowDown size={14} />
                Scroll to enter
            </a>

            {/* Bottom-right information */}
            <div className="absolute bottom-6 right-6 z-20 hidden text-right sm:block md:right-10">
                <p className="text-[9px] tracking-[0.25em] text-white/85">
                    MUSIC / LIGHT / MOVEMENT
                </p>

                <p className="mt-2 text-[9px] tracking-[0.2em] text-orange-300">
                    A DIFFERENT RHYTHM
                </p>
            </div>
        </section>
    );
}
