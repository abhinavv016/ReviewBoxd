import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/homePage/footer";
import { Providers } from "./providers";
import BackgroundWrapper from "@/components/background/backgroundWrapper"; // new client wrapper

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
      <body className="relative min-h-screen bg-black" suppressHydrationWarning>
        <BackgroundWrapper>
          <Providers>{children}</Providers>
        </BackgroundWrapper>
        <Footer />
      </body>
    </html>
  );
}