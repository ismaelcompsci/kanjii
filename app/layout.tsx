import "@/styles/globals.css"
import { Metadata } from "next"
import ModalProvider from "@/providers/ModalProvider"
import SupabaseProvider from "@/providers/SupabaseProvider"
import UserProvider from "@/providers/UserProvider"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ToastProvider } from "@/components/ui/toast"
import SiteHeader from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/toaster"
import QueryWrapper from "@/components/wrapper"

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
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <SupabaseProvider>
          <UserProvider>
            <QueryWrapper>
              <head />
              <body
                className={cn(
                  "min-h-screen bg-background font-sans antialiased",
                  fontSans.variable
                )}
              >
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                >
                  <ModalProvider />
                  <div className="relative flex min-h-screen flex-col">
                    <SiteHeader />
                    <div className="flex-1">{children}</div>
                    <Toaster />
                  </div>
                  <TailwindIndicator />
                </ThemeProvider>
              </body>
            </QueryWrapper>
          </UserProvider>
        </SupabaseProvider>
      </html>
    </>
  )
}
