import type { Metadata, Viewport } from "next"
import { Inter, Press_Start_2P } from "next/font/google"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
})
const pixelFont = Press_Start_2P({
    subsets: ["latin"],
    variable: "--font-pixel",
    weight: "400",
})

export const metadata: Metadata = {
    icons: {
        icon: "/icon.png",
    },
    title: { default: "VIA Hackathon | February 2027", template: "%s | VIAHACK" },
    description:
        "Join VIA Hackathon in February 2027 at VIA University College in Horsens, Denmark. Explore past editions, meet the team, and get involved.",
}

export const viewport: Viewport = {
    themeColor: "#572c8c",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark">
        <body id="top" className={`${inter.variable} ${pixelFont.variable} site-background font-sans antialiased`}>
          <a href="#main-content" className="skip-link">Skip to content</a>
          <Navbar />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer />
        </body>
        </html>
    )
}
