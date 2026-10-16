
import { Link } from "react-router";

const artistImage =
    "/images/kevin-parker-lead-singer-of-tame-impala-DP6PHKZCIJFIPDSUPEWNPG6C7M.avif";

export default function Home() {
    return (
        <main className="home-page">
            <div className="home-image" aria-hidden="true">
                <img src={artistImage} alt="" />
            </div>
            <div className="home-shade" />

            <section className="home-content">
                <div className="eyebrow home-eyebrow">
                    <span className="status-dot" />
                    A NEW CHAPTER IN SOUND
                </div>

                <h1 className="deadbeat-title">
                    DEAD<span>BEAT</span>
                </h1>

                <div className="home-bottom">
                    <p className="home-description">
                        TAME IMPALA
                        <span>Turn the noise up. Let the world disappear.</span>
                    </p>

                    <div className="home-actions">
                        <Link to="/album" className="button button-lime">
                            EXPLORE THE ALBUM <span>↗</span>
                        </Link>
                        <Link to="/experience" className="button button-outline">
                            ENTER THE EXPERIENCE <span>↗</span>
                        </Link>
                    </div>
                </div>

                <div className="home-index">
                    <span>01 / 04</span>
                    <span>AN INDEPENDENT FAN-MADE CONCEPT</span>
                </div>
            </section>
        </main>
    );
}
