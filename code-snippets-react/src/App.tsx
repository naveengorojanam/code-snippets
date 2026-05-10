import { useState } from 'react'
import './App.css'
import SnapScrollCanvas from './components/snap-scroll-canvas/SnapScrollCanvas'
import { studyReelProblems } from './data/studyReelProblems'
import type { StudyReelProblem } from './components/study-reel-card/StudyReelCard'

type TopicReelState = {
  slug: string
  initialProblemId: string
}

const topicDescriptions: Record<string, string> = {
  'hash-map':
    'Hash Map problems are all about fast lookup. Reach for this pattern when you need to remember what you have seen, count frequencies, or match complements in one pass.',
  arrays:
    'Array problems usually reward clean scans, careful indices, and strong intuition about prefixes, windows, and in-place updates.',
  stack:
    'Stack problems shine when the latest unfinished item matters most, like matching brackets, monotonic structure, or undo-style processing.',
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [activeProfileSlug, setActiveProfileSlug] = useState<string | null>(null)
  const [topicReelView, setTopicReelView] = useState<TopicReelState | null>(null)
  const [mainFeedProblemId, setMainFeedProblemId] = useState(studyReelProblems[0]?.uniqueId ?? '')

  const profileProblems = activeProfileSlug
    ? studyReelProblems.filter(problem => problem.category.slug === activeProfileSlug)
    : []

  const reelProblems = topicReelView
    ? studyReelProblems.filter(problem => problem.category.slug === topicReelView.slug)
    : studyReelProblems

  const activeProfile = profileProblems[0]?.category ?? null
  const isProfileMode = activeProfileSlug !== null && topicReelView === null
  const isTopicReelMode = topicReelView !== null

  const handleTopicOpen = (problem: StudyReelProblem) => {
    setMainFeedProblemId(problem.uniqueId)
    setTopicReelView(null)
    setActiveProfileSlug(problem.category.slug)
  }

  const handleProfileReelOpen = (problem: StudyReelProblem) => {
    setTopicReelView({
      slug: problem.category.slug,
      initialProblemId: problem.uniqueId,
    })
  }

  return (
    <div
      className={`app-frame ${isProfileMode ? 'app-frame--profile' : 'app-frame--reels'}`}
      data-theme={theme}
    >
      <header className="mode-header">
        <div className="mode-header__copy mode-header__copy--stacked">
          <h2 className="brand-mark" aria-label="CodeReels">
            <span className="brand-mark__code">Code</span>
            <span className="brand-mark__reels">Reels</span>
          </h2>
          <p className="mode-header__subtitle">
            {isTopicReelMode
              ? `${reelProblems[0]?.category.label ?? 'Topic'} reels`
              : activeProfile
                ? `${activeProfile.label} profile`
              : 'Browse every topic in the main reels feed'}
          </p>
        </div>

        <div className="mode-switch" role="tablist" aria-label="Choose color theme">
          <button
            type="button"
            role="tab"
            aria-selected={theme === 'dark'}
            className={`mode-switch__button ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => setTheme('dark')}
          >
            Dark
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={theme === 'light'}
            className={`mode-switch__button ${theme === 'light' ? 'active' : ''}`}
            onClick={() => setTheme('light')}
          >
            Light
          </button>
        </div>
      </header>

      <div className={`mode-content ${isProfileMode ? 'mode-content--profile' : 'mode-content--reels'}`}>
        {isTopicReelMode && reelProblems[0]?.category && (
          <section className="topic-profile-banner" aria-label={`${reelProblems[0].category.label} reels`}>
            <button
              type="button"
              className="topic-profile-banner__back"
              onClick={() => {
                setTopicReelView(null)
              }}
            >
              <span className="topic-profile-banner__back-icon" aria-hidden="true">
                ←
              </span>
              <span>Back to profile</span>
            </button>
            <div className="topic-profile-banner__copy">
              <span className="topic-profile-banner__badge">{reelProblems[0].category.short}</span>
              <div>
                <h3 className="topic-profile-banner__title">{reelProblems[0].category.label}</h3>
                <p className="topic-profile-banner__meta">
                  {reelProblems.length} reel{reelProblems.length === 1 ? '' : 's'} in this topic
                </p>
              </div>
            </div>
          </section>
        )}

        {isProfileMode && activeProfile ? (
          <section className="topic-profile-page" aria-label={`${activeProfile.label} profile`}>
            <div className="topic-profile-hero">
              <button
                type="button"
                className="topic-profile-banner__back"
                onClick={() => setActiveProfileSlug(null)}
              >
                <span className="topic-profile-banner__back-icon" aria-hidden="true">
                  ←
                </span>
                <span>Back to all reels</span>
              </button>

              <div className="topic-profile-hero__main">
                <span className="topic-profile-hero__icon">{activeProfile.short}</span>
                <div className="topic-profile-hero__copy">
                  <h1 className="topic-profile-hero__title">{activeProfile.label}</h1>
                  <p className="topic-profile-hero__meta">
                    {profileProblems.length} reel{profileProblems.length === 1 ? '' : 's'}
                  </p>
                  <p className="topic-profile-hero__description">
                    {topicDescriptions[activeProfile.slug] ??
                      'Explore a focused set of reels for this topic, then jump into a vertical reel feed from any card below.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="topic-profile-grid" role="list" aria-label={`${activeProfile.label} reels`}>
              {profileProblems.map(problem => (
                <button
                  key={problem.uniqueId}
                  type="button"
                  className="topic-profile-tile"
                  onClick={() => handleProfileReelOpen(problem)}
                >
                  <span className="topic-profile-tile__badge">{problem.category.short}</span>
                  <h3 className="topic-profile-tile__title">{problem.title}</h3>
                  <p className="topic-profile-tile__statement">{problem.statement}</p>
                  <span className="topic-profile-tile__cta">Open reels</span>
                </button>
              ))}
            </div>
          </section>
        ) : (
          <section className="reels-shell">
            <SnapScrollCanvas
              problems={reelProblems}
              initialProblemId={topicReelView?.initialProblemId ?? mainFeedProblemId}
              onCategorySelect={handleTopicOpen}
            />
          </section>
        )}
      </div>
    </div>
  )
}

export default App
