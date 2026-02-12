import { PixelStar } from "./pixel-decorations"

export function Footer() {
  return (
    <footer className="relative border-t border-border px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo area */}
          <div className="flex items-center gap-3">
            <PixelStar className="h-6 w-6" />
            <span className="font-pixel text-sm text-neon-pink">VIAHACK</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {[
              { label: "About", href: "#about" },
              { label: "Schedule", href: "#schedule" },
              { label: "FAQ", href: "#faq" },
              { label: "Contact", href: "#contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-neon-cyan transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            {["Instagram", "LinkedIn", "Discord"].map((name) => (
              <a
                key={name}
                href="#"
                className="text-xs text-muted-foreground hover:text-neon-cyan transition-colors"
              >
                {name}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>VIA University College</p>
          <p>{"VIAHACK 2025. All rights reserved."}</p>
        </div>
      </div>
    </footer>
  )
}
