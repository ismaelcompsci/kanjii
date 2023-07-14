import { FC } from "react"
import Image from "next/image"

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="relative h-20 w-20 ">
        <Image
          src={"/gifs/loading-5.gif"}
          alt="."
          fill
          className="object-cover"
        />
      </div>
      Comming soon...
    </div>
  )
}

export default page
