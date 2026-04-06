import { Link } from 'react-router-dom'
import { getStoredToken } from '../hooks/useAuth'
import PageHeader from '../components/shared/PageHeader'
import '../styles/app.css'

const featureCards = [
  {
    title: 'Four measurement domains',
    text: 'Length, weight, volume, and temperature with one consistent calculator workflow.',
  },
  {
    title: 'Three action modes',
    text: 'Comparison, conversion, and arithmetic operations designed for fast daily use.',
  },
  {
    title: 'Protected history page',
    text: 'After login, successful measurements are saved and listed in your previous results screen.',
  },
  {
    title: 'Public first experience',
    text: 'Users can understand the value immediately without account creation blockers.',
  },
  {
    title: 'Simple, focused dashboard',
    text: 'Quick unit selection, clear action controls, and instant output in a single view.',
  },
  {
    title: 'Responsive on all screens',
    text: 'Mobile and desktop layouts are tuned for readability and clean interaction.',
  },
]

const steps = [
  {
    title: 'Choose a measurement type',
    text: 'Pick length, weight, volume, or temperature and the app adapts instantly.',
  },
  {
    title: 'Run comparison, conversion, or math',
    text: 'Enter your values, select units, and execute the action in one click.',
  },
  {
    title: 'Review history after login',
    text: 'Successful calculations are stored and displayed in your protected history page.',
  },
]

export default function HomePage() {
  const token = getStoredToken()

  return (
    <div className="home-body">
      <div className="home-shell">
        <PageHeader
          title="Measure with confidence"
          subtitle="Quantity Measurement App gives you one consistent place for conversions, comparisons, and arithmetic."
          actions={token ? [
            { label: 'Dashboard', to: '/dashboard', variant: 'secondary' },
            { label: 'History', to: '/history', variant: 'primary' },
          ] : [
            { label: 'Login', to: '/login', variant: 'secondary' },
            { label: 'Create account', to: '/signup', variant: 'primary' },
          ]}
        />

        <header className="home-hero-card">
          <div className="home-hero-layout">
            <section className="home-hero-left">
              <p className="home-eyebrow">Public home page</p>
              <h1>Complete quantity measurement toolkit for everyday calculations.</h1>
              <p>
                This is now a proper homepage: clear product story, clear actions, and direct access to
                dashboard and history flow based on login state.
              </p>

              <div className="home-cta-row">
                <Link className="home-btn home-btn-primary" to="/dashboard">
                  Open Dashboard
                </Link>
                <Link className="home-btn home-btn-outline" to={token ? '/history' : '/login'}>
                  {token ? 'View History' : 'Sign In'}
                </Link>
              </div>

              <div className="home-pill-row">
                <span>Length</span>
                <span>Weight</span>
                <span>Volume</span>
                <span>Temperature</span>
              </div>
            </section>

            <aside className="home-preview-card">
              <p className="home-preview-title">Live flow preview</p>
              <div className="home-preview-box">
                <span>Type</span>
                <strong>Length</strong>
              </div>
              <div className="home-preview-box">
                <span>Action</span>
                <strong>Conversion</strong>
              </div>
              <div className="home-preview-result">
                <span>Example result</span>
                <strong>12 feet = 365.76 cm</strong>
              </div>
            </aside>
          </div>
        </header>

        <section className="home-section">
          <div className="home-section-head">
            <p className="home-eyebrow">Capabilities</p>
            <h2>Built like a complete product home experience</h2>
          </div>

          <div className="home-features-grid">
            {featureCards.map((card) => (
              <article className="home-feature-card" key={card.title}>
                <strong>{card.title}</strong>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section home-steps-section">
          <div className="home-section-head">
            <p className="home-eyebrow">How it works</p>
            <h2>Simple 3-step workflow</h2>
          </div>

          <div className="home-steps-grid">
            {steps.map((step, index) => (
              <article className="home-step-card" key={step.title}>
                <div className="home-step-index">0{index + 1}</div>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section home-final-cta">
          <div>
            <p className="home-eyebrow">Ready to start?</p>
            <h3>Use the dashboard now and keep your history after login.</h3>
          </div>
          <div className="home-cta-row">
            <Link className="home-btn home-btn-primary" to="/dashboard">
              Dashboard
            </Link>
            {token ? (
              <Link className="home-btn home-btn-outline" to="/history">
                History
              </Link>
            ) : (
              <Link className="home-btn home-btn-outline" to="/signup">
                Create account
              </Link>
            )}
          </div>
        </section>

      </div>
    </div>
  )
}