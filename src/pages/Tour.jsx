import { Link } from "react-router";

const stops = [
    { city: "Mumbai", date: "14 NOV 2026", venue: "Mahalaxmi Racecourse", note: "Sleep is optional." },
    { city: "Bengaluru", date: "18 NOV 2026", venue: "Venue TBA", note: "Existential guitar weather." },
    { city: "Hyderabad", date: "22 NOV 2026", venue: "Venue TBA", note: "Monday can wait." },
    { city: "New Delhi", date: "27 NOV 2026", venue: "Venue TBA", note: "Come. Ignore traffic." },
    { city: "Pune", date: "02 DEC 2026", venue: "Venue TBA", note: "Lose your train of thought." },
    { city: "Kolkata", date: "06 DEC 2026", venue: "Venue TBA", note: "Return to the void." },
];

export default function Tour() {
    return (
        <main className="min-h-screen overflow-hidden bg-[#090a08] px-5 pb-12 pt-28 text-[#f3f2e9] sm:px-8 lg:px-12"
              style={{
                  backgroundImage: `
      linear-gradient(180deg, rgba(9,10,8,0.55), #090a08 95%),
      linear-gradient(rgba(9,10,8,0.48), rgba(9,10,8,0.65)),
      url("/images/kevin-parker-lead-singer-of-tame-impala-DP6PHKZCIJFIPDSUPEWNPG6C7M.avif")
    `,
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                  backgroundRepeat: "no-repeat",
              }}

        >
            <div className="mx-auto max-w-[1440px]">
                <header className="flex items-end justify-between gap-6">
                    <div>
                        <p className="font-mono text-[10px] tracking-[0.25em] text-[#d5ff3f]">
                            THE DEPARTMENT OF BAD DECISIONS
                        </p>
                        <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">
                            DEADBEAT <span className="text-[#d5ff3f]">TOUR.</span>
                        </h1>
                        <p className="mt-3 text-xs tracking-wide text-white/50 sm:text-sm">
                            Same songs. Different cities. Slightly worse decisions.
                        </p>
                    </div>

                    <p className="hidden max-w-48 text-right font-mono text-[10px] leading-5 text-white/35 md:block">
                        A FICTIONAL TOUR CONCEPT.
                        <br />
                        NO REAL TICKETS. GOOD VIBES.
                    </p>
                </header>

                <section className="relative mt-10 md:mt-12" aria-label="Tour stops">
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 1200 150"
                        preserveAspectRatio="none"
                        className="pointer-events-none absolute left-0 top-0 hidden h-[150px] w-full overflow-visible md:block"
                    >
                        <path
                            d="M 0 45 C 65 5, 115 5, 200 65 S 335 120, 400 45 S 535 5, 600 85 S 735 125, 800 60 S 935 10, 1000 70 S 1135 100, 1200 25"
                            fill="none"
                            stroke="#d5ff3f"
                            strokeWidth="1.5"
                            strokeOpacity="0.8"
                        />
                    </svg>

                    <div className="grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2 md:grid-cols-6 md:gap-2">
                        {stops.map((stop, index) => (
                            <article
                                key={stop.city}
                                className={`relative min-w-0 border-t border-white/20 pt-3 md:border-0 md:pt-0 ${
                                    index % 2 === 1 ? "md:mt-[74px]" : "md:mt-0"
                                }`}
                            >
                                <div className="flex items-center gap-2 md:mb-[100px]">
                                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-[#d5ff3f] bg-[#090a08] font-mono text-[10px] text-[#d5ff3f] md:absolute md:left-0 md:top-[33px] md:z-10 md:size-4 md:text-[8px]">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span className="font-mono text-[10px] text-white/40 md:hidden">
                                        STOP {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <p className="font-mono text-[10px] tracking-wide text-white/45">
                                    {stop.date}
                                </p>

                                <h2 className="mt-1 text-xl font-black uppercase leading-tight tracking-tight text-[#d5ff3f] lg:text-2xl">
                                    {stop.city}
                                </h2>

                                <p className="mt-1 min-h-8 text-[11px] leading-4 text-white/55">
                                    {stop.venue}
                                </p>

                                <p className="mt-2 text-[10px] italic text-white/35">
                                    “{stop.note}”
                                </p>

                                <Link
                                    to={`/tickets?city=${encodeURIComponent(stop.city)}`}
                                    className="mt-4 inline-flex min-h-9 w-full items-center justify-center gap-2 border border-white/25 px-2 font-mono text-[9px] tracking-wider text-[#f3f2e9] transition-colors hover:border-[#d5ff3f] hover:bg-[#d5ff3f] hover:!text-[#090a08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d5ff3f] lg:text-[10px]"
                                >
                                    SELECT CITY <span aria-hidden="true">↗</span>
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>

                <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-4">
                    <p className="font-mono text-[9px] leading-4 text-white/30">
                        FAN-MADE CONCEPT · DATES, VENUES AND TICKETS ARE FICTIONAL.
                        <br />
                        NOT A CONFIRMED TAME IMPALA TOUR.
                    </p>

                    <Link
                        to="/experience"
                        className="font-mono text-[10px] tracking-wider text-[#d5ff3f] hover:text-white"
                    >
                        MORE NONSENSE ↗
                    </Link>
                </footer>
            </div>
        </main>
    );
}
