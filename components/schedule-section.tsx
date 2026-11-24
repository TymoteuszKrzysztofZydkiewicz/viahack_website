import { Clock } from "lucide-react"
import { schedule2027 } from "@/lib/edition-2027"
import { Reveal } from "./reveal"

export function ScheduleSection() {
  return (
    <section id="schedule" className="page-container pb-20 sm:pb-28" aria-labelledby="schedule-title">
      <Reveal className="section-heading">
        <h2 id="schedule-title">Event schedule</h2>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        {schedule2027.map(({ date, events }, index) => (
          <Reveal key={date} className="edition-card p-5 sm:p-7" delay={index * 0.08}>
            <h3 className="flex items-center gap-3 text-lg font-semibold tracking-tight">
              <Clock size={20} strokeWidth={1.5} className="shrink-0 text-secondary" aria-hidden="true" />
              {date}
            </h3>
            <ul className="mt-4 divide-y divide-white/10">
              {events.map(({ time, title, note }) => (
                <li key={title} className="flex gap-3 py-3 text-sm leading-6 last:pb-0 sm:gap-5">
                  <span className="w-24 shrink-0 whitespace-nowrap font-medium tabular-nums text-primary">{time}</span>
                  <div>
                    <span>{title}</span>
                    {note && <p className="text-xs text-muted-foreground">{note}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
