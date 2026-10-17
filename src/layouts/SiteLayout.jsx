import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function SiteLayout() {
    return (
        <>
            <div className="site-background" aria-hidden="true">
                <img
                    src="/images/kevin-parker-lead-singer-of-tame-impala-DP6PHKZCIJFIPDSUPEWNPG6C7M.avif"
                    alt=""
                />
                <div className="site-background-shade" />
            </div>
            <div className="site-content">
                <Navbar />
                <Outlet />
            </div>
        </>
    );
}
