import { ArrowUpRight } from "lucide-react"
import { contactEmail } from "@/lib/hackathon"
import { PixelCloud } from "./pixel-decorations"
import { Reveal } from "./reveal"

export function ContactSection() {
  return (
    <section id="contact" className="page-container pb-20 pt-4 sm:pb-28" aria-labelledby="contact-title">
      <Reveal className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface px-6 py-10 sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute right-8 top-6 hidden opacity-20 sm:block" aria-hidden="true"><PixelCloud className="pixel-float-slow h-auto w-20" /></div>
        <div className="relative flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center lg:gap-16">
          <div>
            <h2 id="contact-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">Let’s collaborate</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">Want to collaborate with us as a mentor, sponsor, or have an idea you&apos;d like us to hear about? Contact us.</p>
          </div>
          <a className="button button-primary shrink-0" href={`mailto:${contactEmail}`}>Contact Us <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </Reveal>
    </section>
  )
}
