"use client"

import { useRef } from "react"

import { StrokeGraphProps } from "@/types/types"
import { kanjiURL } from "@/lib/utils"
import createStrokeOrderDiagram from "@/hooks/createStrokeOrderDiagram"

import { ScrollArea, ScrollBar } from "./ui/scroll-area"

const StrokeGraph: React.FC<StrokeGraphProps> = ({ kanji }) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const svgHolder = useRef<HTMLDivElement | null>(null)

  if (!kanji) {
    return null
  }

  const kanjiUrlFromKanji = kanjiURL(kanji)
  createStrokeOrderDiagram(kanjiUrlFromKanji, svgRef, svgHolder)

  return (
    <div className="overflow-x-auto overflow-y-hidden w-full" ref={svgHolder}>
      <ScrollArea className="rounded-md pb-2">
        <svg ref={svgRef}></svg>
        <ScrollBar orientation="horizontal" className="" />
      </ScrollArea>
    </div>
  )
}

export default StrokeGraph
