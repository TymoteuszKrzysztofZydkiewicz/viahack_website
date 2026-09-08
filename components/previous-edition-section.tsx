import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { editions } from "@/lib/hackathon"
import { getGalleryPhotos } from "@/lib/gallery"
import { PixelStar } from "./pixel-decorations"
import { Reveal } from "./reveal"

const teaserSources = {
  "2026": "/images/2026/75D9CE8E-E16F-4DF0-B9E6-248CC1BDD8C0.JPG.jpg",
  "2025": "/images/hackathon_2025_img2.jpg",
} as const

export function PreviousEditionSection() {
  const photos = getGalleryPhotos()
  return (
    <section id="previous" className="page-container relative pb-20 sm:pb-28" aria-labelledby="editions-title">
      <div className="pointer-events-none absolute right-12 top-0 opacity-40" aria-hidden="true"><PixelStar className="pixel-float h-5 w-5" /></div>
      <Reveal className="section-heading"><h2 id="editions-title">Past editions</h2></Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        {editions.map((edition, index) => {
          const preview = photos.find(photo => photo.year === edition.year)
          return (
            <Reveal key={edition.year} delay={index * 0.1}>
              <Link href={`/${edition.year}`} className="edition-card group block overflow-hidden transition-colors hover:border-white/25" aria-label={`Explore VIA Hackathon ${edition.year}`}>
                <div className="relative aspect-[2/1] overflow-hidden bg-white/5">
                  <Image src={teaserSources[edition.year]} alt={preview?.alt ?? `VIAHACK ${edition.year} event photo`} fill sizes="(max-width: 767px) 90vw, 560px" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" style={{ objectPosition: preview?.position }} />
                </div>
                <div className="flex items-center justify-between gap-4 px-5 py-6 sm:px-7 sm:py-7">
                  <div>
                    <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">{edition.year}</h3>
                    <ul className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground sm:text-sm">
                      {edition.details.map((detail, detailIndex) => <li key={detail} className="flex items-center gap-3">{detailIndex > 0 && <span className="text-white/25" aria-hidden="true">|</span>}{detail}</li>)}
                    </ul>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-secondary transition-colors group-hover:border-secondary group-hover:bg-secondary/5"><ArrowUpRight size={20} aria-hidden="true" /></span>
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
