"use client"

import { ChangeEvent, KeyboardEvent, memo, useState } from "react"

import DownloadSvgButton from "./DownloadSvgButton"
import StrokeGraph from "./StrokeGraph"
import Underline from "./Underline"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"

const SearchResults = memo(({ inputText }: { inputText: string }) => {
  return (
    <div className="w-full relative float-left">
      <div className="flex justify-between w-full">
        <h2 className="text-2xl">Stroke Order</h2>
        <DownloadSvgButton text={inputText} />
      </div>
      {inputText.split("").map((k, index) => (
        <div key={index} id={`${k}-${index}`}>
          <h3 className="text-xl underline underline-offset-2 decoration-sky-500 hover:underline-offset-4 hover:text-sky-900 w-fit">
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
            <ul className="list-disc mx-4">
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
