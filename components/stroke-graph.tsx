import { KanjiDetails } from "@/types/types"

interface StrokeGraphProps {
  kanjiDetails: KanjiDetails
}

const StrokeGraph: React.FC<StrokeGraphProps> = ({ kanjiDetails }) => {
  return (
    <div className="h-49 w-49">
      {kanjiDetails.strokes.images.map((img) => (
        <img src={img} alt="stroke" width={49} height={49} />
      ))}
    </div>
  )
}

export default StrokeGraph
