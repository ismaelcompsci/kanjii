import { FC } from "react"
import { VocabularyPack } from "@prisma/client"

import StrokeInfoPage from "../kanji/StrokeInfoPage"

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
