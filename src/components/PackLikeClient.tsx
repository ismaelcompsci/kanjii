"use client"

import { FC, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Like } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { Loader2, Star } from "lucide-react"

import { toast } from "../hooks/use-toast"
import { cn } from "../lib/utils"
import { LikingValidatorPayload } from "../lib/validators/LikingValidator"
import { ExtendedStudyPack } from "./StudyPacksPage"

interface PackLikeClientProps {
  currentLike: Like | undefined
  pack: ExtendedStudyPack
}

interface LikingMutation {
  vocabularyPackId: string
}

const PackLikeClient: FC<PackLikeClientProps> = ({ currentLike, pack }) => {
  const [liked, setLiked] = useState<boolean>(currentLike ? true : false)
  const [voteAmt, setVoteAmt] = useState<number>(pack.likes.length)
  const router = useRouter()

  // ensure sync with server
  useEffect(() => {
    setLiked(currentLike ? true : false)
  }, [currentLike])

  const { mutate: like, isLoading } = useMutation({
    mutationFn: async ({ vocabularyPackId }: LikingMutation) => {
      const payload: LikingValidatorPayload = {
        vocabularyPackId,
      }

      const { data } = await axios.patch("/api/studypacks/pack/like", payload)
      return data
    },
    onError: (err) => {
      if (liked) {
        setVoteAmt((prev) => prev - 1)
      } else {
        setVoteAmt((prev) => prev + 1)
      }

      setLiked((prev) => !prev)

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          router.push("/sign-in")
        }
      }

      return toast({
        title: "Something went wrong.",
        description: "Your like was not registered. Please try again.",
        variant: "destructive",
      })
    },
    onMutate: () => {
      if (liked) {
        setVoteAmt((prev) => prev - 1)
      } else {
        setVoteAmt((prev) => prev + 1)
      }

      setLiked((prev) => !prev)
    },
    onSuccess: () => {
      router.refresh()
    },
  })

  return (
    <div className="flex items-center">
      {!isLoading ? (
        <span
          onClick={() => {
            like({ vocabularyPackId: pack.id })
          }}
        >
          <Star
            className={cn(
              "mr-1 h-3 w-3 cursor-pointer",
              liked && "fill-sky-400 text-sky-400"
            )}
          />
        </span>
      ) : (
        <Loader2 className="mr-1 h-4 w-4 animate-spin" />
      )}

      {voteAmt}
    </div>
  )
}

export default PackLikeClient
