
import { NavLink } from "react-router";

const links = [
    { label: "THE EVENT", to: "/" },
    { label: "TOUR", to: "/tour" },
    { label: "EXPERIENCE", to: "/experience" },
    { label: "THE RECORD", to: "/album" },
];

export default function Navbar() {
    return (
        <header className="navbar">
            <NavLink to="/" className="brand" aria-label="Deadbeat home">
                <span className="brand-mark">T</span>
                <span className="brand-name">DEADBEAT / LIVE</span>
            </NavLink>

            <nav className="nav-links" aria-label="Main navigation">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.to === "/"}
                        className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : ""}`
                        }
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            <NavLink to="/tour" className="nav-cta">
                FIND A SHOW <span>↗</span>
            </NavLink>
        </header>
    );
}
