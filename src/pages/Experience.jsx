
import { useCallback, useEffect, useRef, useState } from "react";
import "./Experience.css";
import { tracks } from "../data/tracks";
import { useAudioPlayer } from "../context/AudioPlayerContext";

const loserTrack = tracks.find((track) => track.title === "Loser");

export default function Experience() {
    const { stopPlayback } = useAudioPlayer();
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const timerRef = useRef(null);
    const frameRef = useRef(null);

    const [phase, setPhase] = useState("intro");
    const [muted, setMuted] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // Stop the site-wide player as soon as the Experience route mounts.
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
            if (timerRef.current) {
                window.clearTimeout(timerRef.current);
            }

            if (frameRef.current) {
                window.cancelAnimationFrame(frameRef.current);
            }

        };
    }, []);

    const beginExperience = useCallback(async () => {
        const audio = audioRef.current;

        if (!audio || !loserTrack) {
            setError('The "Loser" track could not be found.');
            return;
        }

        setError("");
        // Stop and reset the global site player when the user clicks "Click to Begin".
        stopPlayback();
        audio.volume = 0.85;
        audio.muted = false;
        setMuted(false);

        try {
            // Keep playback on the native HTML audio element. This avoids routing
            // audio through a suspended/closed Web Audio context, which can make
            // the track appear to play while producing no sound in React StrictMode.

            // Start playback only after the audio graph is ready.
            await audio.play();

            setPhase("transition");

            if (timerRef.current) window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => {
                setPhase("visualizer");
                timerRef.current = null;
            }, 2200);
        } catch (err) {
            console.error("Unable to start the experience:", err);
            setError('Could not play "Loser". Open the browser console for details.');
        }
    }, []);

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
        const audio = audioRef.current;

        if (!canvas || !audio) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // The graph is created once in beginExperience(), from the user's click.
        // Do not call createMediaElementSource() again for the same audio element.
        const analyser = analyserRef.current;
        const frequencyData = analyser
            ? new Uint8Array(analyser.frequencyBinCount)
            : null;

        let width = 0;
        let height = 0;
        let dpr = 1;
        let lastTime = 0;
        let bassSmooth = 0;
        let midSmooth = 0;
        let trebleSmooth = 0;

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

        const averageBand = (start, end) => {
            if (!analyser || !frequencyData) return 0;

            let sum = 0;
            const limit = Math.min(end, frequencyData.length);

            for (let i = start; i < limit; i++) {
                sum += frequencyData[i];
            }

            return limit > start
                ? sum / (limit - start) / 255
                : 0;
        };

        const draw = (timestamp) => {
            frameRef.current = window.requestAnimationFrame(draw);

            const delta = Math.min(
                (timestamp - (lastTime || timestamp)) / 1000,
                0.05
            );

            lastTime = timestamp;

            if (analyser && frequencyData) {
                analyser.getByteFrequencyData(frequencyData);
            }

            const bass = averageBand(1, 10);
            const mids = averageBand(10, 48);
            const highs = averageBand(48, 125);

            bassSmooth += (bass - bassSmooth) * 0.12;
            midSmooth += (mids - midSmooth) * 0.085;
            trebleSmooth += (highs - trebleSmooth) * 0.09;

            const t = timestamp * 0.00016;
            const pulse = bassSmooth;
            const horizon = height * (
                0.535 + Math.sin(t * 0.7) * 0.012
            );

            ctx.clearRect(0, 0, width, height);

            // Deep black-green base.
            ctx.fillStyle = "#050704";
            ctx.fillRect(0, 0, width, height);

            // A hazy glow blooms with the low end.
            const glowRadius =
                Math.min(width, height) * (0.25 + pulse * 0.22);

            const glow = ctx.createRadialGradient(
                width * 0.5,
                horizon,
                0,
                width * 0.5,
                horizon,
                glowRadius * 2.4
            );

            glow.addColorStop(
                0,
                `rgba(195,255,45,${0.15 + pulse * 0.23})`
            );
            glow.addColorStop(
                0.38,
                `rgba(111,143,23,${0.09 + midSmooth * 0.1})`
            );
            glow.addColorStop(1, "rgba(5,7,4,0)");

            ctx.fillStyle = glow;
            ctx.fillRect(0, 0, width, height);

            // Distant, irregular silhouette.
            ctx.beginPath();
            ctx.moveTo(0, horizon + 9);

            for (let x = 0; x <= width + 8; x += 8) {
                const ridge =
                    Math.sin(x * 0.011 + t) * 7 +
                    Math.sin(x * 0.035 - t * 1.7) * 3;

                ctx.lineTo(x, horizon + ridge + pulse * 8);
            }

            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();

            ctx.fillStyle = "#080b05";
            ctx.fill();

            // Liquid contours ripple outward from the horizon.
            const ribbonCount = 34;

            for (let j = 0; j < ribbonCount; j++) {
                const depth = j / ribbonCount;
                const baseY = horizon + 8 + depth * height * 0.55;
                const amplitude =
                    (4 + depth * 24 + pulse * 35) *
                    (1 + midSmooth * 0.5);

                ctx.beginPath();

                for (let x = 0; x <= width + 4; x += 4) {
                    const nx = x / width;

                    const centerPull = Math.exp(
                        -Math.pow((nx - 0.5) * 3.2, 2)
                    );

                    const wave =
                        Math.sin(nx * 11 + t * (0.8 + depth) + j * 0.19) *
                        amplitude;

                    const ripple =
                        Math.sin(nx * 27 - t * 1.6 + j * 0.32) *
                        amplitude * 0.27;

                    const distortion =
                        Math.sin(nx * 5 + t * 0.55) *
                        midSmooth * 22 * centerPull;

                    const y =
                        baseY +
                        wave +
                        ripple +
                        distortion +
                        Math.sin(t + j) * pulse * 9;

                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }

                const alpha =
                    0.11 + depth * 0.24 + trebleSmooth * 0.16;

                ctx.strokeStyle = `rgba(195,255,45,${alpha})`;
                ctx.lineWidth = j % 5 === 0 ? 1.35 : 0.7;
                ctx.stroke();
            }

            // Sparse flickers on brighter high-frequency moments.
            if (trebleSmooth > 0.2) {
                ctx.fillStyle =
                    `rgba(224,255,135,${trebleSmooth * 0.28})`;

                for (let i = 0; i < 30; i++) {
                    const x =
                        (i * 137.5 +
                            timestamp * (0.008 + trebleSmooth * 0.02)) %
                        width;

                    const y =
                        horizon + 12 +
                        ((i * 47) % Math.max(1, height * 0.42));

                    ctx.fillRect(x, y, 1.3, 1.3);
                }
            }

            // Gentle grain.
            ctx.fillStyle =
                `rgba(220,255,150,${0.025 + trebleSmooth * 0.025})`;

            for (let i = 0; i < 100; i++) {
                const x = (i * 97.31 + timestamp * 0.006) % width;
                const y = (i * 53.17 + timestamp * 0.003) % height;

                ctx.fillRect(x, y, 1, 1);
            }

            // Analog scanlines.
            ctx.fillStyle = "rgba(0,0,0,0.13)";

            for (let y = 0; y < height; y += 4) {
                ctx.fillRect(0, y, width, 1);
            }

            // Vignette.
            const vignette = ctx.createRadialGradient(
                width / 2,
                height / 2,
                height * 0.12,
                width / 2,
                height / 2,
                Math.max(width, height) * 0.72
            );

            vignette.addColorStop(0, "rgba(0,0,0,0)");
            vignette.addColorStop(1, "rgba(0,0,0,0.72)");

            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, width, height);

            // Avoid an unused delta warning while keeping timing capped.
            void delta;
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
                onPlaying={() => console.log("Audio playing")}
                onPause={() => console.log("Audio paused")}
                onEnded={() => console.log("Audio ended")}
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
                        aria-label="Audio-reactive liquid horizon visualizer"
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

                            <button
                                type="button"
                                onClick={exitExperience}
                            >
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
