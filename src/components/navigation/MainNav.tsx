import Link from "next/link"

import { getAuthSession } from "../../lib/auth"
import { cn } from "../../lib/utils"
import { ThemeToggle } from "../ThemeToggle"
import UserAccountNav from "../UserAccountNav"
import { buttonVariants } from "../ui/Button"

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
