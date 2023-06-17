"use client"

import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useToast } from "@/hooks/use-toast"
import useLoginModal from "@/hooks/useLoginModal"
import useRegisterModal from "@/hooks/useRegisterModal"

import { Icons } from "./icons"
import Modal from "./modal"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

const loginSchema = z.object({
  email: z.string().email("Invalid Email").min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
})

const AuthModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true)

    signIn("credentials", {
      ...values,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false)

      if (callback?.ok) {
        toast({
          title: "Logged In!",
          description: "You have successfully logged in!",
        })

        router.refresh()
        loginModal.onClose()
      }

      if (callback?.error) {
        toast({
          variant: "destructive",
          title: "Failed to log in!",
          description: "Please try again!",
        })
      }
    })
  }

  const onToggle = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  return (
    <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen={loginModal.isOpen}
      onChange={() => {
        form.reset()
        loginModal.onClose()
      }}
    >
      <Card className="border-none">
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline" onClick={() => signIn("github")}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.gitHub className="mr-2 h-4 w-4" />
              )}
              Github
            </Button>
            <Button variant="outline" onClick={() => signIn("google")}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2 h-4 w-4" />
              )}
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="name@example.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Please input your email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Please input your password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row w-full items-center relative">
            <Button disabled={isLoading} type="submit">
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <></>
              )}{" "}
              Login
            </Button>
            <p className="px-8 text-center text-sm text-muted-foreground w-full">
              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs font-medium leading-none text-[#000000] no-underline group-hover:no-underline mr-1">
                !
              </span>
              <span
                onClick={onToggle}
                className="hover:text-brand underline underline-offset-4 cursor-pointer"
              >
                Don&apos;t have an account? Sign Up
              </span>
            </p>
          </div>
        </form>
      </Form>
    </Modal>
  )
}

export default AuthModal

// <div className="grid gap-4 py-4">
// <div className="grid grid-cols-4 items-center gap-4">
//   <Label>Email</Label>
//   <Input className="col-span-3" />
// </div>
// <div className="grid grid-cols-4 items-center gap-4">
//   <Label>Password</Label>
//   <Input type="password" className="col-span-3" />
// </div>
// </div>

// {
/* <Card className="border-none">
<CardHeader className="space-y-1">
  <CardTitle className="text-2xl">Login</CardTitle>
  <CardDescription>
    Enter your email and password below to login
  </CardDescription>
</CardHeader>
<CardContent className="grid gap-4">
  <div className="grid grid-cols-2 gap-6">
    <Button variant="outline">
      <Icons.gitHub className="mr-2 h-4 w-4" />
      Github
    </Button>
    <Button variant="outline">
      <Icons.google className="mr-2 h-4 w-4" />
      Google
    </Button>
  </div>
  <div className="relative">
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t" />
    </div>
    <div className="relative flex justify-center text-xs uppercase">
      <span className="bg-background px-2 text-muted-foreground">
        Or continue with
      </span>
    </div>
  </div>
  <div className="grid gap-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="m@example.com" />
  </div>
  <div className="grid gap-2">
    <Label htmlFor="password">Password</Label>
    <Input id="password" type="password" />
  </div>
</CardContent>
<CardFooter>
  <Button className="w-full">Login</Button>
</CardFooter>
</Card> */
// }

// const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FieldValues>({
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   })

//   const onSubmit: SubmitHandler<FieldValues> = (data) => {
//     setIsLoading(true)
//   }

// const registerSchema = z.object({
//   username: z.string().min(1, {
//     message: "Username must be at least 3 characters",
//   }),
//   email: z.string().email("Invalid Email").min(1, "Email is required"),
//   password: z
//     .string()
//     .min(1, "Password is required")
//     .min(6, "Password must have more than 6 characters"),
// })
