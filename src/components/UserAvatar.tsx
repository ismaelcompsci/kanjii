import Image from "next/image"
import { Icons } from "@/src/components/Icons"
import { Avatar, AvatarFallback } from "@/src/components/ui/Avatar"
import { User } from "@prisma/client"
import { AvatarProps } from "@radix-ui/react-avatar"

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "username" | "name">
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props} className="mr-1">
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            fill
            src={user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.username}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
