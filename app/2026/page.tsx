import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { EditionPage } from "@/components/edition-page"
import { editions } from "@/lib/hackathon"

export const metadata: Metadata = {
  title: "2026 Edition",
  description: "Explore VIA Hackathon 2026: 13 submitted projects, 55+ participants, prizes worth 19,000 DKK, and the winning project ViaLive. Held on 20–21 March in Horsens, Denmark.",
}

export default function Edition2026Page() {
  const edition = editions.find((item) => item.year === "2026")
  if (!edition) notFound()
  return <EditionPage edition={edition} />
}
