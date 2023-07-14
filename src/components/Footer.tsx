"use client"

import { usePathname } from "next/navigation"

import { siteConfig } from "../config/site"
import { cn } from "../lib/utils"
import { Icons } from "./Icons"

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  if (pathname.includes("/study/")) {
    return null
  }

  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo className="h-6 w-6" />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              ismaelcompsci
            </a>
            . Hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </a>
            . Stroke data by{" "}
            <a
              href="http://kanjivg.tagaini.net/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              KanjiVG
            </a>
            . Using shadcn components{" "}
            <a
              href={"https://github.com/shadcn/ui"}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
