
import { Route, Routes } from "react-router";
import SiteLayout from "./layouts/SiteLayout";
import Home from "./pages/Home";
import Album from "./pages/Album";
import Tour from "./pages/Tour";
import Experience from "./pages/Experience";

import Tickets from "./pages/Tickets";
import Checkout from "./pages/Checkout";
import BookingConfirmation from "./pages/BookingConfirmation";



export default function App() {
    return (
        <Routes>
            <Route element={<SiteLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/album" element={<Album />} />
                <Route path="/tour" element={<Tour />} />
                <Route path="/experience" element={<Experience />} />

                // Inside the existing SiteLayout route:
                <Route path="tickets" element={<Tickets />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="booking/confirmation" element={<BookingConfirmation />}/>

                <Route
                    path="*"
                    element={
                        <main className="page-shell not-found">
                            <span className="eyebrow">404 — WRONG TURN</span>
                            <h1>NOT THIS<br />UNIVERSE.</h1>
                            <a className="text-link" href="/">Return home ↗</a>
                        </main>
                    }
                />
            </Route>
        </Routes>
    );
}
