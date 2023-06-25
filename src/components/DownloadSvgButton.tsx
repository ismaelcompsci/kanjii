import { FC } from "react"
import JSZip from "jszip"
import { Download } from "lucide-react"
import { useTheme } from "next-themes"

import { downloadSvgAsPng } from "../lib/saveSvg"
import { Button } from "./ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

interface DownloadSvgButtonProps {
  text: string
}

const DownloadSvgButton: FC<DownloadSvgButtonProps> = ({ text }) => {
  // TODO : ADD LOADING
  const { theme } = useTheme()

  const handleDownload = async () => {
    const zip = new JSZip()

    for (const char of text) {
      const f = await downloadSvgAsPng(char, char, theme)

      if (!f) {
        return null
      }

      zip.file(char + ".png", f)
    }
    setTimeout(() => {
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
    }, 100)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button onClick={() => {}} variant={"destructive"}>
          <Download className="w-6 h-6 pr-1" />
          Download All
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Export as</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup>
          <DropdownMenuRadioItem onClick={handleDownload} value="PNG">
            PNG
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="SVG">SVG</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DownloadSvgButton
