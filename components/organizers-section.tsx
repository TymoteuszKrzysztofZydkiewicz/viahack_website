import kasia from '../images/kasia.jpg';
import jakub from '../images/jakub.jpg';
import tymek from '../images/tymek.jpg';

export function OrganizersSection() {
  const organizers = [
    {
      name: "Katarzyna Olejarczyk",
      image: kasia.src,
      linkedin: "https://www.linkedin.com/in/katarzyna-olejarczyk-nsp/"
    },
    {
      name: "Jakub Baczek",
      image: jakub.src,
      linkedin: "https://www.linkedin.com/in/jakub-baczek-6204a2344/"
    },
    {
      name: "Tymoteusz Zydkiewicz",
      image: tymek.src,
      linkedin: "https://www.linkedin.com/in/tymoteusz-%C5%BCydkiewicz-536458353/"
    },
  ]

  return (
    <section id="organizers" className="relative px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-pixel text-2xl md:text-3xl text-center text-neon-pink glow-pink mb-4">
          Organizers
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-lg mx-auto leading-relaxed">
          The team behind VIAHACK. Passionate about community-building, awesome events and innovative software.
        </p>

        <div className="flex gap-6 justify-center items-center flex-wrap w-100">
          {organizers.map((person, index) => (
            <a href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="flex-shrink-0 w-40 sm:w-64 md:w-72 flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 hover:border-neon-pink/30 transition-all"            >
              <div className="text-center flex items-center justify-between flex-col gap-4">
                <img src={person.image ? person.image : undefined}
                  alt={person.name || "Avatar"}
                  className="w-40 h-40 sm:w-64 sm:h-64 rounded-lg bg-gray-800 border border-gray-700 object-cover"></img>
                <h3 className="font-pixel text-[10px] text-foreground mb-1">
                  {person.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
