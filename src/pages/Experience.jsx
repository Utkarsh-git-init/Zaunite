import { useEffect, useRef, useState } from "react";
import { tracks } from "../data/tracks";

const loserTrack = tracks.find((track) => track.title === "Loser");

export default function Experience() {
    const audioRef = useRef(null);
    const transitionTimerRef = useRef(null);
    const [phase, setPhase] = useState("intro");
    const [muted, setMuted] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const immersive = phase === "transition" || phase === "film";
        document.body.classList.toggle("experience-mode", immersive);

        return () => {
            document.body.classList.remove("experience-mode");
            if (transitionTimerRef.current) {
                window.clearTimeout(transitionTimerRef.current);
            }
        };
    }, [phase]);

    async function beginExperience() {
        const audio = audioRef.current;
        if (!audio || !loserTrack) {
            setError('The "Loser" track could not be found.');
            return;
        }

        setError("");
        audio.volume = 0.85;
        audio.muted = false;
        setMuted(false);

        try {
            await audio.play();
            setPhase("transition");
            transitionTimerRef.current = window.setTimeout(() => {
                setPhase("film");
            }, 2200);
        } catch {
            setError('Could not play "Loser". Check the audio URL and try again.');
        }
    }

    function toggleMute() {
        const nextMuted = !muted;
        setMuted(nextMuted);
        if (audioRef.current) audioRef.current.muted = nextMuted;
    }

    function exitExperience() {
        if (transitionTimerRef.current) {
            window.clearTimeout(transitionTimerRef.current);
            transitionTimerRef.current = null;
        }
        audioRef.current?.pause();
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.muted = false;
        }
        setMuted(false);
        setPhase("intro");
    }

    return (
        <main className={`experience-page phase-${phase}`}>
            <audio
                ref={audioRef}
                src={loserTrack?.audioUrl}
                preload="auto"
                loop={false}
                onError={() => setError('Could not load "Loser". Please check the audio URL.')}
            />

            <div className="experience-landscape" aria-hidden="true" />
            <div className="experience-vignette" aria-hidden="true" />

            {phase === "intro" && (
                <section className="experience-intro">
                    <div className="experience-intro-meta">
                        <span>TAME IMPALA / AUDIOVISUAL STUDY</span>
                        <span>EXPERIMENT 004</span>
                    </div>

                    <div className="experience-intro-center">
                        <p className="experience-kicker">A DEADBEAT IMMERSIVE EXPERIENCE</p>
                        <h1>LOSE YOUR<br /><span>PLACE IN TIME.</span></h1>
                        <p className="experience-intro-copy">
                            Put on your headphones. Let the world fall away.
                        </p>
                        <button className="experience-begin" onClick={beginExperience} type="button">
                            <span className="experience-play-icon" aria-hidden="true">▶</span>
                            <span>CLICK TO BEGIN</span>
                        </button>
                        {error && <p className="experience-error" role="alert">{error}</p>}
                    </div>

                    <div className="experience-intro-bottom">
                        <span>LOSER — DEADBEAT</span>
                        <span>SOUND / LIGHT / MOTION</span>
                    </div>
                </section>
            )}

            {phase === "transition" && (
                <div className="experience-blackout" aria-label="Transitioning into the experience" />
            )}

            {phase === "film" && (
                <div className="experience-controls">
                    <div className="experience-track-label">
                        <span className="experience-live-dot" />
                        <span>NOW PLAYING</span>
                        <strong>LOSER</strong>
                    </div>
                    <div className="experience-control-actions">
                        <button type="button" onClick={toggleMute}>
                            {muted ? "UNMUTE SOUND" : "MUTE SOUND"}
                        </button>
                        <button type="button" onClick={exitExperience}>EXIT EXPERIENCE ×</button>
                    </div>
                </div>
            )}

            <p className="experience-disclaimer">
                Unofficial fan-made concept. Not affiliated with Tame Impala.
            </p>
        </main>
    );
}
