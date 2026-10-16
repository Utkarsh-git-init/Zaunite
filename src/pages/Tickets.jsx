import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";

const ticketTiers = [
    {
        id: "floor",
        name: "Floor Access",
        description: "General admission. Get lost in the sound.",
        price: 2499,
        availability: 120,
    },
    {
        id: "pit",
        name: "Pit Access",
        description: "Closer to the stage. Right in the chaos.",
        price: 4499,
        availability: 60,
    },
    {
        id: "vip",
        name: "Afterimage VIP",
        description: "Premium entry for the full experience.",
        price: 7499,
        availability: 20,
    },
];

const SERVICE_FEE = 99;
const MAX_TICKETS = 6;

export default function Tickets() {
    const [searchParams] = useSearchParams();
    const city = searchParams.get("city") || "Mumbai";

    const [quantities, setQuantities] = useState({
        floor: 0,
        pit: 0,
        vip: 0,
    });

    const ticketCount = Object.values(quantities).reduce(
        (sum, quantity) => sum + quantity,
        0,
    );

    const subtotal = useMemo(
        () =>
            ticketTiers.reduce(
                (sum, tier) => sum + tier.price * quantities[tier.id],
                0,
            ),
        [quantities],
    );

    const total = subtotal + (ticketCount > 0 ? SERVICE_FEE : 0);

    function updateQuantity(tier, change) {
        setQuantities((current) => {
            const nextQuantity = current[tier.id] + change;
            const currentTotal = Object.values(current).reduce(
                (sum, quantity) => sum + quantity,
                0,
            );

            if (nextQuantity < 0 || nextQuantity > tier.availability) {
                return current;
            }

            if (change > 0 && currentTotal >= MAX_TICKETS) {
                return current;
            }

            return {
                ...current,
                [tier.id]: nextQuantity,
            };
        });
    }

    function continueToCheckout() {
        const selectedTickets = ticketTiers
            .filter((tier) => quantities[tier.id] > 0)
            .map((tier) => ({
                id: tier.id,
                name: tier.name,
                price: tier.price,
                quantity: quantities[tier.id],
            }));

        const booking = {
            city,
            tickets: selectedTickets,
            subtotal,
            serviceFee: SERVICE_FEE,
            total,
        };

        sessionStorage.setItem("deadbeatBooking", JSON.stringify(booking));
        window.location.href = "/checkout";
    }

    return (
        <main className="min-h-screen bg-[#090a08] px-5 pb-20 pt-32 text-[#f3f2e9] sm:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <Link
                    to="/tour"
                    className="font-mono text-xs tracking-widest text-white/45 transition-colors hover:text-[#d5ff3f]"
                >
                    ← BACK TO TOUR
                </Link>

                <div className="mt-8">
                    <p className="font-mono text-xs tracking-[0.3em] text-[#d5ff3f]">
                        TICKET SELECTION / {city.toUpperCase()}
                    </p>

                    <h1 className="mt-5 text-6xl font-black uppercase leading-[0.85] tracking-[-0.06em] sm:text-8xl">
                        CHOOSE YOUR
                        <br />
                        <span className="text-[#d5ff3f]">AFTERIMAGE.</span>
                    </h1>

                    <p className="mt-6 max-w-xl text-sm leading-6 text-white/50">
                        Choose your access level. Select up to {MAX_TICKETS} tickets per
                        demo booking.
                    </p>
                </div>

                <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_320px]">
                    <section className="space-y-4" aria-label="Ticket types">
                        {ticketTiers.map((tier, index) => (
                            <article
                                key={tier.id}
                                className="border border-white/15 p-5 transition-colors hover:border-white/35 sm:p-7"
                            >
                                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                                    <div>
                                        <p className="font-mono text-xs tracking-widest text-white/35">
                                            ACCESS LEVEL / 0{index + 1}
                                        </p>

                                        <h2 className="mt-3 text-2xl font-bold uppercase sm:text-3xl">
                                            {tier.name}
                                        </h2>

                                        <p className="mt-2 text-sm text-white/50">
                                            {tier.description}
                                        </p>

                                        <p className="mt-4 font-mono text-xs text-white/35">
                                            DEMO INVENTORY: {tier.availability} TICKETS
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
                                        <p className="text-2xl font-bold">
                                            ₹{tier.price.toLocaleString("en-IN")}
                                        </p>

                                        <div className="flex items-center gap-4">
                                            <button
                                                type="button"
                                                onClick={() => updateQuantity(tier, -1)}
                                                disabled={quantities[tier.id] === 0}
                                                aria-label={`Remove one ${tier.name} ticket`}
                                                className="flex size-10 items-center justify-center border border-white/20 text-xl transition-colors hover:border-[#d5ff3f] disabled:cursor-not-allowed disabled:opacity-25"
                                            >
                                                −
                                            </button>

                                            <span className="w-5 text-center font-mono">
                        {quantities[tier.id]}
                      </span>

                                            <button
                                                type="button"
                                                onClick={() => updateQuantity(tier, 1)}
                                                disabled={
                                                    quantities[tier.id] >= tier.availability ||
                                                    ticketCount >= MAX_TICKETS
                                                }
                                                aria-label={`Add one ${tier.name} ticket`}
                                                className="flex size-10 items-center justify-center border border-white/20 text-xl transition-colors hover:border-[#d5ff3f] disabled:cursor-not-allowed disabled:opacity-25"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>

                    <aside className="h-fit border border-[#d5ff3f]/50 p-6 lg:sticky lg:top-28">
                        <p className="font-mono text-xs tracking-[0.2em] text-[#d5ff3f]">
                            YOUR ORDER
                        </p>

                        <h2 className="mt-4 text-3xl font-bold uppercase">{city}</h2>

                        <p className="mt-2 text-sm text-white/45">
                            {ticketCount} {ticketCount === 1 ? "ticket" : "tickets"} selected
                        </p>

                        <div className="my-6 space-y-4 border-y border-white/15 py-5 font-mono text-xs">
                            {ticketTiers
                                .filter((tier) => quantities[tier.id] > 0)
                                .map((tier) => (
                                    <div
                                        key={tier.id}
                                        className="flex justify-between gap-4"
                                    >
                    <span className="text-white/55">
                      {tier.name} × {quantities[tier.id]}
                    </span>
                                        <span>
                      ₹
                                            {(tier.price * quantities[tier.id]).toLocaleString(
                                                "en-IN",
                                            )}
                    </span>
                                    </div>
                                ))}

                            <div className="flex justify-between text-white/55">
                                <span>SUBTOTAL</span>
                                <span>₹{subtotal.toLocaleString("en-IN")}</span>
                            </div>

                            {ticketCount > 0 && (
                                <div className="flex justify-between text-white/55">
                                    <span>SERVICE FEE</span>
                                    <span>₹{SERVICE_FEE}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-end justify-between">
                            <span className="font-mono text-xs text-white/50">TOTAL</span>
                            <span className="text-3xl font-bold">
                ₹{total.toLocaleString("en-IN")}
              </span>
                        </div>

                        <button
                            type="button"
                            onClick={continueToCheckout}
                            disabled={ticketCount === 0}
                            className="mt-6 flex min-h-14 w-full items-center justify-center gap-3 bg-[#d5ff3f] px-4 font-mono text-xs font-bold tracking-widest text-black transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            CONTINUE ↗
                        </button>

                        <p className="mt-4 text-xs leading-5 text-white/35">
                            Demo checkout only. No payment will be taken and no real ticket
                            will be issued.
                        </p>
                    </aside>
                </div>
            </div>
        </main>
    );
}