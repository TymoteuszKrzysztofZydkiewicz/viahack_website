"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown, Camera, Expand, ImageOff } from "lucide-react"
import { Lightbox } from "@/components/lightbox"
import type { EditionYear, GalleryPhoto } from "@/lib/types"

type GalleryFilter = "all" | EditionYear

const filters: { value: GalleryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "2026", label: "2026" },
  { value: "2025", label: "2025" },
]
const PAGE_SIZE = 24

function PhotoTile({ photo, index, onOpen, buttonRef }: {
  photo: GalleryPhoto
  index: number
  onOpen: () => void
  buttonRef: (element: HTMLButtonElement | null) => void
}) {
  const [failed, setFailed] = useState(false)
  const reducedMotion = useReducedMotion()
  const width = photo.width ?? 1200
  const height = photo.height ?? 900

  return (
    <motion.figure
      className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl bg-white/[0.025]"
      initial={false}
      whileInView={reducedMotion ? undefined : { opacity: [0.55, 1], y: [12, 0] }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4 }}
    >
      <button
        type="button"
        ref={buttonRef}
        className="group relative block w-full overflow-hidden bg-[#1a0b2e] text-left focus-visible:outline-offset-[-4px]"
        style={{ aspectRatio: `${width} / ${height}` }}
        onClick={onOpen}
        aria-label={`Open photo ${index + 1}: ${photo.alt}`}
        aria-haspopup="dialog"
      >
        {failed ? (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center text-xs text-white/60">
            <ImageOff size={28} aria-hidden="true" />Photo unavailable
          </span>
        ) : (
          <Image
            src={photo.src}
            alt={photo.alt}
            width={width}
            height={height}
            sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 280px"
            loading="lazy"
            className="h-auto w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.04]"
            style={{ objectPosition: photo.position ?? "center" }}
            onError={() => setFailed(true)}
          />
        )}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#130826]/40 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-[#130826]/75 px-2.5 py-1 font-mono text-[9px] tracking-wider text-white backdrop-blur-md">{photo.year}</span>
        <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#130826]/70 text-white transition-colors group-hover:border-secondary group-hover:text-secondary" aria-hidden="true"><Expand size={14} /></span>
      </button>
      <figcaption className="sr-only">{photo.caption}</figcaption>
    </motion.figure>
  )
}

export function GalleryBrowser({ photos }: { photos: GalleryPhoto[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const queryYear = searchParams.get("year")
  const activeFilter: GalleryFilter = queryYear === "2025" || queryYear === "2026" ? queryYear : "all"
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const photoButtonRefs = useRef(new Map<string, HTMLButtonElement>())
  const pendingFocus = useRef<string | null>(null)
  const filteredPhotos = activeFilter === "all" ? photos : photos.filter(photo => photo.year === activeFilter)
  const visiblePhotos = filteredPhotos.slice(0, visibleCount)

  // URL changes can also arrive through browser navigation or an external link.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
    setSelectedIndex(null)
  }, [activeFilter])

  useEffect(() => {
    if (pendingFocus.current) {
      photoButtonRefs.current.get(pendingFocus.current)?.focus()
      pendingFocus.current = null
    }
  }, [visibleCount])

  function selectFilter(value: GalleryFilter) {
    setVisibleCount(PAGE_SIZE)
    setSelectedIndex(null)
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all") params.delete("year")
    else params.set("year", value)
    router.replace(`${pathname}${params.size ? `?${params.toString()}` : ""}`, { scroll: false })
  }

  return (
    <div>
      <div className="mb-8 flex flex-col items-start justify-between gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-center">
        <div role="tablist" aria-label="Filter photos by edition" className="flex flex-wrap gap-1.5 rounded-full border border-white/10 bg-white/[0.025] p-1.5">
          {filters.map((filter, index) => {
            const count = filter.value === "all" ? photos.length : photos.filter(photo => photo.year === filter.value).length
            const active = activeFilter === filter.value
            return (
              <button
                type="button"
                role="tab"
                key={filter.value}
                id={`gallery-tab-${filter.value}`}
                ref={element => { tabRefs.current[index] = element }}
                aria-selected={active}
                aria-controls="gallery-panel"
                tabIndex={active ? 0 : -1}
                className={`flex min-h-10 items-center gap-2 rounded-full px-3 text-xs font-medium transition-colors sm:px-4 ${active ? "bg-white text-[#130826]" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
                onClick={() => selectFilter(filter.value)}
                onKeyDown={event => {
                  let nextIndex: number | undefined
                  if (event.key === "ArrowRight") nextIndex = (index + 1) % filters.length
                  if (event.key === "ArrowLeft") nextIndex = (index + filters.length - 1) % filters.length
                  if (event.key === "Home") nextIndex = 0
                  if (event.key === "End") nextIndex = filters.length - 1
                  if (nextIndex !== undefined) {
                    event.preventDefault()
                    tabRefs.current[nextIndex]?.focus()
                    selectFilter(filters[nextIndex].value)
                  }
                }}
              >
                {filter.label}<span className={`font-mono text-[10px] ${active ? "text-[#130826]/50" : "text-white/35"}`}>{count}</span>
              </button>
            )
          })}
        </div>
        <p className="font-mono text-xs text-muted-foreground" aria-live="polite">{filteredPhotos.length} {filteredPhotos.length === 1 ? "photo" : "photos"}</p>
      </div>

      <div id="gallery-panel" role="tabpanel" aria-labelledby={`gallery-tab-${activeFilter}`} tabIndex={0} className="rounded-xl">
        {filteredPhotos.length ? (
          <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4">
            {visiblePhotos.map((photo, index) => (
              <PhotoTile
                key={photo.src}
                photo={photo}
                index={index}
                onOpen={() => setSelectedIndex(index)}
                buttonRef={element => {
                  if (element) photoButtonRefs.current.set(photo.src, element)
                  else photoButtonRefs.current.delete(photo.src)
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[330px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center">
            <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-secondary/20 bg-secondary/5 text-secondary"><Camera size={25} aria-hidden="true" /></span>
            <h2 className="text-2xl font-semibold tracking-tight">No photos yet</h2>
            <p className="mt-3 max-w-sm text-sm leading-7 text-white/55">{activeFilter === "all" ? "Event photos will appear here soon." : `Photos from VIAHACK ${activeFilter} will appear here soon.`}</p>
            {activeFilter !== "all" && <button type="button" className="button button-outline mt-7" onClick={() => selectFilter("all")}>Explore all photos</button>}
          </div>
        )}
      </div>

      {visibleCount < filteredPhotos.length && (
        <div className="mt-10 flex flex-col items-center gap-3">
          <button type="button" className="button button-outline" onClick={() => {
            pendingFocus.current = filteredPhotos[visibleCount]?.src ?? null
            setVisibleCount(count => count + PAGE_SIZE)
          }}>Load more photos<ArrowDown size={16} aria-hidden="true" /></button>
          <p className="text-xs text-white/45">Showing {visiblePhotos.length} of {filteredPhotos.length} photos</p>
        </div>
      )}

      <p className="sr-only" aria-live="polite" aria-atomic="true">Showing {visiblePhotos.length} of {filteredPhotos.length} photos.</p>

      <Lightbox photos={filteredPhotos} index={selectedIndex} onIndexChange={setSelectedIndex} onClose={() => setSelectedIndex(null)} />
    </div>
  )
}
