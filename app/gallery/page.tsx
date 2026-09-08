import { Suspense } from "react"
import type { Metadata } from "next"
import { GalleryBrowser } from "@/components/gallery-browser"
import { Reveal } from "@/components/reveal"
import { getGalleryPhotos } from "@/lib/gallery"

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from VIAHACK 2025 and 2026 at VIA University College in Horsens, Denmark.",
}

export default function GalleryPage() {
  const photos = getGalleryPhotos()

  return (
    <>
      <section className="page-container pb-8 pt-16 sm:pb-10 sm:pt-24" aria-labelledby="gallery-heading">
        <Reveal>
          <h1 id="gallery-heading" className="text-5xl font-semibold leading-tight tracking-[-0.045em] sm:text-7xl">Gallery</h1>
          <p className="mt-5 text-sm text-muted-foreground sm:text-base">VIAHACK 2025 & 2026</p>
        </Reveal>
      </section>
      <section className="page-container pb-20 sm:pb-28" aria-label="Browse event photos">
        <Suspense fallback={<div className="flex min-h-[360px] items-center justify-center text-sm text-muted-foreground" role="status">Loading photos...</div>}>
          <GalleryBrowser photos={photos} />
        </Suspense>
      </section>
    </>
  )
}
