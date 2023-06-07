"use client"

import { useCallback, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import useLoginModal from "@/hooks/useAuthModal"
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

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid Email").min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
})

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true)

    axios
      .post("/api/register", values)
      .then(() => {
        // TODO : ADD TOAST
        registerModal.onClose()
        loginModal.onOpen()
      })
      .catch((error) => {
        // TODO : ADD TOAST
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const onToggle = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  // TODO : ADD SOCIAL LOGINS
  return (
    <Modal
      title="Welcome to Kanjii"
      description="Register your account"
      isOpen={registerModal.isOpen}
      onChange={() => {
        form.reset()
        registerModal.onClose()
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="johndoe123"
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
              Register
            </Button>
            {/* <p className="px-8 text-center text-sm text-muted-foreground w-full">
              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs font-medium leading-none text-[#000000] no-underline group-hover:no-underline mr-1">
                !
              </span>
              <span
                onClick={onToggle}
                className="hover:text-brand underline underline-offset-4 cursor-pointer"
              >
                Don&apos;t have an account? Sign Up
              </span>
            </p> */}
          </div>
        </form>
      </Form>
    </Modal>
  )
}

export default RegisterModal
