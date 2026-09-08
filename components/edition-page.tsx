import Link from "next/link"
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Github, MapPin, Trophy } from "lucide-react"
import edition2025Hero from "@/images/hackathon_2025_img2.jpg"
import edition2026Hero from "@/images/2026/2026-fallback.jpg"
import type { Edition, SponsorTier, WinningProject } from "@/lib/types"
import { getGalleryPhotos, selectGalleryPhotos } from "@/lib/gallery"
import { PhotoCarousel } from "@/components/photo-carousel"
import { Reveal } from "@/components/reveal"
import { SponsorCard } from "@/components/sponsor-card"

const sponsorTiers: SponsorTier[] = ["Platinum", "Gold", "Silver", "Partner"]
const sponsorHeadingColors: Record<SponsorTier, string> = {
  Platinum: "text-[#a6d8ff]",
  Gold: "text-[#f5cc65]",
  Silver: "text-[#bfc5d0]",
  Partner: "text-white/65",
}
const editionHeroImages = { "2025": edition2025Hero, "2026": edition2026Hero } as const
const sponsorWidths: Record<SponsorTier, string> = {
  Platinum: "w-full max-w-xl",
  Gold: "w-full max-w-sm",
  Silver: "w-full max-w-sm",
  Partner: "w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]",
}

function WinningProjectHighlight({ project }: { project: WinningProject }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-10 lg:p-12">
      <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 text-xs font-medium text-pink-300">
            <Trophy size={16} aria-hidden="true" /> 1st place
          </p>
          <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h3>
          <p className="mt-5 text-sm leading-7 text-white/65 sm:text-base sm:leading-8">{project.description}</p>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="button button-outline mt-7"
            aria-label={`${project.title} on GitHub (opens in a new tab)`}
          >
            <Github size={16} aria-hidden="true" /> View on GitHub <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
        {project.photos && (
          <div className="min-w-0">
            <PhotoCarousel photos={project.photos} label={`${project.title} project photos`} project />
          </div>
        )}
        {project.features && (
          <div>
            <h4 className="mb-5 text-lg font-medium tracking-tight">What we built</h4>
            <ul className="space-y-5">
              {project.features.map((feature) => (
                <li key={feature.title} className="border-l-2 border-pink-300/35 pl-5">
                  <h5 className="text-sm font-medium text-white/90">{feature.title}</h5>
                  <p className="mt-1.5 text-sm leading-7 text-white/60">{feature.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {(project.techStack || project.outcome) && (
        <div className="mt-9 grid gap-5 border-t border-white/10 pt-7 text-sm leading-7 text-white/60 lg:grid-cols-2 lg:gap-14">
          {project.techStack && <p><strong className="font-medium text-white/85">Tech stack: </strong>{project.techStack}</p>}
          {project.outcome && <p><strong className="font-medium text-white/85">The outcome: </strong>{project.outcome}</p>}
        </div>
      )}
    </article>
  )
}

export function EditionPage({ edition }: { edition: Edition }) {
  const photos = getGalleryPhotos().filter((photo) => photo.year === edition.year)
  const heroPhoto = photos[0]
  const heroImage = editionHeroImages[edition.year]
  const otherYear = edition.year === "2026" ? "2025" : "2026"

  return (
    <>
      <section className="pb-14 pt-8 sm:pb-16 sm:pt-10">
        <div className="page-container">
          <nav aria-label="Breadcrumb" className="mb-12 flex items-center gap-3 text-xs text-white/55 sm:mb-16">
            <Link href="/" className="inline-flex items-center gap-2 transition-colors hover:text-white"><ArrowLeft size={14} aria-hidden="true" /> Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/80">{edition.year}</span>
          </nav>
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <Reveal>
              <h1 className="edition-title pixel-brand">
                VIAHACK
                <span className="mt-2 block text-pink-300">{edition.year}</span>
              </h1>
              <div className="mt-7 flex flex-col gap-3 text-sm text-white/65 sm:flex-row sm:flex-wrap sm:gap-x-6">
                <span className="inline-flex items-center gap-2"><CalendarDays size={15} className="text-pink-300" aria-hidden="true" />{edition.dates}</span>
                <span className="inline-flex items-center gap-2"><MapPin size={15} className="text-cyan-200" aria-hidden="true" />Horsens, Denmark</span>
              </div>
            </Reveal>
            {heroPhoto && (
              <Reveal delay={0.1}>
                <img
                  src={heroImage.src}
                  alt={`VIAHACK ${edition.year} event photo`}
                  width={heroImage.width}
                  height={heroImage.height}
                  className="aspect-[4/3] w-full rounded-2xl object-cover"
                  style={{ objectPosition: heroPhoto?.position }}
                  fetchPriority="high"
                />
              </Reveal>
            )}
          </div>
          <Reveal className="mt-12 sm:mt-16">
            <dl className="grid divide-y divide-white/10 border-y border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {edition.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse items-center gap-2 px-5 py-7 text-center sm:py-9">
                  <dt className="text-xs text-white/60 sm:text-sm">{stat.label}</dt>
                  <dd className="text-3xl font-medium tracking-tight text-white sm:text-[2rem] lg:text-4xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section id="winning-project" className="scroll-mt-28 pb-16 pt-6 sm:pb-24 sm:pt-8">
        <div className="page-container">
          <Reveal className="mb-8 sm:mb-10">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Winning Project</h2>
          </Reveal>
          <Reveal><WinningProjectHighlight project={edition.winningProject} /></Reveal>
        </div>
      </section>

      <section className="section-space border-y border-white/10">
        <div className="page-container">
          <Reveal className="mb-12 text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Sponsors &amp; partners</h2>
          </Reveal>
          <div className="mx-auto max-w-4xl space-y-9">
            {sponsorTiers.map((tier) => {
              const sponsors = edition.partners.filter((partner) => partner.tier === tier)
              if (!sponsors.length) return null
              return (
                <Reveal key={tier}>
                    <h3 className={`mb-4 text-center tracking-wide ${edition.year === "2026" && tier !== "Partner" ? `text-xl font-semibold sm:text-2xl ${sponsorHeadingColors[tier]}` : "text-xs font-medium text-white/65"}`}>{tier === "Partner" ? "Community partners" : `${tier} sponsors`}</h3>
                  <ul className="flex flex-wrap justify-center gap-4">
                    {sponsors.map((sponsor) => (
                      <li key={sponsor.name} className={sponsorWidths[tier]}><SponsorCard {...sponsor} highlightTier={edition.year === "2026"} /></li>
                    ))}
                  </ul>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="page-container py-16 sm:py-24">
        <Reveal className="mb-8 flex flex-wrap items-center justify-between gap-5">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Gallery {edition.year}</h2>
          <Link href={`/gallery?year=${edition.year}`} className="button button-outline">Explore more <ArrowRight size={16} aria-hidden="true" /></Link>
        </Reveal>
        <PhotoCarousel photos={selectGalleryPhotos(photos, edition.year === "2026" ? 25 : 10)} label={`VIAHACK ${edition.year} gallery`} compact />
        <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-7 text-xs text-white/60">
          <Link href="/" className="inline-flex items-center gap-2 transition-colors hover:text-white"><ArrowLeft size={14} aria-hidden="true" />Back to home</Link>
          <Link href={`/${otherYear}`} className="inline-flex items-center gap-2 transition-colors hover:text-cyan-200">Explore {otherYear}<ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  )
}
