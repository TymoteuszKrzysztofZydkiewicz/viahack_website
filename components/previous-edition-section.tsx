import { Users, FolderGit2, GraduationCap } from "lucide-react"
import hackathonImg1 from '../images/hackathon_2025_img1.jpg';
import hackathonImg2 from '../images/hackathon_2025_img2.jpg';
import hackathonImg3 from '../images/hackathon_2025_img3.jpg';
import hackathonImg4 from '../images/hackathon_2025_img4.jpg';
import redbull from '../images/redbull.png';
import coflow from '../images/coflow.png';
import ida from '../images/ida.png';
import kbsoftware from '../images/kbsoftware.png';
import sharkgaming from '../images/sharkgaming.svg';
import campuscafe from '../images/campuscafe.png';


export function PreviousEditionSection() {
  const stats = [
    {
      icon: Users,
      value: "50+",
      label: "Participants",
      color: "text-neon-pink",
      glow: "glow-box-pink",
    },
    {
      icon: FolderGit2,
      value: "10",
      label: "Projects Created",
      color: "text-neon-cyan",
      glow: "glow-box-cyan",
    },
    {
      icon: GraduationCap,
      value: "3",
      label: "Jury",
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
            hackathonImg1.src,
            hackathonImg2.src,
            hackathonImg3.src,
            hackathonImg4.src
          ].map((src, i) => (
            <img
              src={src}
              key={i}
              className="object-cover aspect-square rounded-lg border-2 border-border bg-mid-purple flex items-center justify-center overflow-hidden"
              style={{
                boxShadow: `inset 0 0 20px hsl(263 60% 10%), 0 0 10px hsl(${i % 2 === 0 ? "320 100% 60%" : "185 100% 50%"
                  } / 0.15)`,
              }}
            ></img>
          ))}
        </div>

        {/* Previous sponsors */}
        <div className="text-center">
          <p className="font-pixel text-[10px] text-muted-foreground mb-6 tracking-wider uppercase">
            Previous Sponsors
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { "src": coflow.src, "link": "https://www.coflowvisuals.com/", "bg": "bg-card" },
              { "src": kbsoftware.src, "link": "https://kbsoftware.dk/", "bg": "bg-white" },
              { "src": redbull.src, "link": "https://www.redbull.com/", "bg": "bg-card" },
              { "src": ida.src, "link": "https://studerende.ida.dk/", "bg": "bg-card" },
              { "src": campuscafe.src, "link": "https://www.instagram.com/campus.cafe/", "bg": "bg-card" },
              { "src": sharkgaming.src, "link": "https://sharkgaming.dk/", "bg": "bg-card" },
            ].map((company, i) => (
              <a href={company.link} target="_blank" rel="noopener noreferrer" key={i}>
                <img
                  key={i}
                  src={company.src}
                  className={`w-32 h-32 sm:w-32 sm:h-32 object-contain rounded-lg border border-border ${company.bg} text-sm text-muted-foreground hover:border-neon-cyan/30 transition-colors`}
                ></img>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
