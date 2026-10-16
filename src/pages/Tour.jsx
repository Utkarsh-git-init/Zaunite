
import { Link } from "react-router";

export default function Tour() {
    return (
        <main className="page-shell tour-page">
            <div className="page-kicker">
                <span>02</span>
                <span>LIVE / ON THE ROAD</span>
                <span>TOUR DESK</span>
            </div>

            <section className="tour-heading">
                <p className="eyebrow">FEEL IT IN THE ROOM</p>
                <h1 className="display-title">
                    OUT OF<br /><span>BODY.</span>
                </h1>
                <p>
                    Some sounds belong in a room full of people.
                    This is where to find the live-show information.
                </p>
            </section>

            <section className="tour-board">
                <div className="tour-board-top">
                    <span>LIVE DATES</span>
                    <span>TO BE ANNOUNCED / VERIFIED</span>
                </div>

                <div className="tour-empty">
                    <span className="tour-symbol">✳</span>
                    <h2>THE NEXT SIGNAL<br />ISN'T IN YET.</h2>
                    <p>
                        No tour dates are listed on this concept page right now.
                        Check the artist's official channels for confirmed dates
                        and authorised ticket links.
                    </p>
                    <span className="tour-empty-index">T.I. — LIVE ARCHIVE</span>
                </div>
            </section>

            <div className="page-next">
                <span>CHANGE THE FREQUENCY</span>
                <Link to="/experience">THE EXPERIENCE <span>↗</span></Link>
            </div>
        </main>
    );
}
