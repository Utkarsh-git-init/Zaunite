
import { Link } from "react-router";
import { useAudioPlayer } from "../context/AudioPlayerContext";

const artistImage =
    "/images/kevin-parker-lead-singer-of-tame-impala-DP6PHKZCIJFIPDSUPEWNPG6C7M.avif";

export default function Album() {
    const { tracks, activeTrackIndex, isPlaying, playTrack } = useAudioPlayer();

    return (
        <main className="min-h-screen bg-[#11120f] px-5 pb-36 pt-8 text-[#f1f0e8] sm:px-10 lg:px-16">


            <div className="mx-auto max-w-7xl">
                <div className="mb-12 flex items-center justify-between border-b border-white/15 pb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
                    <span>01 / The Record</span>
                    <span>Studio / Album</span>
                </div>

                <section className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <p className="mb-5 font-mono text-xs tracking-[0.2em] text-[#d5ff3f]">
                            TAME IMPALA PRESENTS
                        </p>

                        <h1 className="text-[clamp(5rem,14vw,11rem)] font-black leading-[0.78] tracking-[-0.09em]">
                            DEAD
                            <br />
                            <span className="text-[#d5ff3f]">BEAT.</span>
                        </h1>

                        <p className="mt-9 max-w-lg text-lg leading-relaxed text-white/60 sm:text-xl">
                            A world of its own. Built from rhythm, texture, repetition,
                            and the feeling that something is just about to change.
                        </p>

                        <div className="mt-10 grid grid-cols-2 gap-6 border-y border-white/15 py-6 sm:grid-cols-3">
                            <div>
                                <p className="mb-2 font-mono text-[10px] tracking-widest text-white/40">
                                    ARTIST
                                </p>
                                <p className="text-sm font-medium">Tame Impala</p>
                            </div>
                            <div>
                                <p className="mb-2 font-mono text-[10px] tracking-widest text-white/40">
                                    RELEASE
                                </p>
                                <p className="text-sm font-medium">17 Oct 2025</p>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <p className="mb-2 font-mono text-[10px] tracking-widest text-white/40">
                                    TRACKS
                                </p>
                                <p className="text-sm font-medium">12 tracks</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-xl">
                        <div className="absolute -inset-3 rotate-3 border border-[#d5ff3f]/20" />
                        <div className="relative aspect-square overflow-hidden bg-[#25271d]">
                            <img
                                src={artistImage}
                                alt="Tame Impala artist photography"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-5 left-5 font-mono text-xs tracking-[0.2em] text-white/80">
                                SOUND IN COLOUR — 01
                            </div>
                            <div className="absolute right-5 top-5 border border-white/50 px-3 py-2 font-mono text-xs">
                                TI / DB
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-28">
                    <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
                        <div>
                            <p className="mb-3 font-mono text-xs tracking-[0.2em] text-[#d5ff3f]">
                                INSIDE THE RECORD
                            </p>
                            <h2 className="text-5xl font-black tracking-[-0.06em] sm:text-7xl">
                                TRACKLIST<span className="text-[#d5ff3f]">.</span>
                            </h2>
                        </div>
                        <p className="font-mono text-xs tracking-widest text-white/40">
                            12 TRACKS / FULL ALBUM
                        </p>
                    </div>

                    <div className="grid grid-cols-[32px_minmax(0,1fr)_48px_44px] gap-3 border-b border-white/20 px-3 py-3 font-mono text-[10px] tracking-widest text-white/40 sm:grid-cols-[55px_minmax(0,1fr)_65px_60px] sm:gap-5">
                        <span>NO.</span>
                        <span>TITLE</span>
                        <span className="text-right">TIME</span>
                        <span />
                    </div>

                    <div className="border-b border-white/15">
                        {tracks.map((track, index) => {
                            const selected = activeTrackIndex === index;

                            return (
                                <div
                                    key={track.title}
                                    className={`group grid min-h-[68px] grid-cols-[32px_minmax(0,1fr)_48px_44px] items-center gap-3 border-b border-white/[0.08] px-3 py-3 transition-colors sm:grid-cols-[55px_minmax(0,1fr)_65px_60px] sm:gap-5 ${
                                        selected ? "bg-[#d5ff3f]/[0.07]" : "hover:bg-white/[0.035]"
                                    }`}
                                >
                  <span
                      className={`font-mono text-xs ${
                          selected ? "text-[#d5ff3f]" : "text-white/40"
                      }`}
                  >
                    {selected && isPlaying
                        ? "♫"
                        : String(index + 1).padStart(2, "0")}
                  </span>

                                    <button
                                        type="button"
                                        onClick={() => playTrack(index)}
                                        className={`min-w-0 text-left text-sm font-medium transition-colors sm:text-base ${
                                            selected
                                                ? "text-[#d5ff3f]"
                                                : "text-white/85 group-hover:text-[#d5ff3f]"
                                        }`}
                                    >
                                        {track.title}
                                        {selected && (
                                            <span className="ml-2 font-mono text-[10px] text-white/40">
                        {isPlaying ? "NOW PLAYING" : "SELECTED"}
                      </span>
                                        )}
                                    </button>

                                    <span className="text-right font-mono text-xs text-white/40">
                    {track.duration}
                  </span>

                                    <button
                                        type="button"
                                        onClick={() => playTrack(index)}
                                        aria-label={`${selected && isPlaying ? "Pause" : "Play"} ${track.title}`}
                                        className={`flex h-10 w-10 items-center justify-center justify-self-end rounded-full border transition-colors ${
                                            selected
                                                ? "border-[#d5ff3f] bg-[#d5ff3f] text-[#11120f]"
                                                : "border-white/20 text-[#d5ff3f] hover:border-[#d5ff3f] hover:bg-[#d5ff3f] hover:text-[#11120f]"
                                        }`}
                                    >
                                        {selected && isPlaying ? "Ⅱ" : "▶"}
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 flex flex-col justify-between gap-3 font-mono text-[10px] tracking-widest text-white/40 sm:flex-row">
                        <span>END OF SIDE A — END OF SIDE B</span>
                        <span>LISTEN CLOSELY.</span>
                    </div>
                </section>

                <div className="mt-20 flex items-center justify-between gap-4 border-t border-white/15 pt-6">
          <span className="font-mono text-[10px] tracking-widest text-white/40">
            UP NEXT
          </span>
                    <Link
                        to="/tour"
                        className="text-sm font-bold tracking-widest transition-colors hover:text-[#d5ff3f]"
                    >
                        LIVE SHOWS <span className="text-[#d5ff3f]">↗</span>
                    </Link>
                </div>
            </div>

        </main>
    );
}
