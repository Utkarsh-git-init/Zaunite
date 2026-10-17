import { useNavigate } from "react-router";
import { useAudioPlayer } from "../context/AudioPlayerContext";

function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
}

export default function GlobalAudioPlayer() {
    const navigate = useNavigate();
    const {
        activeTrack,
        activeTrackIndex,
        tracks,
        isPlaying,
        currentTime,
        duration,
        error,
        togglePlay,
        playNext,
        playPrevious,
        seek,
    } = useAudioPlayer();

    const progress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

    return (
        <aside
            aria-label="Music player — click to view album tracklist"
            onClick={() => navigate("/album#tracklist")}
            className="fixed inset-x-0 bottom-0 z-[100] cursor-pointer border-t border-white/15 bg-[#191a16]/95 px-4 py-3 text-[#f1f0e8] shadow-2xl backdrop-blur-xl sm:px-8"
        >
            <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 sm:grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)] sm:gap-x-6">
                <div className="min-w-0">
                    <p className="mb-1 font-mono text-[9px] tracking-[0.2em] text-[#d5ff3f]">
                        {activeTrack ? (isPlaying ? "NOW PLAYING" : "PLAYER PAUSED") : "DEADBEAT PLAYER"}
                    </p>
                    <p className="truncate text-sm font-semibold">
                        {activeTrack?.title ?? "Choose a track"}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-white/40">Tame Impala · Deadbeat</p>
                </div>

                <div onClick={(event) => event.stopPropagation()} className="flex items-center justify-end gap-2 sm:justify-center sm:gap-3">
                    <button
                        type="button"
                        onClick={playPrevious}
                        aria-label="Previous track"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-white/75 transition hover:bg-white/10 hover:text-[#d5ff3f]"
                    >
                        |◀
                    </button>
                    <button
                        type="button"
                        onClick={() => void togglePlay()}
                        aria-label={isPlaying ? "Pause" : "Play"}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d5ff3f] text-lg text-[#11120f] transition-transform hover:scale-105"
                    >
                        {isPlaying ? "Ⅱ" : "▶"}
                    </button>
                    <button
                        type="button"
                        onClick={playNext}
                        aria-label="Next track"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-white/75 transition hover:bg-white/10 hover:text-[#d5ff3f]"
                    >
                        ▶|
                    </button>
                </div>

                <div onClick={(event) => event.stopPropagation()} className="col-span-2 flex min-w-0 items-center gap-3 sm:col-span-1">
          <span className="w-9 shrink-0 text-right font-mono text-[10px] tabular-nums text-white/45">
            {formatTime(currentTime)}
          </span>
                    <input
                        aria-label="Seek through track"
                        type="range"
                        min="0"
                        max={duration || 0}
                        step="0.1"
                        value={Math.min(currentTime, duration || 0)}
                        onChange={(event) => seek(Number(event.target.value))}
                        disabled={!activeTrack || !duration}
                        style={{ "--player-progress": `${progress}%` }}
                        className="deadbeat-seekbar min-w-0 flex-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
                    />
                    <span className="w-9 shrink-0 font-mono text-[10px] tabular-nums text-white/45">
            {formatTime(duration)}
          </span>
                </div>
            </div>

            {error && (
                <p role="status" className="mx-auto mt-2 max-w-7xl text-xs text-[#d5ff3f]">
                    {error}
                </p>
            )}

            <style>{`
        .deadbeat-seekbar {
          height: 4px;
          appearance: none;
          border-radius: 999px;
          background: linear-gradient(to right, #d5ff3f 0%, #d5ff3f var(--player-progress), rgba(255,255,255,.2) var(--player-progress), rgba(255,255,255,.2) 100%);
          outline: none;
        }
        .deadbeat-seekbar::-webkit-slider-thumb {
          appearance: none;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #d5ff3f;
          border: 1px solid #11120f;
        }
        .deadbeat-seekbar::-moz-range-thumb {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #d5ff3f;
          border: 1px solid #11120f;
        }
      `}</style>
        </aside>
    );
}
