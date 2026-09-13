import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { HomeSponsorsSection } from "@/components/home-sponsors-section"
import { PreviousEditionSection } from "@/components/previous-edition-section"
import { GallerySection } from "@/components/gallery-section"
import { OrganizersSection } from "@/components/organizers-section"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
  return <><HeroSection /><AboutSection /><HomeSponsorsSection /><PreviousEditionSection /><GallerySection /><OrganizersSection /><ContactSection /></>
}

