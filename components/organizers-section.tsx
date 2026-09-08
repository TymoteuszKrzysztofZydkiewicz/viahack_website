import { organizers } from "@/lib/hackathon"
import { Reveal } from "./reveal"
import { TeamCard } from "./team-card"

export function OrganizersSection() {
  return (
    <section id="organizers" aria-labelledby="organizers-heading" className="section-space scroll-mt-24">
      <div className="page-container">
        <Reveal className="section-heading">
          <h2 id="organizers-heading">The team</h2>
        </Reveal>
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3 sm:gap-6">
          {organizers.map((person, index) => (
            <Reveal key={person.name} delay={index * 0.08} className="mx-auto w-full max-w-sm">
              <TeamCard {...person} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
