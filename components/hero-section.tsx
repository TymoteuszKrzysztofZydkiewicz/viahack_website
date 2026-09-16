import Image from "next/image"
import { MapPin } from "lucide-react"
import { PixelCloud, PixelStar } from "./pixel-decorations"
import { Reveal } from "./reveal"

export function HeroSection() {
  return (
    <section id="home" className="hero-section relative overflow-hidden" aria-labelledby="hero-title">
      <div className="page-container relative flex min-h-[540px] items-center justify-center py-32 sm:min-h-[620px] sm:py-40">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <PixelCloud className="pixel-float absolute left-[7%] top-[14%] h-auto w-20 opacity-70 sm:left-[10%] sm:top-[20%] sm:w-28" />
          <PixelCloud className="pixel-float-slow absolute bottom-[14%] left-[13%] h-auto w-16 opacity-40 sm:bottom-[20%] sm:left-[22%] sm:w-20" />
          <PixelStar className="pixel-float-slow absolute right-[18%] top-[14%] h-5 w-5 opacity-80 sm:right-[25%] sm:top-[20%]" />
          <PixelStar className="pixel-float absolute bottom-[25%] left-[7%] h-3 w-3 opacity-50 sm:left-[10%]" />
          <PixelStar className="pixel-float absolute right-[8%] top-[38%] hidden h-4 w-4 opacity-50 sm:block" />
          <Image src="/icon.png" alt="" width={144} height={144} priority className="pixel-float-slow pixel-art absolute bottom-[8%] right-[9%] h-24 w-24 object-contain sm:bottom-[11%] sm:right-[12%] sm:h-36 sm:w-36" />
        </div>
        <Reveal className="relative z-10 text-center">
          <h1 id="hero-title" className="hero-title pixel-brand text-primary">VIAHACK</h1>
          <p className="pixel-brand mt-7 text-lg text-foreground sm:text-2xl">Next edition February 2027</p>
          <p className="pixel-brand mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground"><MapPin size={15} className="text-secondary" aria-hidden="true" />Horsens, Denmark</p>
        </Reveal>
      </div>
    </section>
  )
}
