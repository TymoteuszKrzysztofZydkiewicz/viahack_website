export function OrganizersSection() {
  const organizers = [
    {
      name: "Organizer 1",
      role: "Lead Organizer",
      color: "hsl(320 100% 65%)",
    },
    {
      name: "Organizer 2",
      role: "Tech Coordinator",
      color: "hsl(185 100% 55%)",
    },
    {
      name: "Organizer 3",
      role: "Events Manager",
      color: "hsl(45 100% 60%)",
    },
    {
      name: "Organizer 4",
      role: "Marketing Lead",
      color: "hsl(280 60% 65%)",
    },
    {
      name: "Organizer 5",
      role: "Sponsor Relations",
      color: "hsl(320 100% 65%)",
    },
    {
      name: "Organizer 6",
      role: "Mentor Coordinator",
      color: "hsl(185 100% 55%)",
    },
  ]

  return (
    <section id="organizers" className="relative px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-pixel text-2xl md:text-3xl text-center text-neon-pink glow-pink mb-4">
          Organizers
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-lg mx-auto leading-relaxed">
          The team behind VIAHACK. Students passionate about technology, innovation,
          and building community.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {organizers.map((person, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 hover:border-neon-pink/30 transition-all"
            >
              {/* Pixel avatar */}
              <div className="relative">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  {/* Head */}
                  <rect
                    x="16"
                    y="4"
                    width="32"
                    height="28"
                    rx="2"
                    fill={person.color}
                    opacity="0.3"
                  />
                  <rect
                    x="20"
                    y="8"
                    width="24"
                    height="20"
                    fill={person.color}
                    opacity="0.5"
                  />
                  {/* Eyes */}
                  <rect x="24" y="14" width="6" height="6" fill={person.color} />
                  <rect x="34" y="14" width="6" height="6" fill={person.color} />
                  {/* Mouth */}
                  <rect
                    x="28"
                    y="22"
                    width="8"
                    height="3"
                    fill={person.color}
                    opacity="0.7"
                  />
                  {/* Body */}
                  <rect
                    x="12"
                    y="34"
                    width="40"
                    height="20"
                    rx="2"
                    fill={person.color}
                    opacity="0.2"
                  />
                  <rect
                    x="16"
                    y="36"
                    width="32"
                    height="16"
                    fill={person.color}
                    opacity="0.35"
                  />
                </svg>
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    boxShadow: `0 0 20px ${person.color.replace(")", " / 0.2)")}`,
                  }}
                />
              </div>
              <div className="text-center">
                <h3 className="font-pixel text-[10px] text-foreground mb-1">
                  {person.name}
                </h3>
                <p className="text-xs text-muted-foreground">{person.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
