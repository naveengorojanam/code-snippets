import { useState } from 'react'
import './App.css'
import SnapScrollCanvas from './components/snap-scroll-canvas/SnapScrollCanvas'

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  return (
    <div className="app-frame app-frame--reels" data-theme={theme}>
      <header className="mode-header">
        <div className="mode-header__copy">
          <h2 className="brand-mark" aria-label="CodeReels">
            <span className="brand-mark__code">Code</span>
            <span className="brand-mark__reels">Reels</span>
          </h2>
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

      <div className="mode-content mode-content--reels">
        <section className="reels-shell">
          <SnapScrollCanvas />
        </section>
      </div>
    </div>
  )
}

export default App
