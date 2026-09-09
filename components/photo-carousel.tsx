"use client"

import { useEffect, useId, useMemo, useRef, useState } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import AutoScroll from "embla-carousel-auto-scroll"
import { ArrowLeft, ArrowRight, Expand, Pause, Play } from "lucide-react"
import type { GalleryPhoto } from "@/lib/types"
import { Lightbox } from "./lightbox"

export interface PhotoCarouselProps {
  photos: GalleryPhoto[]
  label?: string
  compact?: boolean
  project?: boolean
}

/** One looping carousel for home and edition previews; photos always open in place. */
export function PhotoCarousel({ photos, label = "Event photos", compact = false, project = false }: PhotoCarouselProps) {
  const trackId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [visible, setVisible] = useState(false)
  const [documentHidden, setDocumentHidden] = useState(false)
  const [selected, setSelected] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const motionReduced = !mounted || prefersReducedMotion
  const autoScroll = useMemo(() => AutoScroll({
    speed: compact ? 0.55 : 0.7,
    startDelay: 500,
    playOnInit: false,
    stopOnInteraction: true,
    stopOnFocusIn: false,
    stopOnMouseEnter: false,
  }), [compact])
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    duration: 25,
  }, [autoScroll])
  const shouldPlay = !project && !motionReduced && !paused && !hovered && !focused && !dragging && visible && !documentHidden && lightboxIndex === null && photos.length > 1

  useEffect(() => {
    setMounted(true)
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches)
    updateMotionPreference()
    mediaQuery.addEventListener("change", updateMotionPreference)
    return () => mediaQuery.removeEventListener("change", updateMotionPreference)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 })
    observer.observe(root)
    const updateVisibility = () => setDocumentHidden(document.hidden)
    updateVisibility()
    document.addEventListener("visibilitychange", updateVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", updateVisibility)
    }
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    const updateSelection = () => setSelected(emblaApi.selectedScrollSnap())
    const startDrag = () => setDragging(true)
    const finishDrag = () => setDragging(false)
    updateSelection()
    emblaApi.on("select", updateSelection).on("reInit", updateSelection).on("pointerDown", startDrag).on("pointerUp", finishDrag)
    return () => {
      emblaApi.off("select", updateSelection).off("reInit", updateSelection).off("pointerDown", startDrag).off("pointerUp", finishDrag)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const updatePlayback = () => {
      const playback = emblaApi.plugins().autoScroll
      if (shouldPlay) playback?.play()
      else playback?.stop()
    }
    updatePlayback()
    emblaApi.on("reInit", updatePlayback)
    return () => {
      emblaApi.off("reInit", updatePlayback)
      emblaApi.plugins().autoScroll?.stop()
    }
  }, [emblaApi, shouldPlay])

  function navigate(direction: "previous" | "next") {
    setPaused(true)
    emblaApi?.plugins().autoScroll?.stop()
    if (direction === "previous") emblaApi?.scrollPrev()
    else emblaApi?.scrollNext()
  }

  function togglePlayback() {
    if (paused) {
      setFocused(false)
      setHovered(false)
      emblaApi?.plugins().autoScroll?.play()
    }
    setPaused(value => !value)
  }

  if (!photos.length) return null

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      data-autoplay={shouldPlay ? "playing" : "paused"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="gallery-viewport overflow-hidden rounded-xl"
        ref={viewportRef}
        aria-label="Photo slides"
        tabIndex={0}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}
        onKeyDown={event => {
          if (event.key === "ArrowLeft") { event.preventDefault(); navigate("previous") }
          if (event.key === "ArrowRight") { event.preventDefault(); navigate("next") }
        }}
      >
        <div id={trackId} className="-ml-4 flex touch-pan-y" aria-live="off">
          {photos.map((photo, index) => (
            <figure
              key={photo.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${photos.length}`}
              className={project ? "min-w-0 flex-[0_0_100%] pl-4" : compact ? "min-w-0 flex-[0_0_80%] pl-4 sm:flex-[0_0_48%] lg:flex-[0_0_35%]" : "min-w-0 flex-[0_0_86%] pl-4 sm:flex-[0_0_48%] lg:flex-[0_0_35%]"}
            >
              <button
                type="button"
                className={`group relative block w-full overflow-hidden rounded-xl bg-card focus-visible:outline-offset-[-4px] ${project ? "aspect-video cursor-zoom-in border border-white/10" : "aspect-[4/3]"}`}
                aria-label={`Open photo ${index + 1}: ${photo.alt}`}
                aria-haspopup="dialog"
                onClick={event => { event.currentTarget.focus({ preventScroll: true }); setLightboxIndex(index) }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={project ? "(max-width: 1024px) 90vw, 550px" : "(max-width: 640px) 86vw, (max-width: 1024px) 48vw, 440px"}
                  className={project ? "object-contain" : "object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"}
                  style={{ objectPosition: photo.position ?? "center" }}
                  draggable={false}
                />
                {!project && <span className="absolute left-3 top-3 rounded-full bg-background/75 px-3 py-1 font-mono text-[10px] text-foreground">{photo.year}</span>}
                <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true"><Expand size={15} /></span>
              </button>
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="font-mono text-xs text-muted-foreground" aria-live={shouldPlay ? "off" : "polite"} aria-atomic="true">{String(selected + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>
        <div className="flex gap-2">
          {!project && <button type="button" className="icon-button" aria-label={paused || motionReduced ? "Play carousel" : "Pause carousel"} aria-controls={trackId} disabled={motionReduced || photos.length < 2} onClick={togglePlayback}>
            {paused || motionReduced ? <Play size={17} aria-hidden="true" /> : <Pause size={17} aria-hidden="true" />}
          </button>}
          <button type="button" className="icon-button" aria-label="Previous photo" aria-controls={trackId} disabled={!emblaApi || photos.length < 2} onClick={() => navigate("previous")}><ArrowLeft size={18} aria-hidden="true" /></button>
          <button type="button" className="icon-button" aria-label="Next photo" aria-controls={trackId} disabled={!emblaApi || photos.length < 2} onClick={() => navigate("next")}><ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
      <Lightbox photos={photos} index={lightboxIndex} onIndexChange={setLightboxIndex} onClose={() => setLightboxIndex(null)} />
    </div>
  )
}
