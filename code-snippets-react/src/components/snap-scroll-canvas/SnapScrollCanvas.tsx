import { useEffect, useRef, useState } from 'react'
import './SnapScrollCanvas.css'
import StudyReelCard, { type StudyReelProblem } from '../study-reel-card/StudyReelCard'

const Item = ({
  problem,
  isActive,
  onCategorySelect,
}: {
  problem: StudyReelProblem
  isActive: boolean
  onCategorySelect?: (problem: StudyReelProblem) => void
}) => {
  return (
    <div className="snap-scroll-item">
      <StudyReelCard problem={problem} isActive={isActive} onCategorySelect={onCategorySelect} />
    </div>
  )
}

type SnapScrollCanvasProps = {
  problems: StudyReelProblem[]
  initialProblemId?: string
  onCategorySelect?: (problem: StudyReelProblem) => void
}

const SnapScrollCanvas = ({
  problems,
  initialProblemId,
  onCategorySelect,
}: SnapScrollCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const startingIndex = initialProblemId
      ? Math.max(
          problems.findIndex(problem => problem.uniqueId === initialProblemId),
          0,
        )
      : 0

    setIndex(startingIndex)

    const container = containerRef.current
    if (!container) return

    const nextTop = startingIndex * container.clientHeight
    container.scrollTo({ top: nextTop, behavior: 'auto' })
  }, [initialProblemId, problems])

  const handleScroll = () => {
    const container = containerRef.current
    if (!container) return

    const scrollTop = container.scrollTop
    const height = container.clientHeight

    const newIndex = Math.round(scrollTop / height)
    setIndex(newIndex)
  }

  return (
    <div
      ref={containerRef}
      className="snap-scroll-canvas"
      onScroll={handleScroll}
      aria-label={`Reels feed, item ${Math.min(index + 1, problems.length)} of ${problems.length}`}
    >
      {problems.map((item, itemIndex) => (
        <Item
          key={`${item.uniqueId}-${itemIndex === index ? 'active' : 'idle'}`}
          problem={item}
          isActive={itemIndex === index}
          onCategorySelect={onCategorySelect}
        />
      ))}
    </div>
  )
}

export default SnapScrollCanvas
