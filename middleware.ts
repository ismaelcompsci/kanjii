import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {
    console.log("NOT AUTH")

    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/sign-in") ||
      req.nextUrl.pathname.startsWith("/sign-up")

    if (isAuthPage) {
      console.log("AUTHPAGE")
      if (isAuth) {
        console.log("IS AUTH")
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }

      return null
    }

    if (!isAuth) {
      console.log("NOT AUTH")
      return NextResponse.redirect(new URL(`/sign-in`, req.url))
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)
export const config = {
  matcher: ["/dashboard/:path*", "/study/:path*"],
}
