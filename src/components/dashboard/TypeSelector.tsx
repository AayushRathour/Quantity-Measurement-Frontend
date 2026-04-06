import { TYPE_CARDS } from '../../constants/units'
import type { MeasurementCategory } from '../../types'

interface Props {
  selected: MeasurementCategory
  onChange: (type: MeasurementCategory) => void
}

export default function TypeSelector({ selected, onChange }: Props) {
  return (
    <>
      <p className="section-label">Choose Type</p>
      <div className="types">
        {TYPE_CARDS.map((card) => (
          <div
            key={card.key}
            className={`type-card ${selected === card.key ? 'active' : ''}`}
            onClick={() => onChange(card.key)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onChange(card.key)}
          >
            <span className="type-icon">{card.icon}</span>
            <span className="type-name">{card.label}</span>
          </div>
        ))}
      </div>
    </>
  )
}
