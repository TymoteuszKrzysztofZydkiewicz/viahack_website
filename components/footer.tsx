import Image from "next/image"
import Link from "next/link"
import { Instagram, Linkedin, MessageCircle } from "lucide-react"

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/viahack_horsens/", icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/viahack-hachathon/", icon: Linkedin },
  { label: "Discord", href: "https://discord.com/invite/EC8NwgpSdf", icon: MessageCircle },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="page-container flex flex-col items-center gap-5 py-10 text-center">
        <Link href="/" aria-label="VIAHACK home" className="inline-flex rounded-md">
          <Image src="/icon.png" alt="" width={60} height={60} className="pixel-art h-[60px] w-[60px] object-contain" />
        </Link>
        <p className="text-xs leading-6 text-muted-foreground sm:text-sm">VIA University College, Horsens, Denmark</p>
        <nav aria-label="Social media" className="flex items-center gap-3">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${label} (opens in a new tab)`}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-muted-foreground transition-colors hover:border-secondary hover:bg-secondary/10 hover:text-secondary focus-visible:border-secondary focus-visible:text-secondary"
            >
              <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

