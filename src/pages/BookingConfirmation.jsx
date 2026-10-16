
import { Link } from "react-router";

function DemoQR({ value }) {
    // Decorative QR-like pattern only. It is not a scannable QR code.
    const cells = Array.from({ length: 225 }, (_, i) => {
        const x = i % 15;
        const y = Math.floor(i / 15);

        const inFinder = (ox, oy) =>
            x >= ox &&
            x < ox + 5 &&
            y >= oy &&
            y < oy + 5;

        for (const [ox, oy] of [[0, 0], [10, 0], [0, 10]]) {
            if (inFinder(ox, oy)) {
                const dx = x - ox;
                const dy = y - oy;
                const edge =
                    dx === 0 || dx === 4 || dy === 0 || dy === 4;
                const center = dx >= 2 && dx <= 2 && dy >= 2 && dy <= 2;
                return edge || center;
            }
        }

        const seed = value.charCodeAt((x * 7 + y * 11) % value.length);
        return (seed + x * 13 + y * 17 + x * y) % 3 !== 0;
    });

    return (
        <div
            aria-label="Decorative QR-style pattern; not a valid ticket code"
            className="grid aspect-square w-full grid-cols-15 gap-[2px] bg-[#f3f2e9] p-3"
        >
            {cells.map((dark, index) => (
                <span
                    key={index}
                    className={dark ? "bg-[#090a08]" : "bg-[#f3f2e9]"}
                />
            ))}
        </div>
    );
}

export default function BookingConfirmation() {
    let confirmation = null;

    try {
        confirmation = JSON.parse(
            sessionStorage.getItem("deadbeatConfirmation"),
        );
    } catch {
        confirmation = null;
    }

    if (!confirmation) {
        return (
            <main className="confirmation-page min-h-screen bg-[#090a08] px-5 pt-32 pb-36 text-[#f3f2e9]">
                <div className="mx-auto max-w-xl">
                    <p className="font-mono text-xs tracking-widest text-[#d5ff3f]">
                        NO BOOKING FOUND
                    </p>
                    <h1 className="mt-4 text-4xl font-black uppercase">
                        Nothing to celebrate. Yet.
                    </h1>
                    <p className="mt-3 text-sm text-white/50">
                        Choose a city and create a demo booking first.
                    </p>
                    <Link
                        to="/tour"
                        className="mt-7 inline-flex border border-[#d5ff3f] px-5 py-3 font-mono text-xs text-[#d5ff3f] hover:bg-[#d5ff3f] hover:text-black"
                    >
                        BACK TO TOUR ↗
                    </Link>
                </div>
            </main>
        );
    }

    const formattedDate = new Date(confirmation.createdAt).toLocaleString(
        "en-IN",
        {
            dateStyle: "medium",
            timeStyle: "short",
        },
    );

    return (
        <main className="min-h-screen bg-[#090a08] px-5 pb-36 pt-28 text-[#f3f2e9] sm:px-8">
            <div className="mx-auto max-w-5xl">
                <header className="border-b border-white/15 pb-7">
                    <p className="font-mono text-xs tracking-[0.25em] text-[#d5ff3f]">
                        DEADBEAT / BOOKING DESK
                    </p>

                    <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            <p className="font-mono text-xs text-[#d5ff3f]">
                                DEMO ORDER CREATED ✓
                            </p>
                            <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl">
                                YOU'RE <span className="text-[#d5ff3f]">IN*</span>
                            </h1>
                            <p className="mt-3 text-sm text-white/50">
                                Your imaginary concert era starts now.
                            </p>
                        </div>

                        <span className="w-fit border border-[#d5ff3f]/50 px-3 py-2 font-mono text-[10px] tracking-widest text-[#d5ff3f]">
              DEMO ONLY · NOT A REAL TICKET
            </span>
                    </div>
                </header>

                <section className="mt-8 grid gap-6 md:grid-cols-[1fr_260px]">
                    <div className="border border-white/15 p-5 sm:p-7">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="font-mono text-[10px] tracking-widest text-white/40">
                                    YOUR DESTINATION
                                </p>
                                <h2 className="mt-2 text-3xl font-black uppercase text-[#d5ff3f] sm:text-4xl">
                                    {confirmation.city}
                                </h2>
                            </div>
                            <span className="font-mono text-xs text-white/30">
                DB / 2026
              </span>
                        </div>

                        <div className="mt-6 border-y border-white/15 py-5">
                            <p className="font-mono text-[10px] tracking-widest text-white/40">
                                BOOKING REFERENCE
                            </p>
                            <p className="mt-2 break-all text-xl font-bold tracking-wider sm:text-2xl">
                                {confirmation.reference}
                            </p>
                            <p className="mt-2 text-xs text-white/40">
                                Created {formattedDate}
                            </p>
                        </div>

                        <div className="mt-6">
                            <p className="font-mono text-[10px] tracking-widest text-white/40">
                                ATTENDEE
                            </p>
                            <p className="mt-2 text-lg font-semibold">
                                {confirmation.attendee.name}
                            </p>
                            <p className="mt-1 break-all text-sm text-white/50">
                                {confirmation.attendee.email}
                            </p>
                            <p className="mt-1 text-sm text-white/50">
                                {confirmation.attendee.phone}
                            </p>
                        </div>

                        <div className="mt-7">
                            <p className="font-mono text-[10px] tracking-widest text-white/40">
                                SELECTED ACCESS
                            </p>

                            <div className="mt-3 divide-y divide-white/10">
                                {confirmation.tickets.map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        className="flex justify-between gap-4 py-3 text-sm"
                                    >
                                        <div>
                                            <p className="font-semibold">{ticket.name}</p>
                                            <p className="mt-1 text-xs text-white/40">
                                                Quantity: {ticket.quantity}
                                            </p>
                                        </div>
                                        <p className="shrink-0">
                                            ₹
                                            {(ticket.price * ticket.quantity).toLocaleString(
                                                "en-IN",
                                            )}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5 space-y-2 border-t border-white/15 pt-4 text-sm">
                            <div className="flex justify-between text-white/50">
                                <span>Subtotal</span>
                                <span>
                  ₹{confirmation.subtotal.toLocaleString("en-IN")}
                </span>
                            </div>
                            <div className="flex justify-between text-white/50">
                                <span>Service fee</span>
                                <span>₹{confirmation.serviceFee}</span>
                            </div>
                            <div className="flex justify-between pt-2 text-lg font-bold">
                                <span>Total</span>
                                <span className="text-[#d5ff3f]">
                  ₹{confirmation.total.toLocaleString("en-IN")}
                </span>
                            </div>
                        </div>
                    </div>

                    <aside className="h-fit border border-white/15 p-5">
                        <div className="mx-auto max-w-52">
                            <DemoQR value={confirmation.reference} />
                        </div>

                        <p className="mt-4 text-center font-mono text-[10px] tracking-widest text-[#d5ff3f]">
                            ART, NOT ACCESS
                        </p>
                        <p className="mt-2 text-center text-xs leading-5 text-white/40">
                            This decorative pattern cannot be scanned or used for entry.
                            No real ticket has been issued.
                        </p>
                    </aside>
                </section>

                <footer className="mt-8 flex flex-wrap items-center justify-between gap-4">
                    <p className="max-w-lg text-xs leading-5 text-white/35">
                        This is a frontend-only demonstration. The order exists in this
                        browser session only; no payment, ticket reservation, or email
                        confirmation occurred.
                    </p>

                    <Link
                        to="/"
                        className="inline-flex min-h-11 items-center border border-[#d5ff3f] px-5 font-mono text-xs tracking-widest text-[#d5ff3f] transition-colors hover:bg-[#d5ff3f] hover:text-black"
                    >
                        BACK TO DEADBEAT ↗
                    </Link>
                </footer>
            </div>
        </main>
    );
}
