import { useEffect, useMemo, useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import './StudyReelCard.css'

export type StudyReelProblem = {
  uniqueId: string
  id: string
  title: string
  category: {
    short: string
    label: string
  }
  intuition: string
  answer: string
}

type StudyReelCardProps = {
  problem: StudyReelProblem
  isActive: boolean
}

const REVEAL_DELAY_MS = 220

const StudyReelCard = ({ problem, isActive }: StudyReelCardProps) => {
  const [visibleCount, setVisibleCount] = useState(0)
  const [isCodeOpen, setIsCodeOpen] = useState(false)

  const blocks = useMemo(
    () => [
      { key: 'title', label: 'Problem', content: problem.title, kind: 'text' as const },
      { key: 'intuition', label: 'Intuition', content: problem.intuition, kind: 'text' as const },
    ],
    [problem.intuition, problem.title],
  )

  useEffect(() => {
    if (!isActive) {
      return
    }

    const timers = blocks.map((_, index) =>
      window.setTimeout(() => {
        setVisibleCount(index + 1)
      }, index * REVEAL_DELAY_MS),
    )

    return () => {
      timers.forEach(timer => window.clearTimeout(timer))
    }
  }, [blocks, isActive])

  return (
    <article className="study-reel-card" aria-label={problem.title}>
      <div className="study-reel-card__inner">
        {blocks.map((block, index) => {
          const isVisible = index < visibleCount

          return (
            <section
              key={block.key}
              className={`study-reel-block ${isVisible ? 'is-visible' : ''}`}
            >
              <p className="study-reel-block__label">{block.label}</p>
              <p className="study-reel-block__content">{block.content}</p>
            </section>
          )
        })}

        <footer className={`study-reel-footer ${visibleCount >= blocks.length ? 'is-visible' : ''}`}>
          <div className="study-reel-category" aria-label={`Category ${problem.category.label}`}>
            <span className="study-reel-category__badge">{problem.category.short}</span>
            <p className="study-reel-category__label">{problem.category.label}</p>
          </div>

          <button
            type="button"
            className="study-reel-code-action"
            aria-label={`Open code for ${problem.title}`}
            onClick={() => setIsCodeOpen(true)}
          >
            <span className="study-reel-code-action__icon">{'</>'}</span>
            <span className="study-reel-code-action__label">Code</span>
          </button>
        </footer>
      </div>

      {isCodeOpen && (
        <div className="study-reel-modal" role="dialog" aria-modal="true" aria-label={`${problem.title} code`}>
          <button
            type="button"
            className="study-reel-modal__backdrop"
            aria-label="Close code popup"
            onClick={() => setIsCodeOpen(false)}
          />
          <div className="study-reel-modal__frame">
            <div className="study-reel-modal__card">
              <div className="study-reel-modal__header">
                <div>
                  <p className="study-reel-block__label">Code</p>
                  <h3 className="study-reel-modal__title">{problem.title}</h3>
                </div>
                <button
                  type="button"
                  className="study-reel-modal__close"
                  aria-label="Close code popup"
                  onClick={() => setIsCodeOpen(false)}
                >
                  ×
                </button>
              </div>

              <Highlight theme={themes.nightOwl} code={problem.answer} language="cpp">
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre className={`study-reel-code ${className}`} style={style}>
                    {tokens.map((line, lineIndex) => (
                      <div key={lineIndex} {...getLineProps({ line, key: lineIndex })}>
                        {line.map((token, tokenIndex) => (
                          <span key={tokenIndex} {...getTokenProps({ token, key: tokenIndex })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

export default StudyReelCard
