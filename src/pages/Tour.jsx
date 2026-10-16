import { Link } from "react-router";
import styles from "../styles/Tour.module.css";

const tourStops = [
    { city: "MUMBAI", venue: "Mahalaxmi Racecourse", date: "14 NOV 2026", time: "7:30 PM IST", number: "01" },
    { city: "BENGALURU", venue: "Bangalore Palace Grounds", date: "18 NOV 2026", time: "7:30 PM IST", number: "02" },
    { city: "HYDERABAD", venue: "Gachibowli Stadium", date: "22 NOV 2026", time: "7:00 PM IST", number: "03" },
    { city: "NEW DELHI", venue: "Jawaharlal Nehru Stadium", date: "27 NOV 2026", time: "7:30 PM IST", number: "04" },
    { city: "PUNE", venue: "Mahalunge Ground", date: "02 DEC 2026", time: "7:00 PM IST", number: "05" },
    { city: "KOLKATA", venue: "Aquatica Grounds", date: "06 DEC 2026", time: "7:30 PM IST", number: "06" },
];

export default function Tour() {
    return (
        <main className={`${styles.page} page-shell`}>
            <div className="page-kicker">
                <span>02</span>
                <span>LIVE / ON THE ROAD</span>
                <span>INDIA TOUR CONCEPT</span>
            </div>

            <section className={styles.heading}>
                <p className={`eyebrow ${styles.eyebrow}`}>
                    <span className="status-dot" />
                    THE DEADBEAT TOUR · INDIA
                </p>
                <h1 className={`display-title ${styles.title}`}>
                    FIND YOUR
                    <br />
                    <span>FREQUENCY.</span>
                </h1>
                <p className={styles.intro}>
                    One night. One city. A different state of mind.
                    Find your stop on the Deadbeat tour.
                </p>
                <div className={styles.summary}>
                    <span>06 CITIES</span>
                    <span>01 EXPERIENCE</span>
                    <span>ALL NIGHT LONG</span>
                </div>
            </section>

            <section className={styles.board}>
                <div className={styles.boardTop}>
                    <span>THE ROUTE / 2026</span>
                    <span>SCROLL TO EXPLORE ↓</span>
                </div>

                <div className={styles.timeline}>
                    <svg
                        className={styles.routeLine}
                        viewBox="0 0 100 1000"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <path
                            className={styles.routeGlow}
                            d="M50 0 C50 70 15 80 15 155 S85 245 85 325 S15 410 15 495 S85 575 85 655 S15 745 15 825 S50 930 50 1000"
                        />
                        <path
                            className={styles.routePath}
                            d="M50 0 C50 70 15 80 15 155 S85 245 85 325 S15 410 15 495 S85 575 85 655 S15 745 15 825 S50 930 50 1000"
                        />
                    </svg>

                    {tourStops.map((stop, index) => (
                        <article
                            className={`${styles.stop} ${index % 2 === 0 ? styles.stopLeft : styles.stopRight}`}
                            key={stop.number}
                        >
                            <div className={styles.stopContent}>
                                <div className={styles.stopMeta}>
                                    <span>STOP {stop.number}</span>
                                    <span className={styles.stopStar} aria-hidden="true">✳</span>
                                </div>
                                <p className={styles.stopDate}>{stop.date}</p>
                                <h2>{stop.city}</h2>
                                <p className={styles.stopVenue}>{stop.venue}</p>
                                <div className={styles.stopBottom}>
                                    <span>{stop.time}</span>
                                    <span className={styles.ticketLabel}>TICKETS SOON ↗</span>
                                </div>
                            </div>
                            <div className={styles.stopNode} aria-hidden="true">
                                <span>{stop.number}</span>
                            </div>
                        </article>
                    ))}
                </div>

                <div className={styles.boardFooter}>
                    <span>END OF THE LINE</span>
                    <span>THE NIGHT IS YOURS <span className={styles.lime}>✳</span></span>
                </div>
            </section>

            <section className={styles.note}>
                <span className={styles.noteSymbol} aria-hidden="true">✳</span>
                <div>
                    <p className="eyebrow">YOUR CITY. YOUR NIGHT.</p>
                    <h2>READY TO<br />LOSE YOURSELF?</h2>
                    <p className={styles.noteCopy}>
                        Pick your city, bring your people, and let the music take over.
                    </p>
                    <Link to="/experience" className="button button-lime">
                        ENTER THE EXPERIENCE <span>↗</span>
                    </Link>
                </div>
            </section>

            <p className={styles.disclaimer}>
                UNOFFICIAL FAN-MADE CONCEPT · ALL LOCATIONS, DATES AND VENUES ARE
                PLACEHOLDERS, NOT CONFIRMED TOUR ANNOUNCEMENTS.
            </p>

            <div className="page-next">
                <span>CHANGE THE FREQUENCY</span>
                <Link to="/experience">THE EXPERIENCE <span>↗</span></Link>
            </div>
        </main>
    );
}
