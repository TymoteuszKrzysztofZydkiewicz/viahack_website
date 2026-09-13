import kamstrupLogo from "@/images/Kamstrup_Logo@3x-1030x233.png"
import { Reveal } from "./reveal"
import { SponsorCard } from "./sponsor-card"

const placeholderTiers = [
  { tier: "Gold", slots: 2, color: "text-[#f5cc65]" },
  { tier: "Silver", slots: 4, color: "text-[#bfc5d0]" },
] as const

export function HomeSponsorsSection() {
  return (
    <section id="sponsors" className="section-space border-y border-white/10" aria-labelledby="sponsors-title">
      <div className="page-container">
        <Reveal className="mb-12 text-center">
          <h2 id="sponsors-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">Sponsors &amp; partners</h2>
        </Reveal>
        <div className="mx-auto max-w-4xl space-y-9">
          <Reveal>
            <h3 className="mb-4 text-center text-xl font-semibold tracking-wide text-[#a6d8ff] sm:text-2xl">Platinum sponsors</h3>
            <ul className="flex flex-wrap justify-center gap-4">
              <li className="w-full max-w-xl">
                <SponsorCard name="Kamstrup" logo={kamstrupLogo.src} tier="Platinum" theme="light" href="https://www.kamstrup.com/en-en" highlightTier />
              </li>
            </ul>
          </Reveal>
          {placeholderTiers.map(({ tier, slots, color }) => (
            <Reveal key={tier}>
              <h3 className={`mb-4 text-center text-xl font-semibold tracking-wide sm:text-2xl ${color}`}>{tier} sponsors</h3>
              <ul className="flex flex-wrap justify-center gap-4">
                {Array.from({ length: slots }, (_, slot) => (
                  <li key={slot} className="w-full max-w-sm">
                    <SponsorCard name={`${tier} sponsor ${slot + 1}`} tier={tier} theme="light" highlightTier />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
