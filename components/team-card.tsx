import Image from "next/image"
import { Linkedin } from "lucide-react"
import type { TeamMember } from "@/lib/types"

export interface TeamCardProps extends TeamMember {
  className?: string
}

export function TeamCard({ name, image, role, href, className = "" }: TeamCardProps) {
  return (
    <article className={`group h-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.025] ${className}`}>
      <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
        <Image src={image} alt={name} fill sizes="(max-width: 639px) 85vw, (max-width: 1023px) 30vw, 280px" className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.035]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#130826]/60 via-transparent to-transparent" />
        <a href={href} target="_blank" rel="noreferrer" aria-label={`${name} on LinkedIn (opens in a new tab)`} className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-[#130826]/70 text-white backdrop-blur-md transition-colors hover:border-secondary/70 hover:bg-secondary hover:text-[#130826]">
          <Linkedin size={18} strokeWidth={1.75} aria-hidden="true" />
        </a>
      </div>
      <div className="px-5 py-5">
        <h3 className="text-base font-semibold tracking-tight text-white">{name}</h3>
        <p className="mt-1.5 text-xs text-muted-foreground">{role}</p>
      </div>
    </article>
  )
}
