"use client"

import { FC, ReactNode, forwardRef } from "react"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { cn } from "../../lib/utils"
import { Icons } from "../Icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu"

interface MobileNavProps {}

const MobileNav: FC<MobileNavProps> = ({}) => {
  const pathname = usePathname()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger hidden={true}>
            <Menu className="h-6 w-6" />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="w-screen">
            <ul className="grid w-full gap-3 p-6">
              <BigListItem
                title="StrokeMaster"
                href="/"
                icon={<Icons.logo className="h-6 w-6" />}
                className={cn(
                  "",
                  pathname === "/" && "bg-gradient-to-b from-muted/50 to-muted"
                )}
              >
                Beautifully designed components built with Radix UI and Tailwind
                CSS.
              </BigListItem>
              <BigListItem
                title="Packs"
                href="/study"
                className={cn(
                  pathname === "/study" &&
                    "bg-gradient-to-b from-muted/50 to-muted"
                )}
                icon={
                  <img src="/svgs/出.svg" alt="leave" className="h-8 w-24" />
                }
              >
                Learn to write Japanese with prewritten study packs
              </BigListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
export default MobileNav

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})

const BigListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: ReactNode }
>(({ className, title, icon, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none hover:bg-gradient-to-b hover:from-muted/50 hover:to-muted focus:shadow-md",
            className
          )}
          {...props}
        >
          {icon && <>{icon}</>}
          <div className="mb-2 mt-4 text-lg font-medium">{title}</div>
          <p className="text-sm leading-tight text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
