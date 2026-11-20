import Link from "next/link"
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Trophy } from "lucide-react"
import edition2025Hero from "@/images/hackathon_2025_img2.jpg"
import edition2026Hero from "@/images/2026/2026-fallback.jpg"
import inseroLogo from "@/images/inseroLogoRect.png"
import type { Edition, WinningProject } from "@/lib/types"
import { getGalleryPhotos, selectGalleryPhotos } from "@/lib/gallery"
import { EditionHeader } from "@/components/edition-header"
import { PhotoCarousel } from "@/components/photo-carousel"
import { PoweredBy } from "@/components/powered-by"
import { Reveal } from "@/components/reveal"
import { SponsorsSection } from "@/components/sponsors-section"

const editionHeroImages = { "2025": edition2025Hero, "2026": edition2026Hero } as const

function WinningProjectHighlight({ project }: { project: WinningProject }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-10 lg:p-12">
      <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 text-xs font-medium text-primary">
            <Trophy size={16} aria-hidden="true" /> 1st place
          </p>
          <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h3>
          <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">{project.description}</p>
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
                <li key={feature.title} className="border-l-2 border-primary/35 pl-5">
                  <h5 className="text-sm font-medium text-foreground">{feature.title}</h5>
                  <p className="mt-1.5 text-sm leading-7 text-muted-foreground">{feature.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {(project.techStack || project.outcome) && (
        <div className="mt-9 grid gap-5 border-t border-white/10 pt-7 text-sm leading-7 text-muted-foreground lg:grid-cols-2 lg:gap-14">
          {project.techStack && <p><strong className="font-medium text-foreground">Tech stack: </strong>{project.techStack}</p>}
          {project.outcome && <p><strong className="font-medium text-foreground">The outcome: </strong>{project.outcome}</p>}
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
      <EditionHeader
        year={edition.year}
        dates={edition.dates}
        poweredBy={edition.year === "2026" && <PoweredBy name="Insero" logo={inseroLogo} />}
        photo={heroPhoto ? { image: heroImage, alt: `VIAHACK ${edition.year} event photo`, position: heroPhoto.position } : undefined}
        stats={edition.stats}
      />

      <section id="winning-project" className="scroll-mt-28 pb-16 pt-6 sm:pb-24 sm:pt-8">
        <div className="page-container">
          <Reveal className="mb-8 sm:mb-10">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Winning Project</h2>
          </Reveal>
          <Reveal><WinningProjectHighlight project={edition.winningProject} /></Reveal>
        </div>
      </section>

      <SponsorsSection sponsors={edition.partners} highlightTier={edition.year === "2026"} />

      <section className="page-container py-16 sm:py-24">
        <Reveal className="mb-8 flex flex-wrap items-center justify-between gap-5">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Gallery {edition.year}</h2>
          <Link href={`/gallery?year=${edition.year}`} className="button button-outline">Explore more <ArrowRight size={16} aria-hidden="true" /></Link>
        </Reveal>
        <PhotoCarousel photos={selectGalleryPhotos(photos, edition.year === "2026" ? 25 : 10)} label={`VIAHACK ${edition.year} gallery`} compact />
        <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-7 text-xs text-muted-foreground">
          <Link href="/" className="inline-flex items-center gap-2 transition-colors hover:text-foreground"><ArrowLeft size={14} aria-hidden="true" />Back to home</Link>
          <Link href={`/${otherYear}`} className="inline-flex items-center gap-2 transition-colors hover:text-secondary">Explore {otherYear}<ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  )
}
