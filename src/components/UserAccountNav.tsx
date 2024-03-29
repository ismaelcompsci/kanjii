"use client"

import { FC } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Icons } from "@/src/components/Icons"
import { UserAvatar } from "@/src/components/UserAvatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/DropdownMenu"
import { LogOut, Settings } from "lucide-react"
import { User } from "next-auth"
import { signOut } from "next-auth/react"

interface UserAccountNavProps {
  user: Pick<User, "name" | "image" | "email">
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{
            name: user.name || null,
            image: user.image || null,
            username: null,
          }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-30" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          <Icons.like className="mr-2 h-4 w-4" />
          <Link href="/dashboard/likes">Likes</Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => router.push("/dashboard/manage")}
        >
          <Icons.package className="mr-2 h-4 w-4" />
          <Link href="/dashboard/likes">Manage</Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => router.push("/dashboard/billing")}
        >
          <Icons.billing className="mr-2 h-4 w-4" />
          <Link href="/dashboard/billing">Billing</Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => router.push("/dashboard/settings")}
        >
          <Settings className="mr-2 h-4 w-4" />
          <Link href="/dashboard/settings">Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            })
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav
