
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const SERVICE_FEE = 99;

export default function Checkout() {
    const navigate = useNavigate();
    const [booking] = useState(() => {
        try {
            return JSON.parse(sessionStorage.getItem("deadbeatBooking")) || null;
        } catch {
            return null;
        }
    });

    const [attendee, setAttendee] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [error, setError] = useState("");

    if (!booking || !Array.isArray(booking.tickets) || booking.tickets.length === 0) {
        return (
            <main className="min-h-screen bg-[#090a08] px-5 pb-16 pt-32 text-[#f3f2e9]">
                <div className="mx-auto max-w-xl">
                    <p className="font-mono text-xs tracking-widest text-[#d5ff3f]">
                        CHECKOUT / NOTHING HERE
                    </p>
                    <h1 className="mt-4 text-4xl font-black uppercase">
                        Your cart is taking a nap.
                    </h1>
                    <p className="mt-3 text-sm text-white/50">
                        Pick some tickets first. The void can wait.
                    </p>
                    <Link
                        to="/tour"
                        className="mt-7 inline-flex border border-[#d5ff3f] px-5 py-3 font-mono text-xs text-[#d5ff3f] hover:bg-[#d5ff3f] hover:text-black"
                    >
                        FIND A CITY ↗
                    </Link>
                </div>
            </main>
        );
    }

    const subtotal = booking.tickets.reduce(
        (sum, ticket) => sum + ticket.price * ticket.quantity,
        0,
    );
    const total = subtotal + SERVICE_FEE;

    function updateField(event) {
        setAttendee((current) => ({
            ...current,
            [event.target.name]: event.target.value,
        }));
    }

    function placeDemoOrder(event) {
        event.preventDefault();
        setError("");

        const name = attendee.name.trim();
        const email = attendee.email.trim();
        const phone = attendee.phone.trim();

        if (!name || !email || !phone) {
            setError("Fill in all the fields. The universe demands paperwork.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("That email doesn't look right. Check it once.");
            return;
        }

        const confirmation = {
            ...booking,
            subtotal,
            serviceFee: SERVICE_FEE,
            total,
            attendee: { name, email, phone },
            reference: `DB-${Date.now().toString(36).toUpperCase()}`,
            createdAt: new Date().toISOString(),
        };

        sessionStorage.setItem(
            "deadbeatConfirmation",
            JSON.stringify(confirmation),
        );
        sessionStorage.removeItem("deadbeatBooking");

        navigate("/booking/confirmation");
    }

    return (
        <main className="checkout-page min-h-screen bg-[#090a08] px-5 pb-36 pt-28  text-[#f3f2e9] sm:px-8">
            <div className="mx-auto max-w-5xl">
                <Link
                    to={`/tickets?city=${encodeURIComponent(booking.city || "Mumbai")}`}
                    className="font-mono text-[10px] tracking-widest text-white/45 hover:text-[#d5ff3f]"
                >
                    ← BACK TO TICKETS
                </Link>

                <header className="mt-7">
                    <p className="font-mono text-xs tracking-[0.25em] text-[#d5ff3f]">
                        CHECKOUT / DEMO MODE
                    </p>
                    <h1 className="mt-3 text-5xl font-black uppercase tracking-tight sm:text-6xl">
                        ONE LAST <span className="text-[#d5ff3f]">THING.</span>
                    </h1>
                    <p className="mt-3 text-sm text-white/45">
                        Your tickets are imaginary. Your spelling shouldn't be.
                    </p>
                </header>

                <div className="mt-10 grid gap-8 md:grid-cols-[1fr_320px]">
                    <form
                        onSubmit={placeDemoOrder}
                        className="space-y-6 border border-white/15 p-5 sm:p-7"
                    >
                        <div>
                            <h2 className="text-xl font-bold uppercase">Who’s going?</h2>
                            <p className="mt-1 text-xs text-white/40">
                                Enter demo attendee details.
                            </p>
                        </div>

                        <label className="block">
              <span className="font-mono text-[10px] tracking-widest text-white/55">
                FULL NAME
              </span>
                            <input
                                name="name"
                                autoComplete="name"
                                value={attendee.name}
                                onChange={updateField}
                                maxLength={100}
                                required
                                className="mt-2 min-h-12 w-full border border-white/20 bg-transparent px-3 text-sm outline-none focus:border-[#d5ff3f]"
                                placeholder="Your name"
                            />
                        </label>

                        <label className="block">
              <span className="font-mono text-[10px] tracking-widest text-white/55">
                EMAIL ADDRESS
              </span>
                            <input
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={attendee.email}
                                onChange={updateField}
                                maxLength={254}
                                required
                                className="mt-2 min-h-12 w-full border border-white/20 bg-transparent px-3 text-sm outline-none focus:border-[#d5ff3f]"
                                placeholder="you@example.com"
                            />
                        </label>

                        <label className="block">
              <span className="font-mono text-[10px] tracking-widest text-white/55">
                PHONE NUMBER
              </span>
                            <input
                                name="phone"
                                type="tel"
                                autoComplete="tel"
                                value={attendee.phone}
                                onChange={updateField}
                                maxLength={20}
                                required
                                className="mt-2 min-h-12 w-full border border-white/20 bg-transparent px-3 text-sm outline-none focus:border-[#d5ff3f]"
                                placeholder="Your phone number"
                            />
                        </label>

                        {error && (
                            <p role="alert" className="text-sm text-[#d5ff3f]">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="min-h-14 w-full bg-[#d5ff3f] px-5 font-mono text-xs font-bold tracking-widest text-black transition-colors hover:bg-white"
                        >
                            PLACE DEMO ORDER ↗
                        </button>

                        <p className="text-[10px] leading-5 text-white/35">
                            No payment gateway is connected. This creates a local demo
                            confirmation only; it does not reserve or issue real tickets.
                        </p>
                    </form>

                    <aside className="h-fit border border-[#d5ff3f]/40 p-5 sm:p-6">
                        <p className="font-mono text-[10px] tracking-[0.2em] text-[#d5ff3f]">
                            ORDER SUMMARY
                        </p>

                        <h2 className="mt-3 text-2xl font-black uppercase">
                            {booking.city}
                        </h2>

                        <div className="my-5 space-y-4 border-y border-white/15 py-5">
                            {booking.tickets.map((ticket) => (
                                <div
                                    key={ticket.id}
                                    className="flex justify-between gap-3 text-xs"
                                >
                  <span className="text-white/55">
                    {ticket.name} × {ticket.quantity}
                  </span>
                                    <span>
                    ₹
                                        {(ticket.price * ticket.quantity).toLocaleString("en-IN")}
                  </span>
                                </div>
                            ))}

                            <div className="flex justify-between text-xs text-white/50">
                                <span>SUBTOTAL</span>
                                <span>₹{subtotal.toLocaleString("en-IN")}</span>
                            </div>

                            <div className="flex justify-between text-xs text-white/50">
                                <span>SERVICE FEE</span>
                                <span>₹{SERVICE_FEE}</span>
                            </div>
                        </div>

                        <div className="flex items-end justify-between gap-3">
                            <span className="font-mono text-[10px] text-white/45">TOTAL</span>
                            <span className="text-2xl font-bold">
                ₹{total.toLocaleString("en-IN")}
              </span>
                        </div>

                        <p className="mt-4 font-mono text-[9px] leading-4 text-white/30">
                            CURRENCY: INR · PAYMENT: NONE · REALITY: OPTIONAL
                        </p>
                    </aside>
                </div>
            </div>
        </main>
    );
}
