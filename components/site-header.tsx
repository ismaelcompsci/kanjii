"use client"

import { useRouter } from "next/navigation"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import useLoginModal from "@/hooks/useLoginModal"
import { Button, buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { useToast } from "../hooks/use-toast"
import UserAccountNav from "./user-account-nav"

interface SiteHeaderProps {
  currentUser: User | null
}

const SiteHeader: React.FC<SiteHeaderProps> = ({ currentUser }) => {
  const loginModal = useLoginModal()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    signOut()

    toast({
      title: "Logged out",
      description: "you are currently logged out",
    })
    router.refresh()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-40 w-full  bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            {currentUser ? (
              <>
                <UserAccountNav
                  currentUser={currentUser}
                  handleLogout={handleLogout}
                />
              </>
            ) : (
              <Button
                onClick={loginModal.onOpen}
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
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
