import type { ReactNode } from "react"
import type { StaticImageData } from "next/image"
import Link from "next/link"
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react"
import { Reveal } from "@/components/reveal"
import type { Edition } from "@/lib/types"

export function EditionHeader({ year, dates, poweredBy, photo, stats }: {
  year: string
  dates: string
  poweredBy?: ReactNode
  photo?: { image: StaticImageData; alt: string; position?: string }
  stats: Edition["stats"]
}) {
  return (
    <section className="pb-14 pt-8 sm:pb-16 sm:pt-10">
      <div className="page-container">
        <nav aria-label="Breadcrumb" className="mb-12 flex items-center gap-3 text-xs text-muted-foreground sm:mb-16">
          <Link href="/" className="inline-flex items-center gap-2 transition-colors hover:text-foreground"><ArrowLeft size={14} aria-hidden="true" /> Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground">{year}</span>
        </nav>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal>
            <header className="flex flex-col items-start gap-5">
              <h1 className="edition-title pixel-brand">
                VIAHACK
                <span className="mt-2 block text-primary">{year}</span>
              </h1>
              {poweredBy}
            </header>
            <div className="mt-7 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-6">
              <span className="inline-flex items-center gap-2"><CalendarDays size={15} className="text-primary" aria-hidden="true" />{dates}</span>
              <span className="inline-flex items-center gap-2"><MapPin size={15} className="text-secondary" aria-hidden="true" />Horsens, Denmark</span>
            </div>
          </Reveal>
          {photo && (
            <Reveal delay={0.1}>
              <img
                src={photo.image.src}
                alt={photo.alt}
                width={photo.image.width}
                height={photo.image.height}
                className="aspect-[4/3] w-full rounded-2xl object-cover"
                style={{ objectPosition: photo.position }}
                fetchPriority="high"
              />
            </Reveal>
          )}
        </div>
        <Reveal className="mt-12 sm:mt-16">
          <dl className="grid divide-y divide-white/10 border-y border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse items-center gap-2 px-5 py-7 text-center sm:py-9">
                <dt className="text-xs text-muted-foreground sm:text-sm">{stat.label}</dt>
                <dd className="text-3xl font-medium tracking-tight text-foreground sm:text-[2rem] lg:text-4xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
