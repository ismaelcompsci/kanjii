import { Skeleton } from "../ui/Skeleton"

const MainKanjiSkeleton = () => {
  return (
    <div className="container h-screen p-2">
      <div className="flex flex-col p-1 md:flex-row">
        <div className="h-[100px] justify-center text-center md:h-[200px] md:w-[250px] ">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="container grid grid-cols-1 gap-8 md:grid-cols-[50%_50%] ">
          <div className="col-span-full flex h-10 items-center justify-center border-b font-semibold">
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="">
            <div className="font-extralight"></div>
            <Skeleton className="h-4 w-20" />
          </div>

          <div>
            <div className="font-extralight"></div>
            <Skeleton className="h-4 w-20" />
          </div>
          <div>
            <div className="font-extralight"></div>
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="md:col-start-2">
            <div className="font-extralight"></div>
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
      <div className="container pt-3">
        <Skeleton className="mt-4 h-24 w-full" />
        <Skeleton className="mt-4 h-24 w-full" />
        <Skeleton className="mt-4 h-24 w-full" />
        <Skeleton className="mt-4 h-24 w-full" />
      </div>
    </div>
  )
}

export default MainKanjiSkeleton
