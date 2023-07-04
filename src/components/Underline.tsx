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
        "cursor-pointer text-blue-800 underline hover:text-primary"
      )}
    >
      {content}
    </span>
  )
}

export default Underline
