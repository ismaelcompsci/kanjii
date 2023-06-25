"use client"

import StrokeGraph from "./stroke-graph"

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
            {/* TODO MAKE THIS SAFER STRING TO HTML */}
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
      <div className="w-auto pl-[0.9375rem] pr-[0.9375rem]">
        <div className="w-full relative float-left">
          <h2>Stroke Order</h2>
          {word.split("").map((k, index) => (
            <div key={index}>
              <h3>{k}</h3>
              <StrokeGraph kanji={k} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainKanji

// ANIMATION  TODO
// const { theme } = useTheme()
{
  /* <div>
          <svg ref={svgRef}></svg>
        </div> */
}

// const svgRef = useRef<SVGSVGElement | null>(null)
// const darkMode = theme === "dark" ? "dark" : ""

// const kanjiUrlFromKanji = kanjiURL(word)

// useEffect(() => {
//   const makeAnimation = (f: Fragment) => {
//     if (svgRef.current) {
//       const s = Snap(svgRef.current)
//       var diagramSize = 100
//       var allPaths = f.selectAll("path")
//       var drawnPaths: Element[] = []

//       s.attr({
//         width: diagramSize,
//         height: diagramSize,
//         viewBox: `0 0 ${diagramSize} ${diagramSize}`,
//       })

//       var boundingBoxTop = s.line(1, 1, diagramSize - 1, 1)
//       var boundingBoxLeft = s.line(1, 1, 1, diagramSize - 1)
//       var boundingBoxRight = s.line(
//         diagramSize - 1,
//         1,
//         diagramSize - 1,
//         diagramSize - 1
//       )
//       var boundingBoxBottom = s.line(
//         1,
//         diagramSize - 1,
//         diagramSize - 1,
//         diagramSize - 1
//       )
//       var horizontalGuide = s.line(
//         0,
//         diagramSize / 2,
//         diagramSize,
//         diagramSize / 2
//       )
//       var verticalGuide = s.line(
//         diagramSize / 2,
//         1,
//         diagramSize / 2,
//         diagramSize - 1
//       )

//       boundingBoxTop.attr({ class: "stroke-box" })
//       boundingBoxLeft.attr({ class: "stroke-box" })
//       boundingBoxBottom.attr({ class: "stroke-box" })
//       boundingBoxRight.attr({ class: "stroke-box" })
//       horizontalGuide.attr({ class: "stroke-box-guide" })
//       verticalGuide.attr({ class: "stroke-box-guide" })

//       allPaths.forEach((currentPath, index) => {
//         currentPath.attr({ class: `stroke-current-path ${darkMode}` })
//         currentPath.transform("scale(0.89)")

//         s.append(currentPath)
//       })
//     }
//   }
//   load(kanjiUrlFromKanji, makeAnimation)
// }, [])

// const animateKanji = () => {
//   if (svgRef.current) {
//     const s = Snap(svgRef.current)

//     const lines = s.selectAll("path")
//     const totalLines = lines.length
//     let currentLineIndex = 0

//     lines.forEach((line) => {
//       line.attr({ display: "none" })
//     })

//     const animateLine = () => {
//       // @ts-ignore
//       const line = lines[currentLineIndex]
//       line.attr({ display: "block" })
//       const lineLength = line.getTotalLength()

//       line.attr({ class: `stroke-current-path ${darkMode}` })

//       line.attr({
//         "stroke-dasharray": lineLength + " " + lineLength,
//         "stroke-dashoffset": lineLength,
//         "stroke-miterlimit": 10,
//       })

//       line.animate(
//         {
//           strokeDashoffset: 0,
//         },
//         1300,
//         mina.easeinout,
//         () => {
//           currentLineIndex++
//           if (currentLineIndex < totalLines) {
//             animateLine() // Animate the next line
//           } else {
//             console.log("Animation complete")
//           }
//         }
//       )
//     }

//     animateLine() // Start the animation
//   }
// }
