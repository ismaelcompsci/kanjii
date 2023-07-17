import Link from "next/link"
import { ThemeToggle } from "@/src/components/ThemeToggle"
import UserAccountNav from "@/src/components/UserAccountNav"
import { buttonVariants } from "@/src/components/ui/Button"
import { getAuthSession } from "@/src/lib/auth"
import { cn } from "@/src/lib/utils"

export async function MainNav() {
  const session = await getAuthSession()

  return (
    <nav className="flex items-center space-x-1">
      <ThemeToggle />

      {session?.user ? (
        <UserAccountNav user={session.user} />
      ) : (
        <Link href="/sign-in" className={cn(buttonVariants({ size: "sm" }))}>
          Sign In
        </Link>
      )}
    </nav>
  )
}
