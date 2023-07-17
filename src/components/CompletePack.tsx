import { FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "@/src/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/Card"
import { cn } from "@/src/lib/utils"
import { ArrowLeft } from "lucide-react"

interface CompletePackProps {}

const CompletePack: FC<CompletePackProps> = ({}) => {
  return (
    <div className="flex h-[calc(100vh-74px)] items-center justify-center">
      <Card className="h-full w-full md:h-min md:w-[400px]">
        <CardHeader className="text-center text-xl font-semibold">
          You Completed the Study Pack!
          <CardDescription>Congratulations!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center ">
            <Link
              href="/"
              className={cn(
                "hover:animate-pulse",
                buttonVariants({ variant: "link" })
              )}
            >
              <ArrowLeft className="mr-2 h-4 w-4 " />
              Home
            </Link>
          </div>
        </CardContent>
        <CardFooter>
          <div className="absolute bottom-0 h-28 w-28 md:left-2">
            <Image
              src={"/gifs/loading.gif"}
              alt="."
              fill
              className="object-cover"
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CompletePack
