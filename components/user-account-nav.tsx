import { FC } from "react"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"

import { Icons } from "./icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import UserAvatar from "./user-avatar"

interface UserAccountNavProps {
  currentUser: User
  handleLogout: () => void
}

const UserAccountNav: FC<UserAccountNavProps> = ({
  currentUser,
  handleLogout,
}) => {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-75 transition">
        <UserAvatar
          user={{
            name: currentUser.name || null,
            image: currentUser.image || null,
          }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30">
        <DropdownMenuItem onClick={() => router.push("/account")}>
          <Icons.user className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          <Icons.settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <Icons.logout className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav
