import DownloadSvgButton from "../DownloadSvgButton"
import StrokeGraph from "./StrokeGraph"

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
      <div className="flex flex-col p-1 md:flex-row">
        <div className="hover:font-hira w-auto justify-center whitespace-nowrap text-center text-[100px]">
          {word}
        </div>
        <div className="container grid grid-cols-1 gap-8 md:grid-cols-[50%_50%] ">
          <div className="col-span-full h-10 border-b text-center font-semibold">
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
        <div className="relative float-left w-full">
          <div className="flex w-full justify-between">
            <h2>Stroke Order</h2>
            <DownloadSvgButton text={word} />
          </div>
          {word.split("").map((k, index) => (
            <div key={index}>
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
