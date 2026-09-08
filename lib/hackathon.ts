import insero from "@/images/inseroLogoRect.png"
import mainai from "@/images/mainaiBlack.svg"
import systematic from "@/images/systematicLogo.svg"
import kbsoftware from "@/images/kbsoftware-contained.svg"
import coflow from "@/images/coflow.png"
import redbull from "@/images/redbull.png"
import ida from "@/images/ida.png"
import campuscafe from "@/images/campuscafe.png"
import sharkgaming from "@/images/sharkgaming.svg"
import kasia from "@/images/kasia.jpg"
import jakub from "@/images/jakub.jpg"
import tymek from "@/images/tymek.jpg"
import viaLiveImage from "@/images/winning project 2026/vialive_1.webp"
import type { Edition, GalleryPhoto, TeamMember } from "@/lib/types"

export type { GalleryPhoto } from "@/lib/types"

export const contactEmail = "hackathon@viauc.dk"
export const collaborationHref = "mailto:" + contactEmail + "?subject=" + encodeURIComponent("VIA Hackathon 2027 — Collaboration")
export const sponsorshipHref = "mailto:" + contactEmail + "?subject=" + encodeURIComponent("VIA Hackathon 2027 — Sponsorship")

// The 2026 dates are confirmed by the event schedule at https://viahack.dk/.
// Edition figures and winning projects are supplied by the organizing team.
export const editions: Edition[] = [
  {
    year: "2026", label: "SECOND EDITION", title: "VIA Hackathon 2026",
    description: "Our second edition brought 13 teams together for a 24-hour hackathon at VIA University College in Horsens.",
    details: ["20-21.03.2026", "13 teams"],
    dates: "20–21 March 2026",
    theme: "24-hour hackathon",
    stats: [
      { label: "Submitted projects", value: "13" },
      { label: "Participants", value: "55+" },
      { label: "Prizes worth", value: "19,000 DKK" },
    ],
    winningProject: {
      title: "ViaLive",
      description: "A hackathon project from VIA Hack 2026 and the 1st place winner. ViaLive is a livestreaming platform with AI-assisted explanations, quizzes, and rapid feedback tools. Built with Docker Compose, SQLite, FastAPI, React, and more.",
      githubUrl: "https://github.com/Bananapolis/Hackaton",
      image: { src: viaLiveImage.src, alt: "ViaLive host dashboard with livestream controls, a class session panel, and student feedback tools", width: viaLiveImage.width, height: viaLiveImage.height },
    },
    partners: [
      { name: "Insero", logo: insero.src, href: "https://insero.dk", tier: "Platinum", theme: "light" },
      { name: "MainAI", logo: mainai.src, href: "https://mainai.dk", tier: "Gold", theme: "light" },
      { name: "Systematic", logo: systematic.src, href: "https://systematic.com", tier: "Silver", theme: "light" },
      { name: "KB Software", logo: kbsoftware.src, href: "https://kbsoftware.dk/", tier: "Silver", theme: "light" },
    ],
  },
  {
    year: "2025", label: "FIRST EDITION", title: "VIA Hackathon 2025",
    description: "The first VIAHACK brought 45+ participants together to build 10 projects in 24 hours at VIA University College in Horsens.",
    details: ["2-3.05.2025", "10 teams"],
    dates: "2–3 May 2025",
    theme: "24-hour hackathon",
    stats: [
      { label: "Projects", value: "10" },
      { label: "Participants", value: "45+" },
      { label: "Prizes worth", value: "10,000 DKK" },
    ],
    winningProject: {
      title: "AI Recipe App",
      description: "As part of a 24-hour hackathon, our team built a mobile app that helps people discover recipes based on the ingredients they already have at home. The challenge was intense, with only one day to go from idea to working prototype, we had to make quick technical decisions, divide tasks efficiently, and collaborate closely to get everything done.",
      features: [
        { title: "AI-powered ingredient detection", description: "Users could take a photo of ingredients, and the backend identified them using an image recognition service." },
        { title: "Recipe recommendations", description: "We pulled data from a third-party recipe API and ranked suggestions." },
        { title: "Cross-platform setup", description: "An Android app (Java) connected to a Spring Boot backend." },
      ],
      techStack: "Spring Boot, REST APIs, Android Studio (Java), image recognition integration.",
      outcome: "A fully working prototype that connected ingredient detection to smart recipe suggestions, proving how tech can reduce food waste.",
      githubUrl: "https://github.com/remixmid/VIAHack/tree/main",
    },
    partners: [
      { name: "CoFlow", logo: coflow.src, href: "https://www.coflowvisuals.com/", tier: "Partner", theme: "dark" },
      { name: "KB Software", logo: kbsoftware.src, href: "https://kbsoftware.dk/", tier: "Partner", theme: "light" },
      { name: "Red Bull", logo: redbull.src, href: "https://www.redbull.com/", tier: "Partner", theme: "light" },
      { name: "IDA", logo: ida.src, href: "https://studerende.ida.dk/", tier: "Partner", theme: "dark" },
      { name: "Campus Café", logo: campuscafe.src, href: "https://www.instagram.com/campus.cafe/", tier: "Partner", theme: "light" },
      { name: "Shark Gaming", logo: sharkgaming.src, href: "https://sharkgaming.dk/", tier: "Partner", theme: "dark" },
    ],
  },
]
// Optional metadata for legacy gallery images; the gallery also discovers images/2025 and images/2026.
export const galleryPhotos: GalleryPhoto[] = [
  { src: "/assets/2025/community.jpg", alt: "VIAHACK 2025 participants gathered in front of the event screen", caption: "The people make it.", year: "2025" },
  { src: "/assets/2025/brainstorming.jpg", alt: "Two participants exploring ideas together at a whiteboard", caption: "From what if to what’s next.", year: "2025", position: "center 62%" },
  { src: "/assets/2025/teamwork.jpg", alt: "Participants and mentors discussing a project around a table", caption: "Better when we build together.", year: "2025" },
  { src: "/assets/2025/jury.jpg", alt: "The jury listening to project presentations at VIAHACK 2025", caption: "Ideas meet the real world.", year: "2025" },
]
// Existing organizer profiles; update names, images, and roles here for 2027.
export const organizers: TeamMember[] = [
  { name: "Katarzyna Olejarczyk", image: kasia.src, role: "Organizer", href: "https://www.linkedin.com/in/katarzyna-olejarczyk-nsp/" },
  { name: "Jakub Baczek", image: jakub.src, role: "Organizer", href: "https://www.linkedin.com/in/jakub-baczek-6204a2344/" },
  { name: "Tymoteusz Zydkiewicz", image: tymek.src, role: "Organizer", href: "https://www.linkedin.com/in/tymoteusz-%C5%BCydkiewicz-536458353/" },
]
