import { MutableRefObject, useEffect } from "react"
import { useTheme } from "next-themes"
import type { Element, Fragment, Paper } from "snapsvg"
// @ts-ignore
import Snap from "snapsvg-cjs-ssr-safe"

function createStrokeOrderDiagram(
  kanjiSvgUrl: string,
  svgRef: MutableRefObject<SVGSVGElement | null>,
  svgHolder: MutableRefObject<HTMLDivElement | null>
) {
  const { theme } = useTheme()

  useEffect(() => {
    const darkMode = theme === "dark" ? "dark" : ""

    const makeStrokeOrderDiagram = (f: Fragment): void => {
      if (svgRef.current && svgHolder.current) {
        const s: Paper = Snap(svgRef.current)
        var diagramSize = 200
        var coordRe = "(?:\\d+(?:\\.\\d+)?)"
        const strokeRe = new RegExp(
          `^[LMT]\\s*(${coordRe})[,\\s](${coordRe})`,
          "i"
        )

        var allPaths: Snap.Set = f.selectAll("path")
        var drawnPaths: Element[] = []

        // @ts-ignore
        var canvasWidth = (allPaths.length * diagramSize) / 2
        var canvasHeight = diagramSize / 2
        var frameSize = diagramSize / 2
        var frameOffsetMatrix = new (Snap as any).matrix()
        frameOffsetMatrix.translate(-frameSize / 16 + 2, -frameSize / 16 + 2)
        // Set drawing area
        s.node.style.width = `${canvasWidth}px`
        s.node.style.height = `${canvasHeight}px`
        s.node.setAttribute("viewBox", `0 0 ${canvasWidth} ${canvasHeight}`)

        var boundingBoxTop = s.line(1, 1, canvasWidth - 1, 1)
        var boundingBoxLeft = s.line(1, 1, 1, canvasHeight - 1)
        var boundingBoxBottom = s.line(
          1,
          canvasHeight - 1,
          canvasWidth - 1,
          canvasHeight - 1
        )
        var horizontalGuide = s.line(
          0,
          canvasHeight / 2,
          canvasWidth,
          canvasHeight / 2
        )

        boundingBoxTop.attr({ class: "stroke-box" })
        boundingBoxLeft.attr({ class: "stroke-box" })
        boundingBoxBottom.attr({ class: "stroke-box" })
        horizontalGuide.attr({ class: "stroke-box-guide" })

        let pathNumber = 1

        allPaths.forEach((currentPath: Element) => {
          var moveFrameMatrix = new (Snap as any).Matrix()
          moveFrameMatrix.translate(frameSize * (pathNumber - 1) - 4, -4)
          // Draw frame guides
          var verticalGuide = s.line(
            frameSize * pathNumber - frameSize / 2,
            1,
            frameSize * pathNumber - frameSize / 2,
            canvasHeight - 1
          )
          var frameBoxRight = s.line(
            frameSize * pathNumber - 1,
            1,
            frameSize * pathNumber - 1,
            canvasHeight - 1
          )
          verticalGuide.attr({ class: "stroke-box-guide" })
          frameBoxRight.attr({ class: "stroke-box-guide" })

          // Draw previous strokes
          drawnPaths.forEach((existingPath) => {
            // @ts-ignore
            var localPath = existingPath.clone()
            localPath.transform(moveFrameMatrix)
            localPath.attr({ class: "stroke-existing-path" })
            s.append(localPath)
          })
          // Draw current stroke
          currentPath.transform(frameOffsetMatrix)
          currentPath.transform(moveFrameMatrix)
          currentPath.attr({ class: `stroke-current-path ${darkMode}` }) //
          s.append(currentPath)

          // Draw stroke start point
          var match = strokeRe.exec(currentPath.node.getAttribute("d") || "")
          var pathStartX = match?.[1]
          var pathStartY = match?.[2]

          if (!pathStartX || !pathStartY) {
            pathNumber++
            return
          }

          var strokeStart = s.circle(+pathStartX, +pathStartY, 4)
          strokeStart.attr({ class: "stroke-path-start" })
          strokeStart.transform(moveFrameMatrix)

          pathNumber++
          // @ts-ignore
          drawnPaths.push(currentPath.clone())
        })
      }
    }

    Snap.load(kanjiSvgUrl, makeStrokeOrderDiagram)
  }, [theme])
}

export default createStrokeOrderDiagram
