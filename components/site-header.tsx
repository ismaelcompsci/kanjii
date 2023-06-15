"use client"

import { useRouter } from "next/navigation"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { LogOut, User } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import useLoginModal from "@/hooks/useAuthModal"
import { useUser } from "@/hooks/useUser"
import { Button, buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { useToast } from "../hooks/use-toast"
import { Icons } from "./icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

const SiteHeader = () => {
  const supabaseClient = useSupabaseClient()
  const loginModal = useLoginModal()
  const router = useRouter()
  const { user } = useUser()
  const { toast } = useToast()

  const handleLogout = async () => {
    toast({
      title: "Logged out",
      description: "you are currently logged out",
    })
    return
    const { error } = await supabaseClient.auth.signOut()
    router.refresh()

    if (error) {
      console.log(error, "SITEHEADER_LOGOUT")
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full  bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            {user ? (
              // Abastract to new componnect
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    onClick={() => {}}
                    className="rounded-full px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-75 transition"
                  >
                    <Icons.avatar height={18} width={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-30">
                  <DropdownMenuItem onClick={() => router.push("/account")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

// TODO
// <Avatar>
//   <AvatarImage
//     src={user || "/images/placeholder.png"}
//     alt="user"
//   />
//   <AvatarFallback>CN</AvatarFallback>
// </Avatar>
