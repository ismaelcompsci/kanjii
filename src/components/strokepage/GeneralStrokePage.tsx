import { FC } from "react"
import StrokeInfoPage from "@/src/components/kanji/StrokeInfoPage"
import { VocabularyPack } from "@prisma/client"

interface GeneralStrokePageProps {
  pack: VocabularyPack
}

const GeneralStrokePage: FC<GeneralStrokePageProps> = ({ pack }) => {
  return (
    <div>
      <StrokeInfoPage pack={pack} currentPage={0} />
    </div>
  )
}

export default GeneralStrokePage
