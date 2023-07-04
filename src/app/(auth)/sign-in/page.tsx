import { Metadata } from "next"
import Link from "next/link"
import SignIn from "@/src/components/modals/SignIn"
import { buttonVariants } from "@/src/components/ui/Button"
import { cn } from "@/src/lib/utils"
import { ChevronLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Sign-in",
  description: "Login to your account",
}

const Page = () => {
  return (
    <div className="absolute inset-0">
      <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-20">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "-mt-20 self-start"
          )}
        >
          <ChevronLeft className=" mr-2 h-4 w-4" />
          Home
        </Link>
        <SignIn />
      </div>
    </div>
  )
}

export default Page
