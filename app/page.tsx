"use client"

import { ChangeEvent, KeyboardEvent, memo, useRef, useState } from "react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import StrokeGraph from "@/components/stroke-graph"

const SearchResults = memo(({ inputText }: { inputText: string }) => {
  return (
    <div className="w-full relative float-left">
      <h2>Stroke Order</h2>
      {inputText.split("").map((k, index) => (
        <div key={index} id={`${k}-${index}`}>
          <h3>{k}</h3>
          <StrokeGraph key={`${k}-${index}`} kanji={k} />
        </div>
      ))}
    </div>
  )
})

SearchResults.displayName = "SearchResults"

export default function IndexPage() {
  const [inputText, setInputText] = useState("")
  const [showDesc, setShowDesc] = useState(true)
  const [showDiagram, setShowDiagram] = useState(false)
  const { theme } = useTheme()

  const generate = () => {
    setShowDiagram(true)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInputText(e.target.value)
    setShowDesc(false)

    if (e.target.value === "") {
      setShowDiagram(false)
    }
  }

  const handleClick = (text: string) => {
    setInputText(text)
    generate()
  }
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      generate()
    }
  }

  return (
    <div className="p-1 flex items-center flex-col">
      <div className="grid w-full sm:max-w-sm md:max-w-lg items-center gap-1.5">
        <div className="flex w-full items-center space-x-2">
          <Input
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={inputText}
            type="text"
            placeholder="Kana or Kanji"
            className="border-accent focus:border-border"
          />

          <Button onClick={generate}>Generate</Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Enter a japanese character or sentence to get the stroke order
        </p>
      </div>

      <div className="pt-4 w-full sm:w-1/2 ">
        {showDesc || inputText === "" ? (
          <>
            <p className="mb-5">
              Welcome to StrokeMaster! Your ultimate destination for mastering
              Japanese calligraphy. Easily convert Japanese characters or
              sentences into a stroke order diagram, appreciating the intricate
              details of this beautiful art form.
            </p>
            <p className="mb-5">
              Once you submit your input we generate a detailed stroke order
              diagram.
            </p>
            <ul className="list-disc">
              <li className="text-sm">
                Example :{" "}
                <span
                  onClick={() => {
                    handleClick("家族は七人です。")
                  }}
                  className={cn(
                    "underline text-blue-800 cursor-pointer hover:text-white",
                    theme === "dark" ? "hover:text-white" : "hover:text-black"
                  )}
                >
                  家族は七人です。
                </span>
              </li>
              <li>顔</li>
              <li>顔</li>
            </ul>
          </>
        ) : (
          <p className="text-center">{inputText}</p>
        )}
      </div>
      {showDiagram && inputText !== "" && (
        <div className="w-full px-1 lg:items-center">
          <SearchResults inputText={inputText} />
        </div>
      )}
    </div>
  )
}

// <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
//   <div className="space-y-2 rounded-sm bg-slate-950 p-2">
//     <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
//       <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
//       <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
//     </div>
//     <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
//       <div className="h-4 w-4 rounded-full bg-slate-400" />
//       <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
//     </div>
//     <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
//       <div className="h-4 w-4 rounded-full bg-slate-400" />
//       <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
//     </div>
//   </div>
// </div>
