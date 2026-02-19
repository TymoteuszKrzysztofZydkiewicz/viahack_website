import logo from "../app/icon.png"

export function Footer() {
  return (
    <footer className="relative border-t border-border px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo area */}
          <div className="flex items-center gap-3">
            <img src={logo.src} className="h-20 w-20" />
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            {[{ "name": "Instagram", "url": "https://www.instagram.com/viahack_horsens/" },
            { "name": "Linkedin", "url": "https://www.linkedin.com/company/viahack-hachathon/" },
            { "name": "Discrod", "url": "https://discord.gg/PPRJrxVq" }]
              .map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-neon-cyan transition-colors"
                >
                  {social.name}
                </a>
              ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>VIA University College</p>
          <p>{"VIAHACK. All rights reserved."}</p>
        </div>
      </div>
    </footer>
  )
}
