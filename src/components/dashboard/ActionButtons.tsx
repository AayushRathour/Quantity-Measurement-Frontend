import type { ActionType } from '../../types'

const ACTIONS: { key: ActionType; label: string }[] = [
  { key: 'comparison', label: 'Comparison' },
  { key: 'conversion', label: 'Conversion' },
  { key: 'arithmetic', label: 'Arithmetic' },
]

interface Props {
  selected: ActionType
  onChange: (action: ActionType) => void
}

export default function ActionButtons({ selected, onChange }: Props) {
  return (
    <>
      <p className="section-label">Choose Action</p>
      <div className="actions">
        {ACTIONS.map((a) => (
          <button
            key={a.key}
            type="button"
            className={`action-btn ${selected === a.key ? 'active' : ''}`}
            onClick={() => onChange(a.key)}
          >
            {a.label}
          </button>
        ))}
      </div>
    </>
  )
}
