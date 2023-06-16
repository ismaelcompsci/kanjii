"use client"

import { ChangeEvent, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import StrokeGraph from "@/components/stroke-graph"

export default function IndexPage() {
  // TODO on backspace delete the svg but dont rerender the whole page lul
  const [inputText, setInputText] = useState("")
  const [showDesc, setShowDesc] = useState(true)
  const [showDiagram, setShowDiagram] = useState(false)

  const generate = () => {
    setShowDiagram(true)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
    setShowDesc(false)

    if (e.target.value === "") {
      setShowDiagram(false)
    }
  }

  const SearchResults = () => {
    return (
      <div className="w-full relative float-left">
        <h2>Stroke Order</h2>
        {inputText.split("").map((k, index) => (
          <div key={index}>
            <h3>{k}</h3>
            <StrokeGraph kanji={k} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="p-1 flex items-center flex-col">
      <div className="grid w-full sm:max-w-sm md:max-w-lg items-center gap-1.5">
        <div className="flex w-full items-center space-x-2">
          <Input
            onChange={handleChange}
            value={inputText}
            type="text"
            placeholder="Kana or Kanji"
            className="border-accent focus:border-border"
          />
          <Button onClick={generate} className="">
            Generate
          </Button>
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
          </>
        ) : (
          <p className="text-center">{inputText}</p>
        )}
      </div>
      {showDiagram && inputText !== "" && (
        <div className="w-full px-1 lg:items-center">
          <SearchResults />
        </div>
      )}
    </div>
  )
}

// <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
// <div className="space-y-2 rounded-sm bg-slate-950 p-2">
//   <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
//     <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
//     <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
//   </div>
//   <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
//     <div className="h-4 w-4 rounded-full bg-slate-400" />
//     <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
//   </div>
//   <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
//     <div className="h-4 w-4 rounded-full bg-slate-400" />
//     <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
//   </div>
// </div>
// </div>
