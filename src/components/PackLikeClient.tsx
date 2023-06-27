"use client"

import { FC, useEffect, useState } from "react"
import { Like } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { Star } from "lucide-react"

import { useCustomToasts } from "../hooks/use-custom-toasts"
import { toast } from "../hooks/use-toast"
import { LikingValidatorPayload } from "../lib/validators/LikingValidator"
import { ExtendedStudyPack } from "./StudyPacksPage"

interface PackLikeClientProps {
  currentVote: Like | undefined
  pack: ExtendedStudyPack
}

interface LikingMutation {
  vocabularyPackId: string
}

// TODO: DONT ALLOW UNAUTH USERS FROM  CLICKING LIKE
const PackLikeClient: FC<PackLikeClientProps> = ({ currentVote, pack }) => {
  const [liked, setLiked] = useState<boolean>(currentVote ? true : false)
  const [voteAmt, setVoteAmt] = useState<number>(pack.likes.length)

  const { loginToast } = useCustomToasts()

  // ensure sync with server
  useEffect(() => {
    setLiked(currentVote ? true : false)
  }, [currentVote])

  const { mutate: like } = useMutation({
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
          return loginToast()
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
  })

  return (
    <div className="flex items-center">
      {liked ? (
        <span onClick={() => like({ vocabularyPackId: pack.id })}>
          <Star className="mr-1 h-3 w-3 cursor-pointer fill-sky-400 text-sky-400" />
        </span>
      ) : (
        <span onClick={() => like({ vocabularyPackId: pack.id })}>
          <Star className="mr-1 h-3 w-3 cursor-pointer" />
        </span>
      )}

      {voteAmt}
    </div>
  )
}

export default PackLikeClient
