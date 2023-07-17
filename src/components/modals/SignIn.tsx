import Link from "next/link"
import { Icons } from "@/src/components/Icons"
import UserAuthForm from "@/src/components/UserAuthForm"

const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mx-auto max-w-xs text-sm">
          By continuing, you are setting up a StrokeMaster account and agree to
          our User Agreement and Privacy Policy.
        </p>

        {/* sign in form */}
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-zinc-700">
          New to StrokeMaster?{" "}
          <Link
            href="/sign-up"
            className="text-sm underline underline-offset-4 hover:text-zinc-800"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
