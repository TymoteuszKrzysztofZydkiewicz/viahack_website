"use client"

import { PixelCloud, PixelCat, PixelStar } from "./pixel-decorations"
import { Calendar, MapPin } from "lucide-react"
import logo from "../app/icon.png"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Background pixel decorations */}
      <PixelCloud className="absolute top-12 left-8 opacity-60 animate-float hidden md:block" />
      <PixelCloud className="absolute top-24 right-12 opacity-40 animate-float-slow scale-75 hidden md:block" />
      <PixelCloud className="absolute bottom-32 left-16 opacity-30 animate-float scale-50 hidden lg:block" />
      <PixelStar className="absolute top-32 left-1/4 opacity-50 animate-pixel-blink" />
      <PixelStar className="absolute top-20 right-1/3 opacity-40 animate-pixel-blink scale-150" />
      <PixelStar className="absolute bottom-40 right-1/4 opacity-30 animate-pixel-blink" />
      <PixelCat className="absolute top-16 right-20 opacity-70 animate-float-slow scale-150 hidden md:block" />

      <div className="relative z-14 flex flex-col items-center gap-8 text-center max-w-4xl mx-auto">

        {/* Hackathon logo */}
        <img
          src={logo.src}
          alt="VIAHACK logo"
          className="
            w-48 md:w-64 lg:w-80
            h-auto
            object-contain
            mx-auto
            drop-shadow-[0_0_30px_rgba(255,0,255,0.4)]
            animate-float-slow
          "
        />

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-foreground/80 max-w-xl leading-relaxed">
          24-hour innovation hackathon at VIA University College
        </p>

        {/* Event details */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-muted-foreground">
          <span className="flex items-center gap-2 font-pixel text-[10px]">
            <Calendar className="h-4 w-4 text-neon-cyan" />
            20-21 March 2026
          </span>
          <span className="flex items-center gap-2 font-pixel text-[10px]">
            <MapPin className="h-4 w-4 text-neon-pink" />
            VIA University College, Horsens
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <a
            href="mailto:hackathon@viauc.dk"
            className="font-pixel text-xs px-8 py-4 border-2 border-neon-cyan text-neon-cyan rounded-lg glow-box-cyan hover:bg-neon-cyan/10 transition-all"
          >
            Work with us
          </a>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
