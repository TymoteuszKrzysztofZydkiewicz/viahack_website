import kamstrup from "@/images/kamstrup-wordmark.png"
import insero from "@/images/inseroLogoRect.png"
import type { Sponsor } from "@/lib/types"

export const edition2027 = {
  dates: "6–7 February 2027",
  venue: "VIA University College, Campus Horsens",
  prizePool: "45,000 DKK",
  challenge: "Kamstrup will provide a real-world industry challenge for VIAHACK 2027.",
  registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfHsI6Q6D6mXWsDLtd1jmAvXKd61D-xCdREQDqeCF_OPsPTpA/viewform",
}

export const kamstrupLogo = kamstrup

export const sponsors2027: Sponsor[] = [
  { name: "Kamstrup", logo: kamstrup.src, href: "https://www.kamstrup.com/en-en", tier: "Platinum", theme: "light" },
  { name: "Insero", logo: insero.src, href: "https://insero.dk/", tier: "Gold", theme: "light" },
]
