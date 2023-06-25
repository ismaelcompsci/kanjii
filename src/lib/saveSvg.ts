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
export async function downloadSvg(id: string, filename: string) {
  var svg = document.getElementById(id)

  var img = document.createElement("img")
  var newSvgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  )
  if (!svg) return null

  var svgContent = svg.outerHTML
  var modifiedSvgContent = svgContent.replace(/kvg:/g, "")

  newSvgElement.innerHTML = modifiedSvgContent

  const _svg = newSvgElement.childNodes[0] as SVGElement

  // Apply style to elements with class 'stroke-box'
  const strokeBoxElements = svg.querySelectorAll(
    ".stroke-box"
  ) as NodeListOf<SVGLineElement>
  strokeBoxElements.forEach((element) => {
    element.style.stroke = "hsl(217.2, 32.6%, 17.5%)"
    element.style.fill = "none"
    element.style.strokeWidth = "2"
    element.style.strokeLinecap = "square"
  })

  // Apply style to elements with class 'stroke-box-guide'
  const strokeBoxGuideElements = svg.querySelectorAll(
    ".stroke-box-guide"
  ) as NodeListOf<SVGLineElement>
  strokeBoxGuideElements.forEach((element) => {
    element.style.stroke = "hsl(217.2, 32.6%, 17.5%)"
    element.style.strokeWidth = "2"
    element.style.strokeLinecap = "square"
    element.style.strokeDasharray = "5, 5"
  })

  // Apply style to elements with class 'stroke-existing-path'
  const strokeExistingPathElements = svg.querySelectorAll(
    ".stroke-existing-path"
  ) as NodeListOf<SVGPathElement>
  strokeExistingPathElements.forEach((element) => {
    element.style.stroke = "hsl(215, 20.2%, 65.1%)"
    element.style.fill = "none"
    element.style.strokeWidth = "3"
    element.style.strokeLinecap = "round"
    element.style.strokeLinejoin = "round"
  })

  // Apply style to elements with class 'stroke-current-path.dark'
  const strokeCurrentPathDarkElements = svg.querySelectorAll(
    ".stroke-current-path.dark"
  ) as NodeListOf<SVGPathElement>
  strokeCurrentPathDarkElements.forEach((element) => {
    element.style.stroke = "hsl(210, 40%, 98%)"
    element.style.fill = "none"
    element.style.strokeWidth = "3"
    element.style.strokeLinecap = "round"
    element.style.strokeLinejoin = "round"
  })

  // Apply style to elements with class 'stroke-current-path'
  const strokeCurrentPathElements = svg.querySelectorAll(
    ".stroke-current-path"
  ) as NodeListOf<SVGPathElement>
  strokeCurrentPathElements.forEach((element) => {
    element.style.stroke = "hsl(210, 40%, 98%)"
    element.style.fill = "none"
    element.style.strokeWidth = "3"
    element.style.strokeLinecap = "round"
    element.style.strokeLinejoin = "round"
  })

  // Apply style to elements with class 'stroke-path-start'
  const strokePathStartElements = svg.querySelectorAll(
    ".stroke-path-start"
  ) as NodeListOf<SVGPathElement>
  strokePathStartElements.forEach((element) => {
    element.style.fill = "rgba(255, 0, 0, 0.7)"
    element.style.stroke = "none"
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

  // const pngUrl = URL.createObjectURL(blob)

  // img.src = pngUrl

  // // var saveImg = document.createElement("a")
  // // saveImg.href = img.src
  // // saveImg.download = "fle.png"
  // // saveImg.click()

  // return img
}
