import "./globals.css"
import { Metadata } from "next"

import Providers from "../components/Providers"
import { TailwindIndicator } from "../components/TailwindIndicator"
import { ThemeProvider } from "../components/ThemeProvider"
import { Nav } from "../components/navigation/Nav"
import { Toaster } from "../components/ui/Toaster"
import { siteConfig } from "../config/site"
import { fontSans } from "../lib/fonts"
import { cn } from "../lib/utils"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/0788c.svg",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
  authModal: React.ReactNode
}

export default function RootLayout({ children, authModal }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <Providers>
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
            )}
          >
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative flex min-h-screen flex-col">
                <Toaster />
                <Nav />
                {authModal}
                <div className="flex-1">{children}</div>
              </div>
              <TailwindIndicator />
            </ThemeProvider>
          </body>
        </Providers>
      </html>
    </>
  )
}
