import { getGalleryPreviewPhotos } from "@/lib/gallery"
import type { GalleryPhoto } from "@/lib/types"
import { PhotoCarousel } from "./photo-carousel"
import { Reveal } from "./reveal"

export function GallerySection({ photos = getGalleryPreviewPhotos() }: { photos?: GalleryPhoto[] }) {
  return (
    <section id="gallery" className="page-container" aria-labelledby="gallery-title">
      <Reveal className="mb-8 sm:mb-10"><h2 id="gallery-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">Gallery</h2></Reveal>
      <PhotoCarousel photos={photos} label="VIAHACK gallery" />
    </section>
  )
}
