"use client"

import { useEffect, useRef } from "react"
import Snap, { Fragment } from "snapsvg-cjs-ssr-safe"

import { StrokeGraphProps } from "@/types/types"
import { kanjiURL, setLineAttributes } from "@/lib/utils"

var attributes = {
  fill: "none",
  stroke: "#bdb7af",
  strokeWidth: "2",
  strokeLinecap: "square",
}

const StrokeGraph: React.FC<StrokeGraphProps> = ({ kanjiDetails }) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const svgHolder = useRef<HTMLDivElement | null>(null)

  const kanjiUrlFromKanji = kanjiURL(kanjiDetails.character)

  useEffect(() => {
    if (svgRef.current && svgHolder.current) {
      svgRef.current.setAttribute(
        "viewBox",
        `0 0 ${svgHolder.current.offsetWidth - 1} 100`
      )
      var s = Snap(svgRef.current)

      Snap.load(kanjiUrlFromKanji, function (data: Fragment) {
        console.log(svgHolder!.current!.offsetWidth)

        if (s) {
          var topLine = s.line(1, 1, svgHolder!.current!.offsetWidth, 1)
          var bottomLine = s.line(1, 99, svgHolder!.current!.offsetWidth, 99)
          var leftLine = s.line(1, 1, 1, 99)

          setLineAttributes(topLine, attributes)
          setLineAttributes(bottomLine, attributes)
          setLineAttributes(leftLine, attributes)

          console.log(data)

          var svg: Snap.Element = data.select("svg")

          svg.attr({
            height: 90,
          })

          s.add(svg)
        }
      })
    }
  }, [])

  return (
    <div className="overflow-x-auto overflow-y-hidden w-full" ref={svgHolder}>
      <svg ref={svgRef}></svg>
    </div>
  )
}

export default StrokeGraph
