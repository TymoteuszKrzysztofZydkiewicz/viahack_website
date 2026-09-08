import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { EditionPage } from "@/components/edition-page"
import { editions } from "@/lib/hackathon"

export const metadata: Metadata = {
  title: "2025 Edition",
  description: "Revisit VIA Hackathon 2025: 45+ participants, 10 projects, prizes worth 10,000 DKK, and the winning AI Recipe App at VIA University College in Horsens, Denmark.",
}

export default function Edition2025Page() {
  const edition = editions.find((item) => item.year === "2025")
  if (!edition) notFound()
  return <EditionPage edition={edition} />
}
