import kamstrup from "@/images/kamstrup-wordmark.png"
import insero from "@/images/inseroLogoRect.png"
import mainai from "@/images/mainaiBlack.svg"
import stibo from "@/images/Stibo_Logo_logo.png"
import type { Sponsor } from "@/lib/types"

export const edition2027 = {
  dates: "6–7 February 2027",
  venue: "VIA University College, Campus Horsens",
  prizePool: "45,000 DKK",
  registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfHsI6Q6D6mXWsDLtd1jmAvXKd61D-xCdREQDqeCF_OPsPTpA/viewform",
}

export const kamstrupLogo = kamstrup

export const sponsors2027: Sponsor[] = [
  { name: "Kamstrup", logo: kamstrup.src, href: "https://www.kamstrup.com/en-en", tier: "Platinum", theme: "light" },
  { name: "Insero", logo: insero.src, href: "https://insero.dk/", tier: "Gold", theme: "light" },
  { name: "MainAI", logo: mainai.src, href: "https://mainai.dk", tier: "Gold", theme: "light" },
  { name: "Stibo Systems", logo: stibo.src, href: "https://www.stibosystems.com/", tier: "Silver", theme: "light" },
]

export const schedule2027 = [
  {
    date: "Saturday, 6 February",
    events: [
      { time: "10:00–11:00", title: "Opening ceremony" },
      { time: "11:00–09:00", title: "22 hours of coding", note: "Ends on Sunday" },
      { time: "16:00", title: "Pizza time" },
    ],
  },
  {
    date: "Sunday, 7 February",
    events: [
      { time: "09:00–12:00", title: "Judging" },
      { time: "12:00–13:00", title: "Closing ceremony and final results" },
    ],
  },
]
