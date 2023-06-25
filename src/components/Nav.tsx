import Link from "next/link"

import { siteConfig } from "../config/site"
import { getAuthSession } from "../lib/auth"
import { cn } from "../lib/utils"
import { NavItem } from "../types/nav"
import { Icons } from "./Icons"
import { MainNav } from "./MainNav"

export async function Nav() {
  const session = await getAuthSession()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" />
            <span className="inline-block font-bold">{siteConfig.name}</span>
          </Link>
          {siteConfig.mainNav?.length ? (
            <nav className="flex gap-6">
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
