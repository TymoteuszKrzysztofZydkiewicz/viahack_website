import { Reveal } from "@/components/reveal"
import { SponsorCard, SponsorPlaceholder } from "@/components/sponsor-card"
import type { Sponsor, SponsorTier } from "@/lib/types"

const sponsorTiers: SponsorTier[] = ["Platinum", "Gold", "Silver", "Partner"]
const sponsorHeadingColors: Record<SponsorTier, string> = {
  Platinum: "text-[#a6d8ff]",
  Gold: "text-[#f5cc65]",
  Silver: "text-[#bfc5d0]",
  Partner: "text-muted-foreground",
}
const sponsorWidths: Record<SponsorTier, string> = {
  Platinum: "w-full max-w-xl",
  Gold: "w-full max-w-sm",
  Silver: "w-full max-w-sm",
  Partner: "w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]",
}
const compactSponsorWidths = {
  ...sponsorWidths,
  Gold: "w-[calc(50%-0.5rem)] max-w-sm",
  Silver: "w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)]",
}

export function SponsorsSection({ sponsors, highlightTier = false, id, description, compact = false, placeholderCounts }: {
  sponsors: Sponsor[]
  highlightTier?: boolean
  id?: string
  description?: string
  compact?: boolean
  placeholderCounts?: Partial<Record<SponsorTier, number>>
}) {
  const widths = compact ? compactSponsorWidths : sponsorWidths

  return (
    <section id={id} className={`${compact ? "py-12 sm:py-16" : "section-space"} border-y border-white/10`}>
      <div className="page-container">
        <Reveal className={compact ? "mb-8 text-center" : "mb-12 text-center"}>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Sponsors &amp; partners</h2>
          {description && <p className="mt-5 text-sm text-muted-foreground sm:text-base">{description}</p>}
        </Reveal>
        <div className={`mx-auto max-w-4xl ${compact ? "space-y-6" : "space-y-9"}`}>
          {sponsorTiers.map((tier) => {
            const tierSponsors = sponsors.filter((sponsor) => sponsor.tier === tier)
            const placeholderCount = placeholderCounts?.[tier] ?? 0
            if (!tierSponsors.length && !placeholderCount) return null
            return (
              <Reveal key={tier}>
                <h3 className={`mb-4 text-center tracking-wide ${highlightTier && tier !== "Partner" ? `text-xl font-semibold sm:text-2xl ${sponsorHeadingColors[tier]}` : "text-xs font-medium text-muted-foreground"}`}>{tier === "Partner" ? "Community partners" : `${tier} sponsors`}</h3>
                <ul className="flex flex-wrap justify-center gap-4">
                  {tierSponsors.map((sponsor) => (
                    <li key={sponsor.name} className={widths[tier]}><SponsorCard {...sponsor} highlightTier={highlightTier} /></li>
                  ))}
                  {Array.from({ length: placeholderCount }, (_, index) => (
                    <li key={index} className={widths[tier]}><SponsorPlaceholder tier={tier} /></li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
