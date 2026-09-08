"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { contactEmail } from "@/lib/hackathon"

const links = [
  { label: "Home", href: "/" },
  { label: "2026 Edition", href: "/2026" },
  { label: "2025 Edition", href: "/2025" },
  { label: "Gallery", href: "/gallery" },
  { label: "The Team", href: "/#organizers" },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setOpen(false)
      menuButton.current?.focus()
    }
    const closeOutside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false)
    }
    const closeOnFocusOutside = (event: FocusEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false)
    }
    const desktop = window.matchMedia("(min-width: 1024px)")
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false)
    }

    document.addEventListener("keydown", closeOnEscape)
    document.addEventListener("pointerdown", closeOutside)
    document.addEventListener("focusin", closeOnFocusOutside)
    desktop.addEventListener("change", closeOnDesktop)
    return () => {
      document.removeEventListener("keydown", closeOnEscape)
      document.removeEventListener("pointerdown", closeOutside)
      document.removeEventListener("focusin", closeOnFocusOutside)
      desktop.removeEventListener("change", closeOnDesktop)
    }
  }, [open])

  return (
    <header ref={header} className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#2a1147]/80 backdrop-blur-xl">
      <div className="page-container flex h-20 items-center justify-between gap-5">
        <Link href="/" aria-label="VIAHACK home" className="flex shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image src="/icon.png" width={42} height={42} alt="" priority className="pixel-art h-[42px] w-[42px] object-contain" />
          <span className="wordmark text-white">VIA<span className="text-primary">HACK</span></span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex xl:gap-7">
          {links.map((link) => {
            const active = pathname === link.href
            return (
              <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className={`nav-link relative whitespace-nowrap py-2 ${active ? "!text-white" : ""}`}>
                {link.label}
                {active && <span aria-hidden="true" className="absolute -bottom-[19px] left-0 right-0 h-px bg-primary" />}
              </Link>
            )
          })}
        </nav>

        <a className="button button-small button-outline hidden shrink-0 lg:inline-flex" href={`mailto:${contactEmail}`}>
          Contact Us <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <button ref={menuButton} type="button" className="icon-button lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="page-container flex max-h-[calc(100dvh-5rem)] flex-col gap-1 overflow-y-auto border-t border-white/10 pb-5 pt-3 lg:hidden">
          {links.map((link) => (
            <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={`nav-link rounded-md px-3 py-3 ${pathname === link.href ? "bg-white/5 !text-secondary" : ""}`} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <a className="button button-primary mt-3" href={`mailto:${contactEmail}`} onClick={() => setOpen(false)}>
            Contact Us <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </nav>
      )}
    </header>
  )
}
