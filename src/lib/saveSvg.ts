import { Canvg, RenderingContext2D, presets } from "canvg"

function XMLSerialize(svg: any) {
  // quick-n-serialize an SVG dom, needed for IE9 where there's no XMLSerializer nor SVG.xml
  // s: SVG dom, which is the <svg> elemennt
  function XMLSerializerForIE(s: any) {
    var out = ""

    out += "<" + s.nodeName
    for (var n = 0; n < s.attributes.length; n++) {
      out +=
        " " + s.attributes[n].name + "=" + "'" + s.attributes[n].value + "'"
    }

    if (s.hasChildNodes()) {
      out += ">\n"

      for (var n = 0; n < s.childNodes.length; n++) {
        out += XMLSerializerForIE(s.childNodes[n])
      }

      out += "</" + s.nodeName + ">" + "\n"
    } else out += " />\n"

    return out
  }

  if (window.XMLSerializer) {
    return new XMLSerializer().serializeToString(svg)
  } else {
    return XMLSerializerForIE(svg)
  }
}
export async function downloadSvgAsPng(
  id: string,
  filename: string,
  theme?: string
) {
  var strokeBoxCss: string // --border
  var strokeBoxGuideCss: string // --border
  var strokeExistingPathCss: string // --muted-foreground
  var strokeCurrentPathCss: string // --foreground

  if (theme) {
    console.log(theme)
    if (theme === "dark") {
      strokeBoxCss = "217.2, 32.6%, 17.5%;"
      strokeBoxGuideCss = "217.2, 32.6%, 17.5%"
      strokeExistingPathCss = "215, 20.2%, 65.1%"
      strokeCurrentPathCss = " 210, 40%, 98%"
    } else {
      strokeBoxCss = "0, 0%, 27%"
      strokeBoxGuideCss = "0, 0%, 27%"
      strokeExistingPathCss = "215.4, 16.3%, 46.9%"
      strokeCurrentPathCss = "222.2, 84%, 4.9%"
    }
  }
  var svg = document.getElementById(id)?.cloneNode(true) as SVGElement

  var newSvgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  )
  if (!svg) return null

  var svgContent = svg.outerHTML
  var modifiedSvgContent = svgContent.replace(/kvg:/g, "")

  newSvgElement.innerHTML = modifiedSvgContent

  const _svg = newSvgElement.childNodes[0] as SVGElement

  if (!_svg) return null

  // Apply styles to the SVG elements here
  const strokeBoxElements = _svg.querySelectorAll(
    ".stroke-box"
  ) as NodeListOf<SVGLineElement>
  strokeBoxElements.forEach((element) => {
    element.setAttribute(
      "style",
      `stroke: hsl(${strokeBoxCss}); fill: none; stroke-width: 2; stroke-linecap: square;`
    )
  })

  const strokeBoxGuideElements = _svg.querySelectorAll(
    ".stroke-box-guide"
  ) as NodeListOf<SVGLineElement>
  strokeBoxGuideElements.forEach((element) => {
    element.setAttribute(
      "style",
      `stroke: hsl(${strokeBoxGuideCss}); stroke-width: 2; stroke-linecap: square; stroke-dasharray: 5, 5;`
    )
  })

  const strokeExistingPathElements = _svg.querySelectorAll(
    ".stroke-existing-path"
  ) as NodeListOf<SVGPathElement>
  strokeExistingPathElements.forEach((element) => {
    element.setAttribute(
      "style",
      `stroke: hsl(${strokeExistingPathCss}); fill: none; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round;`
    )
  })

  const strokeCurrentPathElements = _svg.querySelectorAll(
    ".stroke-current-path"
  ) as NodeListOf<SVGPathElement>
  strokeCurrentPathElements.forEach((element) => {
    element.setAttribute(
      "style",
      `stroke: hsl(${strokeCurrentPathCss}); fill: none; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round;`
    )
  })

  const strokePathStartElements = _svg.querySelectorAll(
    ".stroke-path-start"
  ) as NodeListOf<SVGPathElement>
  strokePathStartElements.forEach((element) => {
    element.setAttribute("style", "fill: rgba(255, 0, 0, 0.7); stroke: none;")
  })

  var svg_xml = XMLSerialize(_svg)

  var canvas = new OffscreenCanvas(400, 400)
  var ctx = canvas.getContext("2d") as RenderingContext2D

  const preset = presets.offscreen()

  const can = await Canvg.from(ctx, svg_xml, preset)

  await can.render()

  const blob = await canvas.convertToBlob()

  const f = new File([blob], filename + ".png", { type: "image/png" })

  return f
}
