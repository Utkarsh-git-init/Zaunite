
import { Link } from "react-router";

const artistImage =
    "/images/kevin-parker-lead-singer-of-tame-impala-DP6PHKZCIJFIPDSUPEWNPG6C7M.avif";

// Fictional details for the fan-made website concept.
const featuredEvent = {
    city: "MUMBAI",
    venue: "Mahalaxmi Racecourse",
    date: "14 NOV 2026",
    doors: "6:00 PM IST",
    show: "7:30 PM IST",
};

export default function Home() {
    return (
        <>
            <main className="home-page">
                <div className="home-image" aria-hidden="true">
                    <img src={artistImage} alt="" />
                </div>

                <div className="home-shade" />

                <section className="home-content">
                    <div className="eyebrow home-eyebrow">
                        <span className="status-dot" />
                        UNOFFICIAL CONCERT CONCEPT · INDIA 2026
                    </div>

                    <h1 className="deadbeat-title">
                        DEAD<span>BEAT</span>
                    </h1>

                    <div className="home-bottom">
                        <p className="home-description">
                            TAME IMPALA — LIVE
                            <span>
                                One night. One city. A different state of mind.
                            </span>
                            <span>
                                Imagine the world of Deadbeat, experienced live.
                            </span>
                        </p>

                        <div className="home-actions">
                            <Link to="/tour" className="button button-lime">
                                FIND YOUR SHOW <span>↗</span>
                            </Link>

                            <a
                                href="#event-details"
                                className="button button-outline"
                            >
                                EVENT DETAILS <span>↓</span>
                            </a>
                        </div>
                    </div>

                    <div className="home-index">
                        <span>DEADBEAT / LIVE</span>
                        <span>FICTIONAL TOUR · NOT AN OFFICIAL ANNOUNCEMENT</span>
                    </div>
                </section>
            </main>

            <section
                id="event-details"
                className="bg-[#090a08] px-[5.5%] py-20 sm:py-28"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-4">
                        <p className="font-mono text-xs tracking-[0.18em] text-[#d5ff3f]">
                            THE NIGHT / 001
                        </p>
                        <p className="font-mono text-xs tracking-[0.12em] text-white/40">
                            FICTIONAL EVENT DETAILS
                        </p>
                    </div>

                    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
                        <div>
                            <p className="mb-5 font-mono text-xs tracking-[0.2em] text-white/45">
                                YOUR NEXT OBSESSION
                            </p>

                            <h2 className="font-['Barlow_Condensed'] text-6xl font-black leading-[0.85] tracking-[-0.05em] sm:text-8xl">
                                LOSE YOURSELF.
                                <br />
                                <span className="text-[#d5ff3f]">
                                    FIND THE SOUND.
                                </span>
                            </h2>

                            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                                A concept for a Tame Impala live show inspired
                                by the Deadbeat era: immersive visuals,
                                hypnotic rhythms, and a room full of people
                                moving as one.
                            </p>

                            <Link
                                to="/tour"
                                className="button button-lime mt-8"
                            >
                                EXPLORE THE TOUR <span>↗</span>
                            </Link>
                        </div>

                        <div className="border border-white/15 bg-white/[0.025]">
                            <div className="flex items-center justify-between border-b border-white/15 px-5 py-4">
                                <span className="font-mono text-xs tracking-[0.16em] text-white/50">
                                    FEATURED STOP
                                </span>
                                <span className="font-mono text-xs text-[#d5ff3f]">
                                    001 / IN
                                </span>
                            </div>

                            <div className="p-6 sm:p-8">
                                <p className="font-mono text-sm tracking-[0.2em] text-[#d5ff3f]">
                                    {featuredEvent.date}
                                </p>

                                <h3 className="mt-3 font-['Barlow_Condensed'] text-6xl font-black tracking-[-0.04em] sm:text-7xl">
                                    {featuredEvent.city}
                                </h3>

                                <p className="mt-2 text-white/65">
                                    {featuredEvent.venue}
                                </p>

                                <div className="mt-8 grid grid-cols-2 gap-5 border-t border-white/15 pt-6">
                                    <div>
                                        <p className="font-mono text-[11px] tracking-[0.12em] text-white/40">
                                            DOORS OPEN
                                        </p>
                                        <p className="mt-2 text-sm">
                                            {featuredEvent.doors}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-mono text-[11px] tracking-[0.12em] text-white/40">
                                            SHOW STARTS
                                        </p>
                                        <p className="mt-2 text-sm">
                                            {featuredEvent.show}
                                        </p>
                                    </div>
                                </div>

                                <p className="mt-7 border-t border-white/15 pt-5 font-mono text-[11px] leading-relaxed tracking-wide text-white/40">
                                    CONCEPT ONLY. THIS IS NOT A CONFIRMED
                                    EVENT. NO REAL TICKETS ARE AVAILABLE.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
