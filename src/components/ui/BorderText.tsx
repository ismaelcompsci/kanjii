import React, { FC } from "react"
import { cn } from "@/src/lib/utils"

interface BorderTextProps {
  text: string
  destructive?: boolean
}

const BorderText: FC<BorderTextProps> = ({ text, destructive }) => {
  return (
    <div
      className={cn(
        "col-span-2 flex h-10 w-full rounded-md border  bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground",
        destructive
          ? "animate-pulse border-[#adfa1d] shadow-sm shadow-[#adfa1d]"
          : "border-input"
      )}
    >
      {text}
    </div>
  )
}

export default BorderText
