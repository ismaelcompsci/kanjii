import "./globals.css"
import { Metadata } from "next"
import Head from "next/head"
import { Footer } from "@/src/components/Footer"
import Providers from "@/src/components/Providers"
import { TailwindIndicator } from "@/src/components/TailwindIndicator"
import { ThemeProvider } from "@/src/components/ThemeProvider"
import { Nav } from "@/src/components/navigation/Nav"
import { Toaster } from "@/src/components/ui/Toaster"
import { siteConfig } from "@/src/config/site"
import { fontSans } from "@/src/lib/fonts"
import { cn } from "@/src/lib/utils"
import { Analytics } from "@vercel/analytics/react"

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
      <Providers>
        <html lang="en" suppressHydrationWarning>
          <Head>
            <title>Kanji Stroke order</title>
            <meta property="og:description"></meta>
          </Head>
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
            )}
          >
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <main>
                <div className="relative flex min-h-screen flex-col">
                  <Analytics />
                  <Toaster />
                  <Nav />
                  {authModal}
                  <div className="flex-1">{children}</div>
                  <Footer className="border-t" />
                </div>
                <TailwindIndicator />
              </main>
            </ThemeProvider>
          </body>
        </html>
      </Providers>
    </>
  )
}
