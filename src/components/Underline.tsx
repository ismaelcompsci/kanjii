import { FC } from "react"

import { cn } from "../lib/utils"

interface UnderlineProps {
  handleClick: (content: string) => void
  content: string
}

const Underline: FC<UnderlineProps> = ({ handleClick, content }) => {
  return (
    <span
      onClick={() => {
        handleClick(content)
      }}
      className={cn(
        "underline text-blue-800 cursor-pointer hover:text-primary"
      )}
    >
      {content}
    </span>
  )
}

export default Underline
