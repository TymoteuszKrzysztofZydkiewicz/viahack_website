import { Clock } from "lucide-react"

export function ScheduleSection() {
  const day1 = [
    { time: "09:00", event: "Registration & Check-in", type: "setup" },
    { time: "10:00", event: "Opening Ceremony", type: "ceremony" },
    { time: "10:30", event: "Challenge Reveal", type: "highlight" },
    { time: "11:00", event: "Hacking Begins!", type: "coding" },
    { time: "13:00", event: "Lunch Break", type: "break" },
    { time: "15:00", event: "Mentor Check-in #1", type: "mentor" },
    { time: "19:00", event: "Dinner", type: "break" },
    { time: "22:00", event: "Late Night Snacks", type: "break" },
  ]

  const day2 = [
    { time: "08:00", event: "Breakfast", type: "break" },
    { time: "09:00", event: "Final Sprint", type: "coding" },
    { time: "11:00", event: "Code Freeze", type: "highlight" },
    { time: "11:30", event: "Presentations Begin", type: "ceremony" },
    { time: "13:00", event: "Jury Deliberation", type: "ceremony" },
    { time: "14:00", event: "Winner Announcement", type: "highlight" },
    { time: "14:30", event: "Closing Ceremony", type: "ceremony" },
  ]

  const typeColors: Record<string, string> = {
    setup: "border-muted-foreground/30",
    ceremony: "border-neon-cyan/50",
    highlight: "border-neon-pink/50",
    coding: "border-neon-pink/50",
    break: "border-muted-foreground/20",
    mentor: "border-neon-cyan/50",
  }

  const typeDots: Record<string, string> = {
    setup: "bg-muted-foreground",
    ceremony: "bg-neon-cyan",
    highlight: "bg-neon-pink",
    coding: "bg-neon-pink",
    break: "bg-muted-foreground/50",
    mentor: "bg-neon-cyan",
  }

  return (
    <section id="schedule" className="relative px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-pixel text-2xl md:text-3xl text-center text-neon-pink glow-pink mb-4">
          Event Schedule
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-lg mx-auto leading-relaxed">
          Two days of non-stop innovation, from challenge reveal to winner announcement.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Day 1 */}
          <div className="rounded-xl border border-border bg-card p-6 glow-box-pink">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="h-5 w-5 text-neon-pink" />
              <h3 className="font-pixel text-xs text-neon-pink">
                Day 1 - May 2
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              {day1.map((item) => (
                <div
                  key={item.time + item.event}
                  className={`flex items-center gap-3 rounded-lg border ${typeColors[item.type]} bg-background/50 px-4 py-3`}
                >
                  <span className={`h-2 w-2 rounded-full shrink-0 ${typeDots[item.type]}`} />
                  <span className="font-mono text-xs text-muted-foreground w-12 shrink-0">
                    {item.time}
                  </span>
                  <span className="text-sm text-foreground">{item.event}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Day 2 */}
          <div className="rounded-xl border border-border bg-card p-6 glow-box-cyan">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="h-5 w-5 text-neon-cyan" />
              <h3 className="font-pixel text-xs text-neon-cyan">
                Day 2 - May 3
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              {day2.map((item) => (
                <div
                  key={item.time + item.event}
                  className={`flex items-center gap-3 rounded-lg border ${typeColors[item.type]} bg-background/50 px-4 py-3`}
                >
                  <span className={`h-2 w-2 rounded-full shrink-0 ${typeDots[item.type]}`} />
                  <span className="font-mono text-xs text-muted-foreground w-12 shrink-0">
                    {item.time}
                  </span>
                  <span className="text-sm text-foreground">{item.event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
