import { FC } from "react"
import BorderText from "@/src/components/ui/BorderText"
import { Label } from "@/src/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover"
import { Info } from "lucide-react"

interface CreatePopupProps {}

const CreatePopup: FC<CreatePopupProps> = ({}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Info className="animate-pulse cursor-pointer hover:text-foreground/80" />
      </PopoverTrigger>
      <PopoverContent className="ml-32 w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Requirements</h4>
            <p className="text-sm text-muted-foreground">
              The only required field is "word".
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-16">
              <Label htmlFor="width">word</Label>
              <BorderText text="required" destructive />
            </div>
            <div className="grid grid-cols-3 items-center gap-16">
              <Label htmlFor="maxWidth">reading</Label>
              <BorderText text="optional" />
            </div>
            <div className="grid grid-cols-3 items-center gap-16">
              <Label htmlFor="height">meaning</Label>
              <BorderText text="optional" />
            </div>
            <div className="grid grid-cols-3 items-center gap-16">
              <Label htmlFor="maxHeight">sentence</Label>
              <BorderText text="optional" />
            </div>
            <div className="grid grid-cols-3 items-center gap-16">
              <Label htmlFor="maxHeight">englishSentence</Label>
              <BorderText text="optional" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default CreatePopup
