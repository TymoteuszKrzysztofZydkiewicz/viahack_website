import { Code, Users, Lightbulb, Trophy } from "lucide-react"

export function AboutSection() {
  const features = [
    {
      icon: Code,
      title: "24-Hour Challenge",
      description:
        "A full day of non-stop coding, creativity, and collaboration. Build something amazing from scratch.",
    },
    {
      icon: Users,
      title: "Team-Based",
      description:
        "Form teams and work together to solve real-world problems using technology and innovation.",
    },
    {
      icon: Lightbulb,
      title: "Real Problems",
      description:
        "Tackle real challenges provided by industry partners. Your solutions can make a real impact.",
    },
    {
      icon: Trophy,
      title: "Win Prizes",
      description:
        "Present your project to a jury of experts and compete for prizes and recognition.",
    },
  ]

  return (
    <section id="about" className="relative px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-pixel text-2xl md:text-3xl text-center text-neon-pink glow-pink mb-4">
          About the Event
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto leading-relaxed">
          VIAHACK is a 24-hour innovation hackathon where software students come
          together to solve real-world problems through code, creativity, and
          collaboration.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative rounded-xl border border-border bg-card p-6 glow-box-pink transition-all hover:border-neon-pink/40"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-neon-pink/10 border border-neon-pink/20">
                  <feature.icon className="h-6 w-6 text-neon-pink" />
                </div>
                <div>
                  <h3 className="font-pixel text-xs mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
