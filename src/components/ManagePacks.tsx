"use client"

import { FC } from "react"
import { useRouter } from "next/navigation"
import { VocabularyPack } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Edit, Trash } from "lucide-react"

import { Button } from "./ui/Button"

interface ManagePacksProps {
  pack: VocabularyPack
}
// TODO: ADD TOAST ON SUCCESS
const ManagePacks: FC<ManagePacksProps> = ({ pack }) => {
  const router = useRouter()

  const { mutate: deletePack, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: { packId: string } = {
        packId: pack.id,
      }
      const { data } = await axios.post("/api/studypacks/pack", payload)
      return data
    },
    onSuccess: () => {
      router.refresh()
    },
  })

  return (
    <>
      {/* <Button
        variant="default"
        size="sm"
        className="relative"
        onClick={() => router.push(`/dashboard/manage/${pack.id}`)}
      >
        <Edit className="mr-1 h-4 w-4" />
        Edit
      </Button> */}
      <Button
        variant="destructive"
        size="sm"
        className="relative"
        onClick={() => deletePack()}
        isLoading={isLoading}
        disabled={isLoading}
      >
        <Trash className="mr-1 h-4 w-4" />
        Delete
      </Button>
    </>
  )
}

export default ManagePacks
