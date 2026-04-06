import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { loadMeasurementHistory } from '../hooks/useMeasurementHistory'
import type { MeasurementHistoryEntry } from '../types'
import PageHeader from '../components/shared/PageHeader'
import { formatQuantityResult } from '../utils/resultFormatting'
import '../styles/app.css'

function formatLabel(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^[a-z]/, (letter) => letter.toUpperCase())
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function formatSummary(entry: MeasurementHistoryEntry): string {
  if (entry.action === 'comparison') {
    return `${entry.value1} ${entry.unit1} compared with ${entry.value2 ?? ''} ${entry.unit2 ?? ''}`.trim()
  }

  if (entry.action === 'conversion') {
    return `${entry.value1} ${entry.unit1} converted to ${entry.resultUnit}`
  }

  return `${entry.value1} ${entry.unit1} ${entry.operator ?? '+'} ${entry.value2 ?? ''} ${entry.unit2 ?? ''}`.trim()
}

function formatResult(entry: MeasurementHistoryEntry): string {
  const formatted = formatQuantityResult(entry.result)

  if (formatted === '—') {
    return 'No result available'
  }

  if (entry.result.resultValue !== undefined) {
    const resultUnit = entry.result.resultUnit ?? entry.resultUnit
    return `${formatted} ${resultUnit}`.trim()
  }

  return formatted
}

export default function HistoryPage() {
  const { logout } = useAuth()
  const history = loadMeasurementHistory()

  return (
    <div className="app-body">
      <div className="app-shell">
        <div className="app-panel">
          <PageHeader
            brandMark="⟲"
            brandKicker="Protected history"
            title="Previous measurements"
            subtitle="Review past calculations saved from the dashboard after login. This keeps the same visual structure while giving users a dedicated audit trail."
            actions={[
              { label: 'Home', to: '/', variant: 'secondary' },
              { label: 'Dashboard', to: '/dashboard', variant: 'secondary' },
              { label: 'Logout', onClick: logout, variant: 'primary' },
            ]}
          />

          <div className="app-content">
            <div className="section-heading">
              <div>
                <p className="section-title">Saved calculations</p>
                <p className="section-note">Newest entries appear first. Up to 50 successful results are kept per account scope.</p>
              </div>
              <Link className="app-link-button primary" to="/dashboard">
                New measurement
              </Link>
            </div>

            {history.length === 0 ? (
              <div className="hero-card empty-state">
                <h3>No history yet</h3>
                <p>
                  Run a calculation in the dashboard to populate this page. Every successful
                  measurement is stored locally so users can reopen it after login.
                </p>
                <div className="app-actions" style={{ justifyContent: 'center', marginTop: 18 }}>
                  <Link className="app-link-button primary" to="/dashboard">
                    Go to dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <div className="history-list">
                {history.map((entry) => (
                  <article className="history-card" key={entry.id}>
                    <div className="history-meta">
                      <span className="history-badge">{formatLabel(entry.selectedType)}</span>
                      <span className="history-badge">{formatLabel(entry.action)}</span>
                      <span className="history-time">{formatDate(entry.createdAt)}</span>
                    </div>
                    <p className="history-summary">{formatSummary(entry)}</p>
                    <div className="history-result">{formatResult(entry)}</div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}