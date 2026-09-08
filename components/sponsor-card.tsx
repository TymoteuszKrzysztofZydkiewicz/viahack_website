import type { Sponsor, SponsorTier } from "@/lib/types"

export interface SponsorCardProps extends Omit<Sponsor, "href"> {
  href?: string
}

const tierStyles: Record<SponsorTier, { padding: string; logo: string }> = {
  Platinum: { padding: "p-8", logo: "h-24 max-w-[405px]" },
  Gold: { padding: "p-7", logo: "h-16 max-w-64" },
  Silver: { padding: "p-6", logo: "h-10 max-w-[315px]" },
  Partner: { padding: "p-6", logo: "h-16 max-w-44" },
}

/** Tier controls artwork size; theme keeps the original logo colors legible. */
export function SponsorCard({ logo, name, tier, theme, href }: SponsorCardProps) {
  const styles = tierStyles[tier]
  const className = [
    "flex h-full items-center justify-center rounded-xl border transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#130826]",
    styles.padding,
    theme === "light"
      ? "border-white/80 bg-white/95 hover:bg-white"
      : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/[0.08]",
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
