"use client"

import { Mail, Send } from "lucide-react"
import { useState } from "react"

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  return (
    <section id="contact" className="relative px-4 py-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-pixel text-2xl md:text-3xl text-center text-neon-pink glow-pink mb-4">
          Contact Us
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-lg mx-auto leading-relaxed">
          Have a question or want to collaborate? Reach out to us.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-border bg-card p-6 glow-box-pink">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-5 w-5 text-neon-pink" />
                <h3 className="font-pixel text-[10px] text-foreground">
                  Email Us
                </h3>
              </div>
              <a
                href="mailto:viahack@via.dk"
                className="text-neon-cyan hover:underline text-sm"
              >
                viahack@via.dk
              </a>
            </div>

            {/* Social links */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-pixel text-[10px] text-foreground mb-4">
                Follow Us
              </h3>
              <div className="flex gap-4">
                {[
                  { name: "Instagram", href: "#" },
                  { name: "LinkedIn", href: "#" },
                  { name: "Discord", href: "#" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="rounded-lg border border-border bg-background px-4 py-2 text-xs text-muted-foreground hover:border-neon-cyan/40 hover:text-neon-cyan transition-all"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <form
            className="rounded-xl border border-border bg-card p-6 glow-box-cyan flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              window.location.href = `mailto:viahack@via.dk?subject=VIAHACK%20Contact%20from%20${encodeURIComponent(
                formState.name
              )}&body=${encodeURIComponent(formState.message)}`
            }}
          >
            <div>
              <label
                htmlFor="name"
                className="block font-pixel text-[9px] text-muted-foreground mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formState.name}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, name: e.target.value }))
                }
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/30 transition-all"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-pixel text-[9px] text-muted-foreground mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formState.email}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, email: e.target.value }))
                }
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/30 transition-all"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block font-pixel text-[9px] text-muted-foreground mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                value={formState.message}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, message: e.target.value }))
                }
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/30 transition-all min-h-[100px] resize-none"
                placeholder="Your message..."
                required
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 font-pixel text-[10px] px-6 py-3 bg-neon-pink text-primary-foreground rounded-lg glow-box-pink hover:brightness-110 transition-all"
            >
              <Send className="h-4 w-4" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
