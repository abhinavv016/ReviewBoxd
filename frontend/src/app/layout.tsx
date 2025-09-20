import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import { SessionProvider } from "next-auth/react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Reviewboxd",
  description: "Letterboxd alternative with movies, series, and anime",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="relative min-h-screen">
        <div
          className="fixed inset-0 -z-10 bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: "url('/images/reviewboxd.jpg')",
            backgroundAttachment: "fixed",
            backgroundPositionX: "center",
            backgroundPositionY: "top",   
          }}
        ></div>
        <div className="fixed inset-0 -z-10 bg-black/80"></div>
        <main className="relative z-10"><Providers>{children}</Providers></main>
        <Footer/>
      </body>
    </html>
  );
}