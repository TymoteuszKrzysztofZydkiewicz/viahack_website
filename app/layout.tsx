import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
})

export const metadata: Metadata = {
    icons: {
        icon: "/icon.png",
    },
    title: "VIAHACK 2026",
    description:
        "24-hour innovation hackathon at VIA University College. Form teams, solve real-world problems, and showcase your skills.",
}

export const viewport: Viewport = {
    themeColor: "#2a0e4e",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark">
        <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
        </html>
    )
}