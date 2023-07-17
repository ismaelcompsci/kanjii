"use client"

import { useRef } from "react"
import { ScrollArea, ScrollBar } from "@/src/components/ui/ScrollArea"
import createStrokeOrderDiagram from "@/src/hooks/create-stroke-order-diagram"
import { kanjiURL } from "@/src/lib/utils"

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
