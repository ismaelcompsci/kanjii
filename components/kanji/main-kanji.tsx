interface MainKanjiProps {
  word: string
  reading: string
  meaning: string
  sentence: string
  enSentence: string
}

const MainKanji: React.FC<MainKanjiProps> = ({
  word,
  reading,
  meaning,
  sentence,
  enSentence,
}) => {
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
            {/* MAKE THIS SAFER STRING TO HTML */}
            <div
              className="text-xl"
              dangerouslySetInnerHTML={{ __html: sentence }}
            ></div>
          </div>
          <div className="md:col-start-2">
            <div className="font-extralight">english sentence</div>
            <div className="text-xl">{enSentence}</div>
          </div>
        </div>
      </div>
      <div className="container pt-3">PICTURE OF STROKES</div>
    </div>
  )
}

export default MainKanji
