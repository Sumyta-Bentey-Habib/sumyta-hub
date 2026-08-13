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
  title: "Sumyta Bentey Habib | Full-Stack Developer",
  description:
    "Sumyta Bentey Habib is a Full-Stack Developer specializing in React, Next.js, Node.js, MongoDB, and modern web applications.",
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
              jobTitle: "Full-Stack Developer",
              sameAs: [
                "https://www.linkedin.com/in/sumytabenteyhabib/",
                "https://github.com/Sumyta-Bentey-Habib",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "Node.js",
                "MongoDB",
                "JavaScript",
                "TypeScript",
              ],
            }),
          }}
        />
      </head>

      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased selection:bg-primary selection:text-on-primary-fixed bg-surface-container-lowest text-secondary`}
      >
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
