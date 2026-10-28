import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sumyta Bentey Habib | Junior Software Developer",
  description:
    "Junior Software Developer at XIIA specializing in UI implementation, responsive web and mobile interfaces, frontend feature development, and modern web applications.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
  openGraph: {
    images: [{ url: "/icon-512.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sumyta Bentey Habib",
              url: "https://sumytadev.vercel.app/",
              jobTitle: "Junior Software Developer",
              worksFor: {
                "@type": "Organization",
                name: "XIIA",
              },
              sameAs: [
                "https://www.linkedin.com/in/sumytabenteyhabib/",
                "https://github.com/Sumyta-Bentey-Habib",
              ],
              knowsAbout: [
                "Frontend Engineering",
                "UI Implementation",
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "Tailwind CSS",
                "Node.js",
                "MongoDB",
              ],
            }),
          }}
        />
      </head>

      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased selection:bg-primary selection:text-on-primary-fixed bg-surface-container-lowest text-secondary`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:bg-primary focus:text-black focus:font-mono focus:font-bold focus:outline-none"
        >
          Skip to content
        </a>
        <CustomCursor />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>
      </body>
    </html>
  );
}
