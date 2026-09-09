import type { Sponsor, SponsorTier } from "@/lib/types"

export interface SponsorCardProps extends Omit<Sponsor, "href"> {
  href?: string
  highlightTier?: boolean
}

const tierHighlights: Record<SponsorTier, string> = {
  Platinum: "hover:border-[#a6d8ff] hover:shadow-[0_0_26px_2px_#a6d8ff66] focus-visible:ring-[#a6d8ff]",
  Gold: "hover:border-[#f5cc65] hover:shadow-[0_0_24px_2px_#f5cc6555] focus-visible:ring-[#f5cc65]",
  Silver: "hover:border-[#bfc5d0] hover:shadow-[0_0_24px_2px_#bfc5d055] focus-visible:ring-[#bfc5d0]",
  Partner: "hover:shadow-lg hover:shadow-black/10 focus-visible:ring-secondary",
}

const tierStyles: Record<SponsorTier, { padding: string; logo: string }> = {
  Platinum: { padding: "p-8", logo: "h-24 max-w-[405px]" },
  Gold: { padding: "p-7", logo: "h-16 max-w-64" },
  Silver: { padding: "p-6", logo: "h-10 max-w-[315px]" },
  Partner: { padding: "p-6", logo: "h-16 max-w-44" },
}

/** Tier controls artwork size; theme keeps the original logo colors legible. */
export function SponsorCard({ logo, name, tier, theme, href, highlightTier = false }: SponsorCardProps) {
  const styles = tierStyles[tier]
  const className = [
    "flex h-full items-center justify-center rounded-xl border transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out",
    "motion-safe:hover:scale-[1.025] motion-safe:focus-visible:scale-[1.025]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-background",
    highlightTier ? tierHighlights[tier] : "hover:shadow-lg hover:shadow-black/10 focus-visible:ring-secondary",
    styles.padding,
    theme === "light"
      ? "border-white/80 bg-white/95 hover:bg-gray-200 focus-visible:bg-gray-200"
      : `border-white/10 bg-surface hover:bg-white/5 focus-visible:border-white/25 focus-visible:bg-white/5 ${highlightTier ? "" : "hover:border-white/25"}`,
  ].join(" ")

  const content = <img src={logo} alt={`${name} logo`} loading="lazy" decoding="async" className={`w-full object-contain ${styles.logo}`} />

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${name}, ${tier === "Partner" ? "community partner" : `${tier.toLowerCase()} sponsor`} (opens in a new tab)`}
      className={className}
    >
      {content}
    </a>
  ) : <div className={className}>{content}</div>
}
