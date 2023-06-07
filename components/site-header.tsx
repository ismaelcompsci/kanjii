"use client"

import Link from "next/link"
import { User } from "@prisma/client"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import useLoginModal from "@/hooks/useAuthModal"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface SiteHeaderProps {
  currentUser: User | null
}

const SiteHeader: React.FC<SiteHeaderProps> = ({ currentUser }) => {
  const loginModal = useLoginModal()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {/* <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link> */}
            <ThemeToggle />
            {currentUser ? (
              <Avatar>
                <AvatarImage
                  src={currentUser?.image || "/images/placeholder.png"}
                  alt="user"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ) : (
              <Button
                onClick={loginModal.onOpen}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "px-4"
                )}
              >
                Login
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
