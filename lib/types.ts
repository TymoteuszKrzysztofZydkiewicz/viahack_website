export type EditionYear = "2025" | "2026"

export interface GalleryPhoto {
  src: string
  alt: string
  caption: string
  year: EditionYear
  position?: string
  width?: number
  height?: number
}

export type SponsorTier = "Platinum" | "Gold" | "Silver" | "Partner"

export interface Sponsor {
  name: string
  logo: string
  href: string
  tier: SponsorTier
  /** The card surface: light for dark artwork, dark for light artwork. */
  theme: "light" | "dark"
}

export interface TeamMember {
  name: string
  image: string
  role: string
  href: string
}

export interface WinningProject {
  title: string
  description: string
  githubUrl: string
  photos?: GalleryPhoto[]
  features?: { title: string; description: string }[]
  techStack?: string
  outcome?: string
}

export interface Edition {
  year: EditionYear
  label: string
  title: string
  description: string
  details: string[]
  dates: string
  theme: string
  stats: { label: string; value: string }[]
  partners: Sponsor[]
  winningProject: WinningProject
}
