import { useState } from 'react'
import './App.css'
import { findMinProblem } from './code-blocks/array/findmin'

const topics = ['arrays', 'stack', 'dp', 'binary search', 'trees', 'graphs', 'math'] as const

type TopicKey = (typeof topics)[number]

type ProblemItem = {
  id: string
  title: string
  intuition: string
  steps: string[]
  code: string
}

const problemLibrary: Record<TopicKey, ProblemItem[]> = {
  arrays: [findMinProblem],
  stack: [],
  dp: [],
  'binary search': [],
  trees: [],
  graphs: [],
  math: [],
}

function App() {
  const [selectedTopic, setSelectedTopic] = useState<TopicKey | null>(null)
  const [activeProblemId, setActiveProblemId] = useState<string | null>(null)
  const [activePanel, setActivePanel] = useState<'intuition' | 'code'>('intuition')

  const selectedProblems = selectedTopic ? problemLibrary[selectedTopic] ?? [] : []
  const activeProblem = selectedProblems.find(problem => problem.id === activeProblemId) || null

  const handleTopicSelect = (topic: TopicKey) => {
    setSelectedTopic(topic)
    setActiveProblemId(null)
  }

  const handleProblemOpen = (problemId: string) => {
    setActiveProblemId(problemId)
    setActivePanel('intuition')
  }

  const handleCloseProblem = () => {
    setActiveProblemId(null)
    setActivePanel('intuition')
  }

  return (
    <main className="app-shell">
      <section className="welcome-panel">
        <h1>Welcome</h1>
        <p className="subtitle">Pick a topic and explore a problem with intuition and code.</p>
        <p className="author">by Naveen Gorojanam</p>
      </section>

      {!selectedTopic ? (
        <section className="grid-layout">
          {topics.map(topic => (
            <button
              key={topic}
              className="grid-card card-button"
              type="button"
              onClick={() => handleTopicSelect(topic)}
            >
              {topic}
            </button>
          ))}
        </section>
      ) : (
        <section className="topic-shell">
          <div className="topic-header">
            <button className="back-button" type="button" onClick={() => setSelectedTopic(null)}>
              ← Back
            </button>
            <h2>{selectedTopic}</h2>
          </div>

          {selectedProblems.length ? (
            <div className="problem-list">
              {selectedProblems.map(problem => (
                <button
                  key={problem.id}
                  className="problem-item"
                  type="button"
                  onClick={() => handleProblemOpen(problem.id)}
                >
                  {problem.title}
                </button>
              ))}
            </div>
          ) : (
            <p className="empty-state">No problems available yet for this topic.</p>
          )}
        </section>
      )}

      {activeProblem && (
        <div className="problem-modal">
          <div className="problem-card">
            <button className="close-button" type="button" onClick={handleCloseProblem}>
              ×
            </button>
            <div className="problem-top">
              <h2>{activeProblem.title}</h2>
              <p className="problem-hint">
                {activePanel === 'intuition'
                  ? 'View the implementation in the Code tab'
                  : 'Learn the approach in the Intuition tab'}
              </p>
              <div className="panel-toggle">
                <button
                  type="button"
                  className={`panel-button ${activePanel === 'intuition' ? 'active' : ''}`}
                  onClick={() => setActivePanel('intuition')}
                >
                  Intuition
                </button>
                <button
                  type="button"
                  className={`panel-button ${activePanel === 'code' ? 'active' : ''}`}
                  onClick={() => setActivePanel('code')}
                >
                  Code
                </button>
              </div>
            </div>

            <div className="problem-content">
              {activePanel === 'intuition' ? (
                <div className="problem-intuition">
                  <p>{activeProblem.intuition}</p>
                  <ul>
                    {activeProblem.steps.map(step => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <pre className="code-block">
                  <code>{activeProblem.code}</code>
                </pre>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
