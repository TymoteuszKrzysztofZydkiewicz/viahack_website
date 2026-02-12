import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { ScheduleSection } from "@/components/schedule-section"
import { PreviousEditionSection } from "@/components/previous-edition-section"
import { OrganizersSection } from "@/components/organizers-section"
import { FaqSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <>
      {/* <Navbar /> */}
      <main>
        <HeroSection />
        <div className="h-px bg-border/30" />
        <AboutSection />
        <div className="h-px bg-border/30" />
        <HowItWorksSection />
        <div className="h-px bg-border/30" />
        <ScheduleSection />
        <div className="h-px bg-border/30" />
        <PreviousEditionSection />
        <div className="h-px bg-border/30" />
        <OrganizersSection />
        <div className="h-px bg-border/30" />
        <FaqSection />
        <div className="h-px bg-border/30" />
        {/* <ContactSection /> */}
      </main>
      <Footer />
    </>
  )
}
