"use client"

import inseroLogo from "../images/inseroLogoRect.png"
import kbsoftwareLogo from "../images/kbsoftware.png"
import systematicLogo from "../images/systematicLogo.svg"

export function SponsorsSection() {
    const platinum = [
        { src: inseroLogo.src, link: "https://insero.dk", bg: "white" },
    ]

    const gold = [
        { src: "", link: "", bg: "card" },
        { src: "", link: "", bg: "card" }
    ]

    const silver = [
        { src: systematicLogo.src, link: "https://systematic.com", bg: "white" },
        { src: kbsoftwareLogo.src, link: "https://kbsoftware.dk/", bg: "white" },
        { src: "", link: "", bg: "card" }
    ]

    return (
        <section id="sponsors" className="relative px-4 py-24">
            <div className="max-w-6xl mx-auto">
                <h2 className="font-pixel text-2xl md:text-3xl text-center text-neon-pink glow-pink mb-16">
                    Our Sponsors for 2026
                </h2>

                {/* Single-column layout */}
                <div className="flex flex-col items-center gap-16">

                    {/* Platinum */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="font-pixel text-sm sm:text-base text-neon-cyan">Platinum</div>
                        <div className="flex justify-center gap-4 flex-wrap w-full">
                            {platinum.map((logo, i) => (
                                <a
                                    key={i}
                                    href={logo.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${logo.src == "" ? "pointer-events-none" : ""} w-56 sm:w-80 h-36 sm:h-56 flex items-center justify-center rounded-xl border border-border bg-${logo.bg} p-2 sm:p-4 hover:border-neon-cyan/40 transition-all`}
                                >
                                    <img src={logo.src} className="object-contain max-h-full max-w-full" alt="Platinum sponsor" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Gold */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="font-pixel text-sm sm:text-base text-[hsl(46_100%_55%)]">Gold</div>
                        <div className="flex justify-center gap-4 flex-wrap w-full">
                            {gold.map((logo, i) => (
                                <a
                                    key={i}
                                    href={logo.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${logo.src == "" ? "pointer-events-none" : ""} w-40 sm:w-56 h-28 sm:h-40 flex items-center justify-center rounded-xl border border-border bg-${logo.bg} p-2 sm:p-4 hover:border-[hsl(46_100%_55%)]/40 transition-all`}
                                >

                                    {logo.src !== "" ? <img src={logo.src} className="object-contain max-h-full max-w-full" alt="Gold sponsor" /> : <div className="max-h-full max-w-full font-pixel text-center text-neon-pink glow-pink">Coming Soon</div>}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Silver */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="font-pixel text-sm sm:text-base text-muted-foreground">Silver</div>
                        <div className="flex justify-center gap-4 flex-wrap w-full">
                            {silver.map((logo, i) => (
                                <a
                                    key={i}
                                    href={logo.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${logo.src == "" ? "pointer-events-none" : ""} w-28 sm:w-36 h-20 sm:h-28 flex items-center justify-center rounded-xl border border-border bg-${logo.bg} p-2 sm:p-4 hover:border-neon-cyan/40 transition-all`}
                                >
                                    {logo.src !== "" ? <img src={logo.src} className="object-contain max-h-full max-w-full" alt="Gold sponsor" /> : <div className="max-h-full max-w-full font-pixel text-center text-neon-pink glow-pink text-xs">Coming Soon</div>}
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}