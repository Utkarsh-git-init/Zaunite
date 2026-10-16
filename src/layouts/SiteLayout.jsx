import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function SiteLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}