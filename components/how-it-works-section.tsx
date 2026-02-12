export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Form Teams",
      description: "Find your crew or join a team. 2-5 members per team.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="12" y="0" width="8" height="8" fill="hsl(185 100% 50%)" />
          <rect x="8" y="8" width="4" height="4" fill="hsl(185 100% 60%)" />
          <rect x="12" y="8" width="8" height="8" fill="hsl(185 100% 70%)" />
          <rect x="20" y="8" width="4" height="4" fill="hsl(185 100% 60%)" />
          <rect x="4" y="12" width="4" height="8" fill="hsl(185 100% 50%)" />
          <rect x="8" y="12" width="4" height="8" fill="hsl(185 100% 65%)" />
          <rect x="12" y="12" width="8" height="8" fill="hsl(185 100% 75%)" />
          <rect x="20" y="12" width="4" height="8" fill="hsl(185 100% 65%)" />
          <rect x="24" y="12" width="4" height="8" fill="hsl(185 100% 50%)" />
          <rect x="8" y="24" width="4" height="4" fill="hsl(185 100% 45%)" />
          <rect x="20" y="24" width="4" height="4" fill="hsl(185 100% 45%)" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Get the Challenge",
      description: "Receive a real-world problem from our industry partners.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="0" width="20" height="4" fill="hsl(320 100% 55%)" />
          <rect x="4" y="4" width="4" height="24" fill="hsl(320 100% 55%)" />
          <rect x="20" y="4" width="4" height="24" fill="hsl(320 100% 55%)" />
          <rect x="4" y="28" width="20" height="4" fill="hsl(320 100% 55%)" />
          <rect x="8" y="8" width="4" height="4" fill="hsl(320 100% 75%)" />
          <rect x="12" y="8" width="4" height="4" fill="hsl(320 100% 75%)" />
          <rect x="8" y="14" width="8" height="4" fill="hsl(320 100% 75%)" />
          <rect x="8" y="20" width="12" height="4" fill="hsl(320 100% 75%)" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Code for 24h",
      description: "Hack, build, and create your solution non-stop.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="0" y="4" width="32" height="4" fill="hsl(263 60% 50%)" />
          <rect x="0" y="8" width="32" height="20" fill="hsl(263 60% 35%)" />
          <rect x="4" y="12" width="4" height="4" fill="hsl(185 100% 60%)" />
          <rect x="8" y="16" width="4" height="4" fill="hsl(185 100% 60%)" />
          <rect x="4" y="20" width="4" height="4" fill="hsl(185 100% 60%)" />
          <rect x="16" y="12" width="8" height="4" fill="hsl(320 100% 65%)" />
          <rect x="16" y="20" width="12" height="4" fill="hsl(45 100% 60%)" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Present",
      description: "Pitch your solution to the jury and audience.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="0" width="24" height="4" fill="hsl(45 100% 55%)" />
          <rect x="4" y="4" width="24" height="16" fill="hsl(45 100% 70%)" />
          <rect x="8" y="8" width="8" height="4" fill="hsl(263 60% 40%)" />
          <rect x="8" y="14" width="12" height="2" fill="hsl(263 60% 40%)" />
          <rect x="12" y="20" width="8" height="8" fill="hsl(45 100% 50%)" />
          <rect x="4" y="28" width="24" height="4" fill="hsl(45 100% 45%)" />
        </svg>
      ),
    },
    {
      number: "05",
      title: "Win",
      description: "Jury evaluates and winners are announced.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="8" y="0" width="16" height="4" fill="hsl(45 100% 65%)" />
          <rect x="4" y="4" width="4" height="16" fill="hsl(45 100% 55%)" />
          <rect x="24" y="4" width="4" height="16" fill="hsl(45 100% 55%)" />
          <rect x="8" y="4" width="16" height="16" fill="hsl(45 100% 75%)" />
          <rect x="12" y="8" width="8" height="4" fill="hsl(45 100% 90%)" />
          <rect x="12" y="20" width="8" height="8" fill="hsl(45 100% 50%)" />
          <rect x="8" y="28" width="16" height="4" fill="hsl(45 100% 45%)" />
        </svg>
      ),
    },
  ]

  return (
    <section id="how-it-works" className="relative px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-pixel text-2xl md:text-3xl text-center text-neon-cyan glow-cyan mb-4">
          How It Works
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-lg mx-auto leading-relaxed">
          From team formation to the winner announcement, here is how VIAHACK unfolds.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-border bg-card glow-box-cyan">
                  {step.icon}
                </div>
                <span className="absolute -top-2 -right-2 font-pixel text-[10px] text-neon-cyan bg-background border border-neon-cyan/30 rounded px-1.5 py-0.5">
                  {step.number}
                </span>
              </div>
              <h3 className="font-pixel text-[10px] text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute">
                  {/* connector handled by grid gap */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
