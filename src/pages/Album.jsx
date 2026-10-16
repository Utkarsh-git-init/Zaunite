
import { Link } from "react-router";

const artistImage =
    "/images/kevin-parker-lead-singer-of-tame-impala-DP6PHKZCIJFIPDSUPEWNPG6C7M.avif";

export default function Album() {
    return (
        <main className="page-shell album-page">
            <div className="page-kicker">
                <span>01</span>
                <span>THE RECORD</span>
                <span>STUDIO / ALBUM</span>
            </div>

            <section className="album-grid">
                <div className="album-copy">
                    <p className="eyebrow">TAME IMPALA PRESENTS</p>
                    <h1 className="display-title">
                        DEAD<br /><span>BEAT.</span>
                    </h1>
                    <p className="album-intro">
                        A world of its own. Built from rhythm, texture,
                        repetition, and the feeling that something is just
                        about to change.
                    </p>

                    <div className="album-meta">
                        <div>
                            <span className="meta-label">ARTIST</span>
                            <strong>Tame Impala</strong>
                        </div>
                        <div>
                            <span className="meta-label">PROJECT</span>
                            <strong>Deadbeat</strong>
                        </div>
                        <div>
                            <span className="meta-label">FORMAT</span>
                            <strong>Studio album</strong>
                        </div>
                    </div>

                    <p className="small-note">
                        Independent fan-made concept website. Album details and
                        track information should be verified against official sources.
                    </p>
                </div>

                <div className="album-art">
                    <div className="album-art-frame">
                        <img src={artistImage} alt="Tame Impala artist photography" />
                        <div className="art-stamp">TI<br />DB</div>
                        <span className="art-caption">SOUND IN COLOUR — 01</span>
                    </div>
                    <span className="art-side-label">DEADBEAT / TAME IMPALA</span>
                </div>
            </section>

            <section className="tracklist">
                <div className="tracklist-heading">
                    <span className="eyebrow">INSIDE THE RECORD</span>
                    <span className="track-count">TRACKLIST / TO BE VERIFIED</span>
                </div>
                <div className="track-row">
                    <span>01</span>
                    <span>Official tracklist</span>
                    <span>—</span>
                </div>
                <p className="small-note">
                    Replace this row with the confirmed tracklist before publishing.
                </p>
            </section>

            <div className="page-next">
                <span>UP NEXT</span>
                <Link to="/tour">LIVE SHOWS <span>↗</span></Link>
            </div>
        </main>
    );
}
