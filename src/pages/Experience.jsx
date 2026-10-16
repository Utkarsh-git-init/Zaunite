
import { Link } from "react-router";

const bars = Array.from({ length: 45 }, (_, i) => ({
    id: i,
    height: 14 + ((i * 37 + i * i * 11) % 83),
}));

export default function Experience() {
    return (
        <main className="experience-page">
            <div className="experience-top">
                <span className="eyebrow">TAME IMPALA / AUDIOVISUAL STUDY</span>
                <span className="experience-number">EXPERIMENT 004</span>
            </div>

            <section className="experience-hero">
                <p className="experience-overline">LOSE YOUR PLACE IN TIME</p>
                <h1>
                    FEEL<br />
                    <span>EVERY</span><br />
                    FREQUENCY.
                </h1>

                <div className="waveform" aria-label="Decorative waveform">
                    {bars.map((bar) => (
                        <span
                            key={bar.id}
                            style={{ height: `${bar.height}%` }}
                        />
                    ))}
                </div>

                <div className="experience-footer">
                    <p>
                        A visual interpretation of sound, repetition, and
                        psychedelic space. Best experienced with headphones.
                    </p>
                    <Link to="/album" className="button button-lime">
                        BACK TO THE RECORD <span>↗</span>
                    </Link>
                </div>
            </section>

            <div className="experience-orbit orbit-one" />
            <div className="experience-orbit orbit-two" />
            <span className="experience-side-note">SOUND / LIGHT / MOTION</span>
        </main>
    );
}
