import CloseModal from "@/src/components/CloseModal"
import SignIn from "@/src/components/SignIn"

const Page = () => {
  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="bg-background relative w-full h-fit py-20 px-2 rounded-lg">
          <div className="absolute top-4 right-4">
            <CloseModal />
          </div>

          <SignIn />
        </div>
      </div>
    </div>
  )
}

export default Page