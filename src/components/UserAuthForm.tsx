"use client"

import { FC, useState } from "react"
import { Icons } from "@/src/components/Icons"
import { Button } from "@/src/components/ui/Button"
import { toast } from "@/src/hooks/use-toast"
import { cn } from "@/src/lib/utils"
import { signIn } from "next-auth/react"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn("google")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging in with Google",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div {...props} className={cn("flex justify-center", className)}>
      <Button
        onClick={loginWithGoogle}
        size={"sm"}
        className="w-full"
        isLoading={isLoading}
      >
        {isLoading ? null : <Icons.google className="mr-2 h-4 w-4" />}
        Google
      </Button>
    </div>
  )
}

export default UserAuthForm
