import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/app/components/shared/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import localFont from "next/font/local";

const tanMeringueFont = localFont({
  src: "./fonts/TAN_MERINGUE.otf",
  variable: "--font-tanmeringue",
});

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Eventful",
  description: "The easiest way to experience the future of events.",
  icons: {
    icon: "/assets/icons/sternFav.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    // appearance={{
    //   baseTheme: dark,
    // }}
    >
      <html lang="en">
        <body className={`${inter.variable} ${tanMeringueFont.variable}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
