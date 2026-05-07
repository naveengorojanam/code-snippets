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
  category: string
  intuition: string
  steps: string[]
  code: string
}

const createProblem = (title: string, category: string): ProblemItem => ({
  id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-'),
  title,
  category,
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

const topicCategoryMap: Record<TopicKey, string> = {
  'Arrays & Strings': 'Arrays',
  'Sliding Window / Two Pointers': '2-Pointers',
  'Hashing / Maps / Sets': 'Hash Map',
  'Stack / Monotonic Stack': 'Stack',
  'Binary Search': 'Binary Search',
  'Linked List': 'Linked List',
  Trees: 'Trees',
  'Graphs (DFS/BFS)': 'Graph',
  'Union Find (Disjoint Set)': 'Union Find',
  'Dynamic Programming (DP)': 'DP',
  Backtracking: 'Backtracking',
  Greedy: 'Greedy',
  'Heaps / Priority Queue': 'Heap',
}

const problemLibrary: Record<TopicKey, ProblemItem[]> = {
  'Arrays & Strings': [
    twoSumProblem,
    createProblem('Best Time to Buy and Sell Stock', topicCategoryMap['Arrays & Strings']),
    createProblem('Product of Array Except Self', topicCategoryMap['Arrays & Strings']),
    createProblem('Maximum Subarray', topicCategoryMap['Arrays & Strings']),
    createProblem('Longest Substring Without Repeating Characters', topicCategoryMap['Arrays & Strings']),
    createProblem('Container With Most Water', topicCategoryMap['Arrays & Strings']),
  ],
  'Sliding Window / Two Pointers': [
    createProblem('Longest Repeating Character Replacement', topicCategoryMap['Sliding Window / Two Pointers']),
    createProblem('Minimum Window Substring', topicCategoryMap['Sliding Window / Two Pointers']),
    createProblem('3Sum', topicCategoryMap['Sliding Window / Two Pointers']),
    createProblem('Trapping Rain Water', topicCategoryMap['Sliding Window / Two Pointers']),
  ],
  'Hashing / Maps / Sets': [
    createProblem('Subarray Sum Equals K', topicCategoryMap['Hashing / Maps / Sets']),
    createProblem('Group Anagrams', topicCategoryMap['Hashing / Maps / Sets']),
    createProblem('Top K Frequent Elements', topicCategoryMap['Hashing / Maps / Sets']),
  ],
  'Stack / Monotonic Stack': [
    createProblem('Valid Parentheses', topicCategoryMap['Stack / Monotonic Stack']),
    createProblem('Daily Temperatures', topicCategoryMap['Stack / Monotonic Stack']),
    createProblem('Largest Rectangle in Histogram', topicCategoryMap['Stack / Monotonic Stack']),
  ],
  'Binary Search': [
    createProblem('Binary Search (basic)', topicCategoryMap['Binary Search']),
    createProblem('Search in Rotated Sorted Array', topicCategoryMap['Binary Search']),
    createProblem('Find Peak Element', topicCategoryMap['Binary Search']),
    createProblem('Median of Two Sorted Arrays (hard, but asked)', topicCategoryMap['Binary Search']),
  ],
  'Linked List': [
    createProblem('Reverse Linked List', topicCategoryMap['Linked List']),
    createProblem('Detect Cycle', topicCategoryMap['Linked List']),
    createProblem('Merge Two Sorted Lists', topicCategoryMap['Linked List']),
    createProblem('LRU Cache ⭐ (VERY IMPORTANT)', topicCategoryMap['Linked List']),
  ],
  Trees: [
    createProblem('Maximum Depth of Binary Tree', topicCategoryMap.Trees),
    createProblem('Validate Binary Search Tree', topicCategoryMap.Trees),
    createProblem('Lowest Common Ancestor', topicCategoryMap.Trees),
    createProblem('Binary Tree Level Order Traversal', topicCategoryMap.Trees),
    createProblem('Diameter of Binary Tree', topicCategoryMap.Trees),
  ],
  'Graphs (DFS/BFS)': [
    createProblem('Number of Islands ⭐', topicCategoryMap['Graphs (DFS/BFS)']),
    createProblem('Clone Graph', topicCategoryMap['Graphs (DFS/BFS)']),
    createProblem('Course Schedule ⭐', topicCategoryMap['Graphs (DFS/BFS)']),
    createProblem('Pacific Atlantic Water Flow', topicCategoryMap['Graphs (DFS/BFS)']),
  ],
  'Union Find (Disjoint Set)': [
    createProblem('Number of Connected Components', topicCategoryMap['Union Find (Disjoint Set)']),
    createProblem('Accounts Merge', topicCategoryMap['Union Find (Disjoint Set)']),
    createProblem('Redundant Connection', topicCategoryMap['Union Find (Disjoint Set)']),
  ],
  'Dynamic Programming (DP)': [
    createProblem('Climbing Stairs', topicCategoryMap['Dynamic Programming (DP)']),
    createProblem('House Robber', topicCategoryMap['Dynamic Programming (DP)']),
    createProblem('Longest Increasing Subsequence', topicCategoryMap['Dynamic Programming (DP)']),
    createProblem('Coin Change ⭐', topicCategoryMap['Dynamic Programming (DP)']),
    createProblem('Longest Common Subsequence', topicCategoryMap['Dynamic Programming (DP)']),
    createProblem('Edit Distance', topicCategoryMap['Dynamic Programming (DP)']),
  ],
  Backtracking: [
    createProblem('Subsets', topicCategoryMap.Backtracking),
    createProblem('Permutations', topicCategoryMap.Backtracking),
    createProblem('Combination Sum', topicCategoryMap.Backtracking),
    createProblem('N-Queens', topicCategoryMap.Backtracking),
  ],
  Greedy: [
    createProblem('Jump Game', topicCategoryMap.Greedy),
    createProblem('Gas Station', topicCategoryMap.Greedy),
    createProblem('Merge Intervals', topicCategoryMap.Greedy),
  ],
  'Heaps / Priority Queue': [
    createProblem('Kth Largest Element', topicCategoryMap['Heaps / Priority Queue']),
    createProblem('Merge K Sorted Lists', topicCategoryMap['Heaps / Priority Queue']),
    createProblem('Top K Frequent Elements', topicCategoryMap['Heaps / Priority Queue']),
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
                  <span className="problem-item__title">{problem.title}</span>
                  <span className="problem-item__category">{problem.category}</span>
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
              <p className="problem-category">{activeProblem.category}</p>
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
