import DownloadSvgButton from "@/src/components/DownloadSvgButton"
import StrokeGraph from "@/src/components/kanji/StrokeGraph"
import { CircleSlashed } from "lucide-react"

interface MainKanjiProps {
  word: string
  reading: string | null
  meaning: string | null
  sentence: string | null
  englishSentence: string | null
}

const MainKanji = ({
  word,
  reading,
  meaning,
  sentence,
  englishSentence,
}: MainKanjiProps) => {
  return (
    <div className="container mt-10 h-full p-2">
      <div className="flex flex-col p-1 md:flex-row">
        <div className="w-auto justify-center whitespace-nowrap text-center text-[100px] hover:font-hira">
          {word}
        </div>
        <div className="container grid grid-cols-1 gap-8 md:grid-cols-[50%_50%] ">
          <div className="col-span-full h-10 border-b text-center font-semibold">
            {word}
          </div>
          <div className="">
            <div className="font-extralight">reading</div>
            <div className="text-xl">
              {reading || <CircleSlashed className="h-4 w-4" />}
            </div>
          </div>

          <div>
            <div className="font-extralight">meaning</div>
            <div className="text-xl">
              {meaning || <CircleSlashed className="h-4 w-4" />}
            </div>
          </div>
          <div>
            <div className="font-extralight">sentence</div>
            {/* TODO MAKE THIS SAFER STRING TO HTML */}
            <div
              className="text-xl font-light"
              dangerouslySetInnerHTML={{
                __html: sentence || "Ø",
              }}
            />
          </div>
          <div className="md:col-start-2">
            <div className="font-extralight">english sentence</div>
            <div className="text-xl">
              {englishSentence || <CircleSlashed className="h-4 w-4" />}
            </div>
          </div>
        </div>
      </div>
      <div className="w-auto pl-[0.9375rem] pr-[0.9375rem]">
        <div className="relative float-left w-full">
          <div className="flex w-full justify-between">
            <h2>Stroke Order</h2>
            <DownloadSvgButton text={word} />
          </div>
          {word.split("").map((k, index) => (
            <div key={index} id="kanjiSvg">
              <h3>
                <a href={`https://jisho.org/search/${k}`}>{k}</a>
              </h3>
              <StrokeGraph kanji={k} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainKanji
