import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";



const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pravaah | Soul Maps & Vedic Sanctuary",
  description:
    "A contemplative sanctuary for personal introspection, Vedic blueprints, and daily spiritual discovery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} dark antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-[#0C0A09] text-[#FAFAF9] font-sans selection:bg-[#F97316]/30 selection:text-[#FEF08A] overflow-x-hidden">
        <ClerkProvider
          signInFallbackRedirectUrl="/home"
          signUpFallbackRedirectUrl="/home"
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
