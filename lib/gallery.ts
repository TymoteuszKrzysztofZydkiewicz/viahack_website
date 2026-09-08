import manifest from "@/public/assets/gallery-manifest.json"
import { galleryPhotos } from "@/lib/hackathon"
import type { EditionYear, GalleryPhoto } from "@/lib/types"

/** Optional editorial metadata, keyed by each photo's public URL. */
export const galleryMetadata: Readonly<Partial<Record<string, Pick<GalleryPhoto, "alt" | "caption"> & { position?: string }>>> =
  Object.fromEntries(galleryPhotos.map(({ src, alt, caption, position }) => [src, { alt, caption, position }]))

/** Photos from images/2025 and images/2026, prepared before dev and build. */
export function getGalleryPhotos(): GalleryPhoto[] {
  return manifest.map((photo, index) => ({
    ...photo,
    year: photo.year as EditionYear,
    // Camera filenames and UUIDs are asset identifiers, never visible captions.
    alt: `VIAHACK ${photo.year} event photo ${index + 1}`,
    caption: `VIAHACK ${photo.year}`,
    ...galleryMetadata[photo.src],
  }))
}

/** A small selection from both years keeps the home carousel quick to load. */
export function getGalleryPreviewPhotos(): GalleryPhoto[] {
  const photos = getGalleryPhotos()
  const byYear = ["2026", "2025"].map(year => {
    const collection = photos.filter(photo => photo.year === year)
    const landscape = collection.filter(photo => (photo.width ?? 4) >= (photo.height ?? 3))
    const source = landscape.length >= 6 ? landscape : collection
    const count = Math.min(6, source.length)
    return Array.from({ length: count }, (_, index) => source[Math.floor(index * source.length / count)])
  })
  return Array.from({ length: 6 }, (_, index) => byYear.flatMap(collection => collection[index] ? [collection[index]] : [])).flat()
}
