import { useRef, useState } from 'react'
import './SnapScrollCanvas.css'

const Item = ({ value }: { value: number }) => {
  return (
    <div className="snap-scroll-item">
      {value}
    </div>
  )
}

const SnapScrollCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const items = [1, 2, 3, 4, 5]
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
      aria-label={`Reels feed, item ${index + 1} of ${items.length}`}
    >
      {items.map((item) => (
        <Item key={item} value={item} />
      ))}
    </div>
  )
}

export default SnapScrollCanvas
