
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
                    TAME IMPALA · DEADBEAT TOUR
                </div>

                <h1 className="deadbeat-title">
                    DEAD<span>BEAT</span>
                </h1>

                <div className="home-bottom">
                    <p className="home-description">
                        TAME IMPALA
                        <span>Tickets for the new album tour.</span>
                        <span>Find your city. Experience Deadbeat live.</span>
                    </p>

                    <div className="home-actions">
                        <Link to="/tour" className="button button-lime">
                            EXPLORE TOUR <span>↗</span>
                        </Link>
                    </div>
                </div>

                <div className="home-index">
                    <span>DEADBEAT / LIVE</span>
                    <span>TICKETS · TOUR LOCATIONS · INDIA</span>
                </div>
            </section>
        </main>
    );
}
