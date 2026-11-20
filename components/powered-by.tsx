import type { StaticImageData } from "next/image"

export function PoweredBy({ name, logo, originalColor = false }: { name: string; logo: StaticImageData; originalColor?: boolean }) {
  return (
    <p className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-sans text-xs font-medium text-muted-foreground backdrop-blur-sm">
      <span className="whitespace-nowrap">Powered by</span>
      <img
        src={logo.src}
        alt={name}
        width={logo.width}
        height={logo.height}
        className={`h-auto w-28 shrink-0 object-contain ${originalColor ? "" : "brightness-0 invert "}sm:w-32`}
      />
    </p>
  )
}
