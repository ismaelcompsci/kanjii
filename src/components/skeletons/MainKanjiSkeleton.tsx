import { Skeleton } from "../ui/Skeleton"

const MainKanjiSkeleton = () => {
  return (
    <div className="container h-screen p-2">
      <div className="p-1 flex flex-col md:flex-row">
        <div className="h-[100px] md:h-[200px] md:w-[250px] text-center justify-center ">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-[50%_50%] gap-8 ">
          <div className="col-span-full h-10 font-semibold border-b flex justify-center items-center">
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
        <Skeleton className="h-24 w-full mt-4" />
        <Skeleton className="h-24 w-full mt-4" />
        <Skeleton className="h-24 w-full mt-4" />
        <Skeleton className="h-24 w-full mt-4" />
      </div>
    </div>
  )
}

export default MainKanjiSkeleton
