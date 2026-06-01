import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://vrindavanbrajyatra.in"),
  title: {
    default: "Vrindavan Braj Yatra — Best Pilgrimage Tour Packages for Braj Bhoomi",
    template: "%s | Vrindavan Braj Yatra",
  },
  description: "Book your divine Braj Yatra with Vrindavan Braj Yatra. Affordable pilgrimage packages for Vrindavan, Mathura, Govardhan, Barsana, Nandgaon & Gokul. Trusted local guides, comfortable travel, proper darshan planning. Call +91 89239 44689.",
  keywords: ["Braj Yatra", "Vrindavan Darshan", "Mathura Vrindavan Tour", "Braj Bhoomi", "Govardhan Parikrama", "Barsana Yatra", "Pilgrimage Tour Vrindavan", "Vrindavan Temple Tour", "Mathura Tour Package", "Braj Yatra Package"],
  authors: [{ name: "Vrindavan Braj Yatra" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Vrindavan Braj Yatra — Experience the Divine Essence of Braj Bhoomi",
    description: "Book your divine Braj Yatra with Vrindavan Braj Yatra. Explore Vrindavan, Mathura, Govardhan, Barsana, Nandgaon & Gokul. Comfortable travel, local guides, proper darshan planning. Call +91 89239 44689",
    url: "https://vrindavanbrajyatra.in",
    siteName: "Vrindavan Braj Yatra",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1657089975754-c93bde43b01e?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Vrindavan Braj Yatra - Divine Pilgrimage Tours",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Vrindavan Braj Yatra",
              description: "Best pilgrimage tour packages for Braj Bhoomi - Vrindavan, Mathura, Govardhan, Barsana, Nandgaon & Gokul",
              url: "https://vrindavanbrajyatra.in",
              telephone: "+918923944689",
              email: "tour@vrindavanbrajyatra.in",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Infront of Kailash Nagar, Near Shani Dev Mandir, Mathura Vrindavan Road",
                addressLocality: "Vrindavan",
                addressRegion: "Uttar Pradesh",
                postalCode: "281121",
                addressCountry: "IN",
              },
              image: "https://images.unsplash.com/photo-1657089975754-c93bde43b01e?w=1200&q=80",
              priceRange: "₹1,499 - ₹9,999+",
              sameAs: ["https://www.instagram.com/vrindavanbrajyatra/"],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-braj-cream text-braj-dark`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
