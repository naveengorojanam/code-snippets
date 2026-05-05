import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import './App.css'
import { twoSumProblem } from './code-blocks/array/twosum'
import SnapScrollCanvas from './components/snap-scroll-canvas/SnapScrollCanvas'

const topics = [
  'Arrays & Strings',
  'Sliding Window / Two Pointers',
  'Hashing / Maps / Sets',
  'Stack / Monotonic Stack',
  'Binary Search',
  'Linked List',
  'Trees',
  'Graphs (DFS/BFS)',
  'Union Find (Disjoint Set)',
  'Dynamic Programming (DP)',
  'Backtracking',
  'Greedy',
  'Heaps / Priority Queue',
] as const

type TopicKey = (typeof topics)[number]

type ProblemItem = {
  id: string
  title: string
  intuition: string
  steps: string[]
  code: string
}

const createProblem = (title: string): ProblemItem => ({
  id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-'),
  title,
  intuition: `Understand the pattern for ${title}. Focus on the data structure and edge cases for this problem.`,
  steps: [
    'Identify the core problem pattern and required data structure.',
    'Plan the optimal traversal or state update strategy.',
    'Implement the solution and verify with sample inputs.',
  ],
  code: `function solution(input: any): any {
  // TODO: implement ${title}
  return null;
}
`,
})

const problemLibrary: Record<TopicKey, ProblemItem[]> = {
  'Arrays & Strings': [
    twoSumProblem,
    createProblem('Best Time to Buy and Sell Stock'),
    createProblem('Product of Array Except Self'),
    createProblem('Maximum Subarray'),
    createProblem('Longest Substring Without Repeating Characters'),
    createProblem('Container With Most Water'),
  ],
  'Sliding Window / Two Pointers': [
    createProblem('Longest Repeating Character Replacement'),
    createProblem('Minimum Window Substring'),
    createProblem('3Sum'),
    createProblem('Trapping Rain Water'),
  ],
  'Hashing / Maps / Sets': [
    createProblem('Subarray Sum Equals K'),
    createProblem('Group Anagrams'),
    createProblem('Top K Frequent Elements'),
  ],
  'Stack / Monotonic Stack': [
    createProblem('Valid Parentheses'),
    createProblem('Daily Temperatures'),
    createProblem('Largest Rectangle in Histogram'),
  ],
  'Binary Search': [
    createProblem('Binary Search (basic)'),
    createProblem('Search in Rotated Sorted Array'),
    createProblem('Find Peak Element'),
    createProblem('Median of Two Sorted Arrays (hard, but asked)'),
  ],
  'Linked List': [
    createProblem('Reverse Linked List'),
    createProblem('Detect Cycle'),
    createProblem('Merge Two Sorted Lists'),
    createProblem('LRU Cache ⭐ (VERY IMPORTANT)'),
  ],
  Trees: [
    createProblem('Maximum Depth of Binary Tree'),
    createProblem('Validate Binary Search Tree'),
    createProblem('Lowest Common Ancestor'),
    createProblem('Binary Tree Level Order Traversal'),
    createProblem('Diameter of Binary Tree'),
  ],
  'Graphs (DFS/BFS)': [
    createProblem('Number of Islands ⭐'),
    createProblem('Clone Graph'),
    createProblem('Course Schedule ⭐'),
    createProblem('Pacific Atlantic Water Flow'),
  ],
  'Union Find (Disjoint Set)': [
    createProblem('Number of Connected Components'),
    createProblem('Accounts Merge'),
    createProblem('Redundant Connection'),
  ],
  'Dynamic Programming (DP)': [
    createProblem('Climbing Stairs'),
    createProblem('House Robber'),
    createProblem('Longest Increasing Subsequence'),
    createProblem('Coin Change ⭐'),
    createProblem('Longest Common Subsequence'),
    createProblem('Edit Distance'),
  ],
  Backtracking: [
    createProblem('Subsets'),
    createProblem('Permutations'),
    createProblem('Combination Sum'),
    createProblem('N-Queens'),
  ],
  Greedy: [
    createProblem('Jump Game'),
    createProblem('Gas Station'),
    createProblem('Merge Intervals'),
  ],
  'Heaps / Priority Queue': [
    createProblem('Kth Largest Element'),
    createProblem('Merge K Sorted Lists'),
    createProblem('Top K Frequent Elements'),
  ],
}

function App() {
  const [mode, setMode] = useState<'reels' | 'traditional'>('reels')
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

  const traditionalContent = (
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
                <Highlight theme={themes.nightOwl} code={activeProblem.code} language="tsx">
                  {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={`code-block ${className}`} style={style}>
                      {tokens.map((line, index) => (
                        <div key={index} {...getLineProps({ line, key: index })}>
                          {line.map((token, tokenIndex) => (
                            <span key={tokenIndex} {...getTokenProps({ token, key: tokenIndex })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )

  return (
    <div className={`app-frame ${mode === 'reels' ? 'app-frame--reels' : ''}`}>
      <header className="mode-header">
        <div className="mode-header__copy">
          <h2 className="brand-mark" aria-label="CodeReels">
            <span className="brand-mark__code">Code</span>
            <span className="brand-mark__reels">Reels</span>
          </h2>
        </div>

        <div className="mode-switch" role="tablist" aria-label="Choose interface mode">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'reels'}
            className={`mode-switch__button ${mode === 'reels' ? 'active' : ''}`}
            onClick={() => setMode('reels')}
          >
            Reels
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'traditional'}
            className={`mode-switch__button ${mode === 'traditional' ? 'active' : ''}`}
            onClick={() => setMode('traditional')}
          >
            Traditional UI
          </button>
        </div>
      </header>

      <div className={`mode-content ${mode === 'reels' ? 'mode-content--reels' : ''}`}>
        {mode === 'reels' ? (
          <section className="reels-shell">
            <SnapScrollCanvas />
          </section>
        ) : (
          traditionalContent
        )}
      </div>
    </div>
  )
}

export default App
