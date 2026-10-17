import { useCallback, useEffect, useRef, useState } from "react";
import "./Experience.css";
import { tracks } from "../data/tracks";
import { useAudioPlayer } from "../context/AudioPlayerContext";

const loserTrack = tracks.find((track) => track.title === "Loser");

export default function Experience() {
    const { stopPlayback } = useAudioPlayer();
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const timerRef = useRef(null);
    const frameRef = useRef(null);

    const [phase, setPhase] = useState("intro");
    const [muted, setMuted] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        stopPlayback();
    }, [stopPlayback]);

    useEffect(() => {
        const immersive = phase === "transition" || phase === "visualizer";
        document.body.classList.toggle("experience-mode", immersive);

        return () => {
            document.body.classList.remove("experience-mode");
        };
    }, [phase]);

    useEffect(() => {
        return () => {
            if (timerRef.current) window.clearTimeout(timerRef.current);
            if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
        };
    }, []);

    const beginExperience = useCallback(async () => {
        const audio = audioRef.current;

        if (!audio || !loserTrack) {
            setError('The "Loser" track could not be found.');
            return;
        }

        setError("");
        stopPlayback();
        audio.volume = 0.85;
        audio.muted = false;
        setMuted(false);

        try {
            await audio.play();
            setPhase("transition");

            if (timerRef.current) window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => {
                setPhase("visualizer");
                timerRef.current = null;
            }, 2200);
        } catch (err) {
            console.error("Unable to start the experience:", err);
            setError('Could not play "Loser". Check the audio URL and browser console.');
        }
    }, [stopPlayback]);

    const toggleMute = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.muted = !audio.muted;
        setMuted(audio.muted);
    }, []);

    const exitExperience = useCallback(() => {
        if (timerRef.current) {
            window.clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        if (frameRef.current) {
            window.cancelAnimationFrame(frameRef.current);
            frameRef.current = null;
        }

        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            audio.muted = false;
        }

        setMuted(false);
        setError("");
        setPhase("intro");
    }, []);

    useEffect(() => {
        if (phase !== "visualizer") return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let dpr = 1;

        const resize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const draw = (timestamp) => {
            frameRef.current = window.requestAnimationFrame(draw);

            const t = timestamp * 0.00035;
            const bassPulse = 0.5 + 0.5 * Math.sin(t * 1.8);
            const midPulse = 0.5 + 0.5 * Math.sin(t * 1.15 + 1.7);
            const horizon = height * (0.48 + Math.sin(t * 0.55) * 0.018);

            // Deep black-green background.
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "#030502";
            ctx.fillRect(0, 0, width, height);

            // Large, unmistakable lime bloom around the horizon.
            const glowRadius = Math.max(width * 0.7, height * 0.75);
            const glow = ctx.createRadialGradient(
                width * 0.5, horizon, 0,
                width * 0.5, horizon, glowRadius
            );
            glow.addColorStop(0, `rgba(195,255,45,${0.24 + bassPulse * 0.2})`);
            glow.addColorStop(0.25, `rgba(128,176,28,${0.13 + midPulse * 0.09})`);
            glow.addColorStop(0.62, "rgba(43,67,12,0.13)");
            glow.addColorStop(1, "rgba(3,5,2,0)");
            ctx.fillStyle = glow;
            ctx.fillRect(0, 0, width, height);

            // Bright horizon line.
            ctx.save();
            ctx.shadowColor = "#c3ff2d";
            ctx.shadowBlur = 28 + bassPulse * 30;
            ctx.strokeStyle = `rgba(225,255,145,${0.75 + bassPulse * 0.2})`;
            ctx.lineWidth = 2 + bassPulse * 1.5;
            ctx.beginPath();
            ctx.moveTo(0, horizon);
            ctx.lineTo(width, horizon);
            ctx.stroke();
            ctx.restore();

            // Distant silhouette, with more dramatic movement.
            ctx.beginPath();
            ctx.moveTo(0, horizon + 14);
            for (let x = 0; x <= width + 6; x += 6) {
                const ridge =
                    Math.sin(x * 0.008 + t * 1.2) * 13 +
                    Math.sin(x * 0.023 - t * 1.6) * 7 +
                    Math.sin(x * 0.045 + t * 0.8) * 3;
                ctx.lineTo(x, horizon + 10 + ridge + bassPulse * 8);
            }
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            ctx.fillStyle = "#060904";
            ctx.fill();

            // More visible, layered liquid contour waves.
            const ribbonCount = 46;
            for (let j = 0; j < ribbonCount; j++) {
                const depth = j / ribbonCount;
                const baseY = horizon + 10 + depth * height * 0.62;
                const amplitude = 5 + depth * 38 + bassPulse * (12 + depth * 18);

                ctx.beginPath();
                for (let x = 0; x <= width + 4; x += 4) {
                    const nx = x / Math.max(width, 1);
                    const centerPull = Math.exp(-Math.pow((nx - 0.5) * 2.6, 2));
                    const broadWave = Math.sin(nx * 10 + t * (1.1 + depth) + j * 0.2) * amplitude;
                    const fineWave = Math.sin(nx * 25 - t * 1.9 + j * 0.34) * amplitude * 0.3;
                    const centerDistortion = Math.sin(nx * 5 + t * 0.8) * midPulse * 28 * centerPull;
                    const y = baseY + broadWave + fineWave + centerDistortion;

                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }

                const alpha = 0.28 + depth * 0.42;
                ctx.save();
                ctx.shadowColor = "#bfff35";
                ctx.shadowBlur = j % 4 === 0 ? 9 + bassPulse * 8 : 2;
                ctx.strokeStyle = j % 4 === 0
                    ? `rgba(225,255,140,${Math.min(alpha + 0.2, 0.95)})`
                    : `rgba(195,255,45,${Math.min(alpha, 0.82)})`;
                ctx.lineWidth = j % 4 === 0 ? 2 : 1.15;
                ctx.stroke();
                ctx.restore();
            }

            // Animated vertical equalizer bars on both sides of the horizon.
            const barCount = Math.min(100, Math.max(42, Math.floor(width / 14)));
            const barGap = width / barCount;
            for (let i = 0; i < barCount; i++) {
                const wave1 = Math.abs(Math.sin(i * 0.28 + t * 2.3));
                const wave2 = Math.abs(Math.sin(i * 0.11 - t * 1.45));
                const centerBoost = Math.exp(-Math.pow((i / barCount - 0.5) * 3, 2));
                const barHeight = height * (
                    0.018 + wave1 * 0.07 + wave2 * 0.04 + centerBoost * bassPulse * 0.07
                );
                const x = i * barGap + barGap * 0.28;
                const y = horizon - height * 0.025 - barHeight;

                ctx.fillStyle = `rgba(195,255,45,${0.22 + wave1 * 0.42})`;
                ctx.fillRect(x, y, Math.max(1.5, barGap * 0.25), barHeight);
            }

            // Floating sparks moving through the glow.
            for (let i = 0; i < 90; i++) {
                const x = (i * 137.5 + timestamp * (0.012 + (i % 5) * 0.003)) % Math.max(width, 1);
                const y = (
                    horizon + 20 +
                    ((i * 47 + timestamp * (0.012 + (i % 3) * 0.006)) % Math.max(height * 0.48, 1))
                );
                const size = i % 9 === 0 ? 2.2 : 1.1;
                ctx.fillStyle = `rgba(220,255,135,${0.22 + (i % 5) * 0.1})`;
                ctx.fillRect(x, y, size, size);
            }

            // Subtle analog scanlines.
            ctx.fillStyle = "rgba(0,0,0,0.12)";
            for (let y = 0; y < height; y += 4) {
                ctx.fillRect(0, y, width, 1);
            }

            // Cinematic vignette, without hiding the visualizer.
            const vignette = ctx.createRadialGradient(
                width / 2, height / 2, height * 0.12,
                width / 2, height / 2, Math.max(width, height) * 0.78
            );
            vignette.addColorStop(0, "rgba(0,0,0,0)");
            vignette.addColorStop(1, "rgba(0,0,0,0.52)");
            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, width, height);
        };

        resize();
        window.addEventListener("resize", resize);
        frameRef.current = window.requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", resize);
            if (frameRef.current) {
                window.cancelAnimationFrame(frameRef.current);
                frameRef.current = null;
            }
        };
    }, [phase]);

    return (
        <main className={`deadbeat-experience phase-${phase}`}>
            <audio
                ref={audioRef}
                src={loserTrack?.audioUrl}
                preload="auto"
                onError={(event) => {
                    console.error("Audio error:", event.currentTarget.error);
                    setError('Could not load "Loser". Please check the audio URL.');
                }}
            />

            {phase === "intro" && (
                <>
                    <div className="experience-landscape" aria-hidden="true" />
                    <div className="experience-vignette" aria-hidden="true" />

                    <header className="experience-header">
                        <span>✳ &nbsp; DEADBEAT</span>
                        <span>
                            AN AUDIO-VISUAL EXPERIENCE
                            <br />
                            BY TAME IMPALA
                        </span>
                    </header>

                    <div className="experience-side-note">
                        SAME SONGS.
                        <br />
                        DIFFERENT PLACES.
                        <br />
                        WORSE DECISIONS.
                    </div>

                    <div className="experience-intro-center">
                        <p className="experience-overline">
                            AN IMMERSIVE AUDIO-VISUAL EXPERIENCE
                        </p>

                        <button
                            className="experience-play"
                            type="button"
                            onClick={beginExperience}
                            aria-label='Play "Loser" and begin the experience'
                        >
                            <span className="play-triangle" />
                        </button>

                        <p className="experience-prompt">CLICK TO BEGIN</p>

                        {error && (
                            <p className="experience-error" role="alert">
                                {error}
                            </p>
                        )}
                    </div>

                    <footer className="experience-footer">
                        <span>0.0° N &nbsp; 0.0° E</span>
                        <span>EST. 2026</span>
                    </footer>
                </>
            )}

            {phase === "transition" && (
                <div className="experience-blackout" aria-hidden="true" />
            )}

            {phase === "visualizer" && (
                <>
                    <canvas
                        className="experience-canvas"
                        ref={canvasRef}
                        aria-label="Animated liquid horizon and signal visualizer"
                    />

                    <div className="experience-hud">
                        <span className="experience-brand">✳ DEADBEAT</span>
                        <span className="experience-now-playing">
                            NOW PLAYING — LOSER
                        </span>
                        <span className="experience-bottom-left">
                            <i />
                            SOUND / LIGHT / MOTION
                        </span>

                        <div className="experience-control-buttons">
                            <button
                                type="button"
                                onClick={toggleMute}
                                aria-pressed={muted}
                            >
                                {muted ? "UNMUTE +" : "MUTE −"}
                            </button>

                            <button type="button" onClick={exitExperience}>
                                EXIT ×
                            </button>
                        </div>
                    </div>
                </>
            )}

            <p className="experience-disclaimer">
                Unofficial fan-made concept. Not affiliated with Tame Impala.
            </p>
        </main>
    );
}
