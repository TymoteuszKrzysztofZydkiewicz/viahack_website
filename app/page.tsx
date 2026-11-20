import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { PreviousEditionSection } from "@/components/previous-edition-section"
import { GallerySection } from "@/components/gallery-section"
import { OrganizersSection } from "@/components/organizers-section"
import { ContactSection } from "@/components/contact-section"
import { SponsorsSection } from "@/components/sponsors-section"
import { edition2027, sponsors2027 } from "@/lib/edition-2027"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SponsorsSection
        id="sponsors"
        sponsors={sponsors2027}
        highlightTier
        compact
        placeholderCounts={{ Gold: 1, Silver: 4 }}
        description={edition2027.challenge}
      />
      <AboutSection />
      <PreviousEditionSection />
      <GallerySection />
      <OrganizersSection />
      <ContactSection />
    </>
  )
}

