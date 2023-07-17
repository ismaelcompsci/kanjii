"use client"

import { ChangeEvent, KeyboardEvent, memo, useState } from "react"
import DownloadSvgButton from "@/src/components/DownloadSvgButton"
import Underline from "@/src/components/Underline"
import StrokeGraph from "@/src/components/kanji/StrokeGraph"
import { Button } from "@/src/components/ui/Button"
import { Input } from "@/src/components/ui/Input"

const SearchResults = memo(({ inputText }: { inputText: string }) => {
  return (
    <div className="relative float-left w-full">
      <div className="flex w-full justify-between">
        <h2 className="text-2xl">Stroke Order</h2>
        <DownloadSvgButton text={inputText} />
      </div>
      {inputText.split("").map((k, index) => (
        <div key={index} id={`${k}-${index}`}>
          <h3 className="w-fit text-xl underline decoration-sky-500 underline-offset-2 hover:text-sky-900 hover:underline-offset-4">
            <a href={`https://jisho.org/search/${k}`} target="_blank">
              {k}
            </a>
          </h3>
          <StrokeGraph kanji={k} />
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
    // setShowDesc(false)
    generate()
  }
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      generate()
    }
  }

  return (
    <>
      <div className="grid w-full items-center gap-1.5 sm:max-w-sm md:max-w-lg">
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

      <div className="w-full pt-4 sm:w-1/2 ">
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
            <ul className="mx-4 list-disc">
              <li className="text-sm">
                Example :{" "}
                <Underline
                  content="家族は七人です。"
                  handleClick={handleClick}
                />
              </li>
              <li className="text-sm">
                Example - as much as possible :{" "}
                <Underline content="出来るだけ" handleClick={handleClick} />
              </li>{" "}
              <li className="text-sm">
                Example - expression, look :{" "}
                <Underline content="表情" handleClick={handleClick} />
              </li>
            </ul>
          </>
        ) : (
          <p className="text-center">{inputText}</p>
        )}
      </div>
      {showDiagram && (
        <div className="w-full px-1 lg:items-center">
          <SearchResults key={inputText} inputText={inputText} />
        </div>
      )}
    </>
  )
}
