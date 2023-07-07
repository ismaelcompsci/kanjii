import { FC } from "react"
import { Separator } from "@/src/components/ui/separator"

interface CreateLayoutProps {
  children: React.ReactNode
}

// const sidebarNavItems = [
//   {
//     title: "Pack",
//     href: "/create",
//   },
//   {
//     title: "Vocabulary",
//     href: "/create/vocabulary",
//   },
// ]

const CreateLayout: FC<CreateLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            Create a Vocabulary pack
          </h2>
          <p className="text-muted-foreground">
            Create a vocabulary pack and the associated vocabulary words.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  )
}

export default CreateLayout
