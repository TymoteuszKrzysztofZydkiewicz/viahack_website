"use client"

import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import * as Dialog from "@radix-ui/react-dialog"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ArrowRight, ImageOff, X } from "lucide-react"
import type { GalleryPhoto } from "@/lib/types"

export interface LightboxProps {
  photos: GalleryPhoto[]
  index: number | null
  onIndexChange: (index: number) => void
  onClose: () => void
}

function LightboxImage({ photo }: { photo: GalleryPhoto }) {
  const [failed, setFailed] = useState(false)

  return failed ? (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-white/70" role="status">
      <ImageOff size={36} aria-hidden="true" />
      <p>This photo could not be loaded.</p>
      <p className="text-sm">You can still browse the rest of the collection.</p>
    </div>
  ) : (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes="100vw"
      className="select-none object-contain"
      priority
      draggable={false}
      onError={() => setFailed(true)}
    />
  )
}

/** Radix provides focus trapping, screen-reader isolation, and body scroll locking. */
export function Lightbox({ photos, index, onIndexChange, onClose }: LightboxProps) {
  const reducedMotion = useReducedMotion()
  const opener = useRef<HTMLElement | null>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const [direction, setDirection] = useState(1)
  const photo = index === null ? undefined : photos[index]
  const canNavigate = photos.length > 1

  const navigate = useCallback((step: number) => {
    if (index === null || !canNavigate) return
    setDirection(step)
    onIndexChange((index + step + photos.length) % photos.length)
  }, [canNavigate, index, onIndexChange, photos.length])

  return (
    <Dialog.Root open={Boolean(photo)} onOpenChange={open => { if (!open) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-[#090410]/95 backdrop-blur-xl" />
        <Dialog.Content
          className="fixed inset-0 z-[101] flex h-[100dvh] flex-col text-white outline-none"
          onOpenAutoFocus={() => {
            opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
          }}
          onCloseAutoFocus={event => {
            event.preventDefault()
            opener.current?.focus({ preventScroll: true })
          }}
          onKeyDown={event => {
            if (event.altKey || event.ctrlKey || event.metaKey) return
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault()
              navigate(event.key === "ArrowLeft" ? -1 : 1)
            }
          }}
        >
          <header className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <Dialog.Title className="text-sm font-semibold tracking-tight">VIAHACK {photo?.year}</Dialog.Title>
            </div>
            <Dialog.Close className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors hover:border-secondary hover:text-secondary" aria-label="Close photo viewer">
              <X size={21} aria-hidden="true" />
            </Dialog.Close>
          </header>

          <div
            className="relative min-h-0 flex-1 px-4 py-5 sm:px-20 sm:py-8"
            style={{ touchAction: "pan-y pinch-zoom" }}
            onTouchStart={event => {
              const touch = event.touches.length === 1 ? event.touches[0] : null
              touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null
            }}
            onTouchCancel={() => { touchStart.current = null }}
            onTouchEnd={event => {
              const start = touchStart.current
              touchStart.current = null
              const touch = event.changedTouches[0]
              if (!start || !touch) return
              const deltaX = touch.clientX - start.x
              const deltaY = touch.clientY - start.y
              if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) navigate(deltaX < 0 ? 1 : -1)
            }}
          >
            <div className="relative h-full overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                {photo && (
                  <motion.div
                    key={photo.src}
                    custom={direction}
                    className="absolute inset-0"
                    variants={{
                      enter: (step: number) => ({ opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : step * 28 }),
                      center: { opacity: 1, x: 0 },
                      exit: (step: number) => ({ opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : step * -28 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: reducedMotion ? 0 : 0.16, ease: "easeOut" }}
                  >
                    <LightboxImage photo={photo} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <footer className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-5 sm:px-8">
            <div className="min-w-0" aria-live="polite" aria-atomic="true">
              <Dialog.Description className="text-sm leading-relaxed text-white/85">{photo?.caption}</Dialog.Description>
              <p className="mt-1 font-mono text-[11px] text-white/50">{index === null ? 0 : index + 1} / {photos.length} <span className="hidden sm:inline">&nbsp; · &nbsp; Use arrow keys to browse · Esc to close</span></p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button type="button" className="icon-button border-white/20 bg-white/5" onClick={() => navigate(-1)} disabled={!canNavigate} aria-label="Previous photo"><ArrowLeft size={20} aria-hidden="true" /></button>
              <button type="button" className="icon-button border-white/20 bg-white/5" onClick={() => navigate(1)} disabled={!canNavigate} aria-label="Next photo"><ArrowRight size={20} aria-hidden="true" /></button>
            </div>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
