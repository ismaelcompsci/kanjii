import { FC } from "react"
import JSZip from "jszip"
import { Download } from "lucide-react"
import { useTheme } from "next-themes"

import { downloadSvg } from "../lib/saveSvg"
import { Button } from "./ui/Button"

interface DownloadSvgButtonProps {
  text: string
}

const DownloadSvgButton: FC<DownloadSvgButtonProps> = ({ text }) => {
  // TODO : ADD THEME FOR PNG
  const { theme } = useTheme()

  const handleDownload = async () => {
    const zip = new JSZip()

    for (const char of text) {
      const f = await downloadSvg(char, char)

      if (!f) {
        return null
      }

      zip.file(char + ".png", f)
    }

    zip
      .generateAsync({ type: "blob" })
      .then((zipBlob) => {
        // Create a download link
        const downloadLink = document.createElement("a")
        downloadLink.href = URL.createObjectURL(zipBlob)
        downloadLink.download = text + ".zip"

        downloadLink.click()
      })
      .catch((error) => {
        console.error("Error generating zip file:", error)
      })
  }
  return (
    <Button onClick={handleDownload} variant={"destructive"}>
      <Download className="w-6 h-6 pr-1" />
      Download All
    </Button>
  )
}

export default DownloadSvgButton
