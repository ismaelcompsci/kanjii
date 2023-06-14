"use client"

import StrokeGraph from "./stroke-graph"

interface SearchResultsProps {
  text: string
}

const SearchResults: React.FC<SearchResultsProps> = ({ text }) => {
  return (
    <div className="w-full relative float-left">
      <h2>Stroke Order</h2>
      {text.split("").map((k, index) => (
        <div key={index}>
          <h3>{k}</h3>
          <StrokeGraph kanji={k} />
        </div>
      ))}
    </div>
  )
}

export default SearchResults
