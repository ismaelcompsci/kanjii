import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

import { siteConfig } from "../config/site"
import { cn } from "../lib/utils"
import { NavItem } from "../types/nav"
import { Icons } from "./Icons"
import { MainNav } from "./MainNav"
import MobileNav from "./MobileNav"
import { Button } from "./ui/Button"

// TODO: FIX ON MOBILE

export async function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex sm:container h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-2 sm:gap-4 md:gap-10">
          {/* make animation dropdown menu https://github.com/shadcn/taxonomy/blob/651f984e52edd65d40ccd55e299c1baeea3ff017/components/main-nav.tsx#L11 */}
          <div className="block sm:hidden z-10 w-full">
            <MobileNav />
          </div>
          <Link href="/" className="flex items-center space-x-1">
            <Icons.logo className="h-6 w-6" />
            <span className="inline-block font-bold">{siteConfig.name}</span>
          </Link>
          {siteConfig.mainNav?.length ? (
            <nav className="gap-6 hidden sm:flex">
              {siteConfig.mainNav?.map(
                (item: NavItem, index) =>
                  item.href && (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "flex items-center text-sm font-medium text-muted-foreground",
                        item.disabled && "cursor-not-allowed opacity-80"
                      )}
                    >
                      {item.title}
                    </Link>
                  )
              )}
            </nav>
          ) : null}
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <MainNav />
        </div>
      </div>
    </header>
  )
}
