import { FC } from "react"
import { Vocabulary } from "@prisma/client"

import StrokeGraph from "./StrokeGraph"
import { Button } from "./ui/Button"

interface MainKanjiProps {
  word: string
  reading: string
  meaning: string
  sentence: string
  englishSentence: string
}

const MainKanji = ({
  word,
  reading,
  meaning,
  sentence,
  englishSentence,
}: MainKanjiProps) => {
  return (
    <div className="container h-screen p-2">
      <div className="p-1 flex flex-col md:flex-row">
        <div className="text-[100px] whitespace-nowrap w-auto text-center justify-center hover:font-hira">
          {word}
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-[50%_50%] gap-8 ">
          <div className="text-center col-span-full h-10 font-semibold border-b">
            {word}
          </div>
          <div className="">
            <div className="font-extralight">reading</div>
            <div className="text-xl">{reading}</div>
          </div>

          <div>
            <div className="font-extralight">meaning</div>
            <div className="text-xl">{meaning}</div>
          </div>
          <div>
            <div className="font-extralight">sentence</div>
            {/* TODO MAKE THIS SAFER STRING TO HTML */}
            <div
              className="text-xl"
              dangerouslySetInnerHTML={{ __html: sentence }}
            ></div>
          </div>
          <div className="md:col-start-2">
            <div className="font-extralight">english sentence</div>
            <div className="text-xl">{englishSentence}</div>
          </div>
        </div>
      </div>
      <div className="w-auto pl-[0.9375rem] pr-[0.9375rem]">
        <div className="w-full relative float-left">
          <h2>Stroke Order</h2>
          {word.split("").map((k, index) => (
            <div key={index}>
              <h3>{k}</h3>
              <StrokeGraph kanji={k} word={word} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainKanji
