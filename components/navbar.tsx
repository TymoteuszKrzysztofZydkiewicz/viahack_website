"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import logo from "../public/icon.png"
import inseroLogo from "../images/inseroLogoRect.png"

const links = [
  { label: "Sponsors", href: "#sponsors" },
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Schedule", href: "#schedule" },
  { label: "Previous", href: "#previous" },
  { label: "FAQ", href: "#faq" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-[hsl(262,72%,50%)]/70 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img src={logo.src} className="h-8 w-8" />
          <span className="hidden md:inline font-pixel text-[10px] text-neon-pink">VIAHACK</span>
          <span className="font-pixel text-[10px] text-foreground/60">POWERED BY</span>
          <img src={inseroLogo.src} className="h-8 w-16 object-contain" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-neon-pink transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md px-4 py-4">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-neon-cyan transition-colors py-1"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
