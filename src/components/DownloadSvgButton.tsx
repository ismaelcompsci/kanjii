import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import JSZip from "jszip"
import { Download } from "lucide-react"
import { useSession } from "next-auth/react"
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

interface DownloadSvgButtonProps {
  text: string
}

const DownloadSvgButton: FC<DownloadSvgButtonProps> = ({ text }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { data: session } = useSession()
  const { theme } = useTheme()

  const router = useRouter()

  const handleDownload = async (type: string) => {
    if (!session) {
      return router.push("/sign-in")
    }

    setIsLoading(true)
    const zip = new JSZip()

    for (const char of text) {
      const f = await downloadSvgAsPng(char, char, type, theme)

      if (!f) {
        return null
      }

      if (type === "SVG") {
        zip.file(char + ".svg", f)

        continue
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
          setIsLoading(false)
        })
        .catch((error) => {
          console.error("Error generating zip file:", error)
        })
    }, 100)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          isLoading={isLoading}
          className="items-center"
          variant={"outline"}
        >
          {!isLoading && <Download className="w-5 h-5 pr-1" />}
          Download All
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Export as</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup>
          <DropdownMenuRadioItem
            onClick={() => handleDownload("PNG")}
            value="PNG"
          >
            PNG
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => handleDownload("SVG")}
            value="SVG"
          >
            SVG
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DownloadSvgButton
