import type { Metadata, Viewport } from "next"
import { headers } from "next/headers"
import { Anton } from "next/font/google"
import "./globals.css"

const anton = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
})

const title = "DRY® Skateboards — Born in the Heat"
const description = "Emirati-owned skate goods and streetwear shaped by Abu Dhabi heat, concrete, and street culture."

export async function generateMetadata(): Promise<Metadata> {
  const incomingHeaders = await headers()
  const host = incomingHeaders.get("x-forwarded-host") ?? incomingHeaders.get("host") ?? "localhost:3000"
  const protocol = incomingHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https")
  const imageUrl = new URL("/og.png", `${protocol}://${host}`).toString()

  return {
    title,
    description,
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
        { url: "/favicon.ico", type: "image/x-icon" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: imageUrl, width: 1732, height: 909, alt: "DRY Skateboards — Born in the Heat" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  }
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f4f0e5",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={anton.variable}>
      <body>{children}</body>
    </html>
  )
}
