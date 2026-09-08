import { Code2, Flag, Users } from "lucide-react"
import { Reveal } from "./reveal"

const features = [
  { icon: Flag, title: "3rd edition of VIAHack", text: "Join our student-led hackathon in February 2027 at VIA University College.", color: "text-primary" },
  { icon: Users, title: "Meet tech people", text: "Connect with fellow students, mentors, and people from the tech industry.", color: "text-secondary" },
  { icon: Code2, title: "Build the solution", text: "Work as a team, explore an idea, and turn it into a working prototype.", color: "text-violet-300" },
]

export function AboutSection() {
  return (
    <section id="about" className="page-container pb-20 pt-6 sm:pb-28 sm:pt-8" aria-label="The experience">
      <div className="grid gap-10 border-t border-white/10 pt-12 sm:pt-14 md:grid-cols-3 md:gap-10">
        {features.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 0.08}>
            <feature.icon size={24} strokeWidth={1.5} className={`mb-5 ${feature.color}`} aria-hidden="true" />
            <h2 className="text-xl font-semibold tracking-tight">{feature.title}</h2>
            <p className="mt-3 max-w-xs text-sm leading-7 text-muted-foreground">{feature.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
