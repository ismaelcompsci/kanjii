"use client"

import { FC, useCallback, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Vocabulary } from "@prisma/client"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useTheme } from "next-themes"
import { SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"

import { toast } from "../hooks/use-toast"
import { darkTheme, lightTheme } from "../lib/codeEditorStyles"
import { VocabularyObjectSchema } from "../lib/validators/vocabularyFormValidator"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"

const VocabularyInput = dynamic(() => import("./VocabularyInput"), {
  ssr: false,
  loading: () => (
    <div className="flex w-full items-center justify-center align-middle">
      <Loader2 className="ml- h-8 w-8 animate-spin" />
    </div>
  ),
})

const formSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(50, { message: "Pack name must be no more than 50 characters" }),
})

interface CreatePackCardFormProps {
  packName?: string
  packVocabulary?: string
  method?: string
}

const CreatePackCardForm: FC<CreatePackCardFormProps> = ({
  packName,
  packVocabulary,
  method,
}) => {
  const router = useRouter()
  const { theme } = useTheme()
  const currentTheme = theme === "dark" ? darkTheme : lightTheme

  const [errorMessage, setErrorMessage] = useState<string>("")
  const [code, setCode] = useState<string>(packVocabulary || jsonString)
  const [loading, setIsLoading] = useState(false)
  const [json, setJson] = useState([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: packName || "",
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async ({
    name,
  }) => {
    if (!json) return
    let errors = []

    for (const obj of json) {
      try {
        VocabularyObjectSchema.parse(obj)
      } catch (error: any) {
        const err = JSON.parse(error.message)[0]

        console.log(error)
        toast({
          title: `Error: ${err.code}`,
          description: (
            <>
              <div className="flex flex-col">
                <span>"{err.keys[0]}" is invalid</span>
                <span className="text-xs text-muted-foreground">
                  {err.message}
                </span>
              </div>
              <pre className="mt-2 w-[340px] overflow-hidden rounded-md bg-slate-950 p-4">
                <code className="inline-block text-white ">
                  {JSON.stringify(obj, null, 2)}
                </code>
              </pre>
            </>
          ),
          variant: "destructive",
        })
        errors.push(err)
        break
      }
    }

    if (errors.length === 0) {
      const payload = {
        name: name,
        vocabulary: json,
      }
      try {
        setIsLoading(true)
        if (method === "EDIT") {
          await axios.post("/api/create/pack", payload)
        } else {
          await axios.post("/api/create/pack", payload)
          router.push("/study")
        }
      } catch (error) {
        console.log("CREATE_PACK_ERROR", error)
        return
      } finally {
        setIsLoading(false)
      }
    }
    return
  }

  const formatJson = useCallback(
    (_: any, spaces: number = 2) => {
      try {
        if (code) {
          const obj = JSON.parse(code)
          const str = JSON.stringify(obj, null, spaces)
          setCode(str)
        }
      } catch (error) {
        throw error
      }
    },
    [code]
  )

  const checkJson = useCallback(() => {
    setErrorMessage("")

    try {
      if (code) {
        const obj = JSON.parse(code)
        setJson(obj)
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
        setJson([])
      } else {
        throw error
      }
    }
  }, [code])

  useEffect(() => {
    checkJson()
  }, [code, checkJson])

  useEffect(() => {
    formatJson(code)
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vocabulary pack name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Vocabulary pack name"
                  {...field}
                  className="lg:max-w-2xl"
                />
              </FormControl>
              <FormDescription>This is the name for the pack.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <VocabularyInput
          currentTheme={currentTheme}
          code={code}
          errorMessage={errorMessage}
          formatJson={formatJson}
          setCode={setCode}
        />
        <Button
          type="submit"
          isLoading={loading}
          disabled={form.getValues("name").length === 0 || loading}
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default CreatePackCardForm

var jsonString =
  '[{"word":"する","reading":"する","meaning":"do, make","sentence":"友達と一緒に宿題をした。","englishSentence":"I did my homework with a friend."},{"word":"言う"}]'
