import { useRef, useState } from 'react'
import './SnapScrollCanvas.css'
import StudyReelCard, { type StudyReelProblem } from '../study-reel-card/StudyReelCard'
import { studyReelProblems } from '../../data/studyReelProblems'

const Item = ({ problem, isActive }: { problem: StudyReelProblem; isActive: boolean }) => {
  return (
    <div className="snap-scroll-item">
      <StudyReelCard problem={problem} isActive={isActive} />
    </div>
  )
}

const SnapScrollCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

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
      aria-label={`Reels feed, item ${index + 1} of ${studyReelProblems.length}`}
    >
      {studyReelProblems.map((item, itemIndex) => (
        <Item
          key={`${item.uniqueId}-${itemIndex === index ? 'active' : 'idle'}`}
          problem={item}
          isActive={itemIndex === index}
        />
      ))}
    </div>
  )
}

export default SnapScrollCanvas
