"use client"

import { useRef } from "react"

import createStrokeOrderDiagram from "../../hooks/create-stroke-order-diagram"
import { kanjiURL } from "../../lib/utils"
import { ScrollArea, ScrollBar } from "../ui/ScrollArea"

interface StrokeGraphProps {
  kanji: string
}

const StrokeGraph: React.FC<StrokeGraphProps> = ({ kanji }) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const svgHolder = useRef<HTMLDivElement | null>(null)

  if (!kanji) {
    return null
  }

  const kanjiUrlFromKanji = kanjiURL(kanji)
  createStrokeOrderDiagram(kanjiUrlFromKanji, svgRef, svgHolder)

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden" ref={svgHolder}>
      <ScrollArea className="rounded-md pb-2">
        <svg id={`${kanji}`} ref={svgRef}></svg>
        <ScrollBar orientation="horizontal" className="" />
      </ScrollArea>
    </div>
  )
}

export default StrokeGraph
