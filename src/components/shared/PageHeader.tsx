import { Link } from 'react-router-dom'

type HeaderAction = {
  label: string
  to?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
}

interface Props {
  title: string
  subtitle?: string
  brandKicker?: string
  brandMark?: string
  actions?: HeaderAction[]
  compact?: boolean
}

export default function PageHeader({
  title,
  subtitle,
  brandKicker = 'Quantity Measurement App',
  brandMark = 'QM',
  actions = [],
  compact = false,
}: Props) {
  return (
    <header className={`page-header ${compact ? 'page-header-compact' : ''}`}>
      <div className="page-header-brand">
        <div className="page-header-mark">{brandMark}</div>
        <div className="page-header-copy">
          <p className="page-header-kicker">{brandKicker}</p>
          <h1 className="page-header-title">{title}</h1>
          {subtitle ? <p className="page-header-subtitle">{subtitle}</p> : null}
        </div>
      </div>

      {actions.length > 0 ? (
        <div className="page-header-actions">
          {actions.map((action) => {
            const variant = action.variant ?? 'secondary'
            const className = `app-link-button ${variant}`

            if (action.onClick) {
              return (
                <button key={action.label} type="button" className={className} onClick={action.onClick}>
                  {action.label}
                </button>
              )
            }

            return (
              <Link key={action.label} className={className} to={action.to ?? '/'}>
                {action.label}
              </Link>
            )
          })}
        </div>
      ) : null}
    </header>
  )
}