"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";

type Status =
  | { kind: "idle"; message: "" }
  | { kind: "error" | "notice" | "success"; message: string };

const INITIAL_STATUS: Status = { kind: "idle", message: "" };

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>(INITIAL_STATUS);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const emailInput = event.currentTarget.elements.namedItem("email");

    if (!(emailInput instanceof HTMLInputElement) || !emailInput.validity.valid) {
      setStatus({
        kind: "error",
        message: "Indtast en gyldig e-mailadresse.",
      });
      return;
    }

    /*
     * TODO(newsletter-integration): Forbind formularen til en rigtig, sikker
     * udbyder via en Server Action. Vis først success, når udbyderen har
     * bekræftet tilmeldingen. Der gemmes eller sendes ingen e-mail her.
     */
    setStatus({
      kind: "notice",
      message:
        "Tilmelding er ikke aktiv endnu. Din e-mail er ikke gemt eller sendt.",
    });
  }

  const statusClassName =
    status.kind === "error"
      ? "text-red-800"
      : status.kind === "success"
        ? "text-green-900"
        : "text-gray-800";

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <div className="overflow-hidden rounded-3xl border-2 border-black bg-white p-5 shadow-[5px_5px_0_#111827] sm:p-8 lg:p-10">
        <div className="grid min-w-0 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] lg:gap-10">
          <div className="min-w-0">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-black/65">
              PokéDad-nyt
            </p>
            <h2
              id="newsletter-heading"
              className="mt-2 text-3xl font-black leading-tight text-gray-950 sm:text-4xl"
            >
              Få drops før alle andre
            </h2>
            <p className="mt-3 max-w-xl text-base font-medium text-gray-600 sm:text-lg">
              Nye sæt, restocks &amp; tilbud direkte i indbakken.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="min-w-0">
            <label htmlFor="newsletter-email" className="sr-only">
              Din e-mail
            </label>

            <div className="flex min-w-0 flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (status.kind !== "idle") {
                    setStatus(INITIAL_STATUS);
                  }
                }}
                placeholder="Din e-mail"
                aria-describedby="newsletter-consent newsletter-status"
                className="min-w-0 flex-1 rounded-xl border-2 border-black bg-gray-50 px-4 py-3 text-base outline-none placeholder:text-gray-500 focus-visible:ring-4 focus-visible:ring-gray-300"
              />

              <button
                type="submit"
                className="shrink-0 rounded-xl border-2 border-black bg-black px-6 py-3 font-bold text-white transition hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-300 active:translate-y-px"
              >
                Tilmeld
              </button>
            </div>

            <p
              id="newsletter-consent"
              className="mt-3 text-xs leading-5 text-black/70"
            >
              Ved tilmelding accepterer du nyheder og tilbud fra PokéDad. Du kan
              altid afmelde dig. Læs vores{" "}
              <Link
                href="/privatlivspolitik"
                className="font-semibold underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                privatlivspolitik
              </Link>
              .
            </p>

            <p
              id="newsletter-status"
              role={status.kind === "error" ? "alert" : "status"}
              aria-live="polite"
              className={`mt-3 min-h-5 text-sm font-semibold ${statusClassName}`}
            >
              {status.message}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
