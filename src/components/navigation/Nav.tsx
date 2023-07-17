import Link from "next/link"
import { Icons } from "@/src/components/Icons"
import { MainNav } from "@/src/components/navigation/MainNav"
import MobileNav from "@/src/components/navigation/MobileNav"
import { siteConfig } from "@/src/config/site"
import { cn } from "@/src/lib/utils"
import { NavItem } from "@/src/types/nav"

export function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center space-x-4 sm:container sm:justify-between sm:space-x-0">
        <div className="flex gap-2 sm:gap-4 md:gap-10">
          {/* make animation dropdown menu https://github.com/shadcn/taxonomy/blob/651f984e52edd65d40ccd55e299c1baeea3ff017/components/main-nav.tsx#L11 */}
          <div className="z-10 block w-full sm:hidden">
            <MobileNav />
          </div>
          <Link href="/" className="flex items-center space-x-1">
            <Icons.logo className="h-6 w-6" />
            <span className="inline-block font-bold">{siteConfig.name}</span>
          </Link>
          {siteConfig.mainNav?.length ? (
            <nav className="hidden gap-6 sm:flex">
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
          {/* @ts-ignore Server Component */}
          <MainNav />
        </div>
      </div>
    </header>
  )
}
