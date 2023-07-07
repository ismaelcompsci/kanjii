"use client"

import { FC, useCallback, useEffect, useState } from "react"
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
import { useTheme } from "next-themes"
import { SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"

import { toast } from "../hooks/use-toast"
import { darkTheme, lightTheme } from "../lib/codeEditorStyles"
import VocabularyInput from "./VocabularyInput"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"

const VocabularySchema = z.strictObject({
  word: z.string().min(1).max(64),
  reading: z.string().min(1).max(128).optional(),
  meaning: z.string().min(1).max(254).optional(),
  sentence: z.string().min(1).max(254).optional(),
  englishSentence: z.string().min(1).max(254).optional(),
})

const LazyVocab = z.array(VocabularySchema)

// TODO :
// minimial Vocab
// dumbpeople form
// api endopoint

const formSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(50, { message: "Pack name must be no more than 50 characters" }),
})

interface CreatePackCardFormProps {}

const CreatePackCardForm: FC<CreatePackCardFormProps> = ({}) => {
  const { theme } = useTheme()
  const currentTheme = theme === "dark" ? darkTheme : lightTheme

  const [errorMessage, setErrorMessage] = useState<string>("")
  const [code, setCode] = useState<string>(jsonString)
  const [json, setJson] = useState([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async ({
    name,
  }) => {
    if (!json) return

    for (const obj of json) {
      try {
        VocabularySchema.parse(obj)
      } catch (error: any) {
        console.log(error.message)
        toast({
          title: "Invalid vocabulary!",
          description: (
            <pre className="mt-2 w-[340px] overflow-hidden rounded-md bg-slate-950 p-4">
              <code className="inline-block text-white ">
                {JSON.stringify(obj, null, 2)}
              </code>
            </pre>
          ),
          variant: "destructive",
        })
        break
      }
    }

    const payload = {
      name: name,
      vocabulary: json,
    }

    console.log(payload)
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default CreatePackCardForm

var jsonString =
  '[{"word":"する","reading":"する","meaning":"do, make","sentence":"友達と一緒に宿題をした。","englishSentence":"I did my homework with a friend."},{"word":"言う"}]'
