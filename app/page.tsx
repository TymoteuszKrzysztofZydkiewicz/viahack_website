import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ScheduleSection } from "@/components/schedule-section"
import { PreviousEditionSection } from "@/components/previous-edition-section"
import { GallerySection } from "@/components/gallery-section"
import { OrganizersSection } from "@/components/organizers-section"
import { ContactSection } from "@/components/contact-section"
import { SponsorsSection } from "@/components/sponsors-section"
import { sponsors2027 } from "@/lib/edition-2027"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SponsorsSection
        id="sponsors"
        sponsors={sponsors2027}
        highlightTier
        compact
        placeholderCounts={{ Silver: 3 }}
      />
      <AboutSection />
      <ScheduleSection />
      <PreviousEditionSection />
      <GallerySection />
      <OrganizersSection />
      <ContactSection />
    </>
  )
}

