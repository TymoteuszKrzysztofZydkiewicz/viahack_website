import { Users, FolderGit2, GraduationCap } from "lucide-react"

export function PreviousEditionSection() {
  const stats = [
    {
      icon: Users,
      value: "80+",
      label: "Participants",
      color: "text-neon-pink",
      glow: "glow-box-pink",
    },
    {
      icon: FolderGit2,
      value: "15+",
      label: "Projects Created",
      color: "text-neon-cyan",
      glow: "glow-box-cyan",
    },
    {
      icon: GraduationCap,
      value: "10+",
      label: "Mentors",
      color: "text-neon-pink",
      glow: "glow-box-pink",
    },
  ]

  return (
    <section id="previous" className="relative px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-pixel text-2xl md:text-3xl text-center text-neon-cyan glow-cyan mb-4">
          Previous Edition
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-lg mx-auto leading-relaxed">
          A look back at what happened at VIAHACK. The energy, the projects, and the
          community that made it unforgettable.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-8 ${stat.glow}`}
            >
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <span className={`font-pixel text-2xl ${stat.color}`}>
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Gallery frames */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            "Teams collaborating during the hackathon",
            "Presenting projects to jury",
            "Late night coding session",
            "Winner announcement ceremony",
          ].map((alt, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg border-2 border-border bg-mid-purple flex items-center justify-center overflow-hidden"
              style={{
                boxShadow: `inset 0 0 20px hsl(263 60% 10%), 0 0 10px hsl(${
                  i % 2 === 0 ? "320 100% 60%" : "185 100% 50%"
                } / 0.15)`,
              }}
            >
              <div className="flex flex-col items-center gap-2 p-4 text-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="4" width="24" height="20" fill="hsl(263 40% 30%)" />
                  <rect x="8" y="8" width="16" height="12" fill="hsl(263 40% 25%)" />
                  <rect x="10" y="14" width="4" height="6" fill="hsl(120 50% 40%)" />
                  <rect x="16" y="10" width="4" height="10" fill="hsl(120 50% 35%)" />
                  <rect x="22" y="16" width="4" height="4" fill="hsl(45 100% 60%)" />
                  <rect x="4" y="24" width="24" height="4" fill="hsl(263 40% 35%)" />
                </svg>
                <span className="font-pixel text-[7px] text-muted-foreground leading-relaxed">
                  {alt}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Previous sponsors */}
        <div className="text-center">
          <p className="font-pixel text-[10px] text-muted-foreground mb-6 tracking-wider uppercase">
            Previous Sponsors
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              "Shark Gaming",
              "Red Bull",
              "IDA",
              "KB Software",
              "CoFlow Visuals",
            ].map((name) => (
              <div
                key={name}
                className="rounded-lg border border-border bg-card px-6 py-3 text-sm text-muted-foreground hover:border-neon-cyan/30 transition-colors"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
