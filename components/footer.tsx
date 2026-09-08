import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="page-container flex flex-col items-center gap-5 py-10 text-center">
        <Link href="/" aria-label="VIAHACK home" className="inline-flex rounded-md">
          <Image src="/icon.png" alt="" width={60} height={60} className="pixel-art h-[60px] w-[60px] object-contain" />
        </Link>
        <p className="text-xs leading-6 text-muted-foreground sm:text-sm">VIA University College, Horsens, Denmark</p>
      </div>
    </footer>
  )
}

