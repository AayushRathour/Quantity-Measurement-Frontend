import type { ArithmeticOperator } from '../../types'

const OPERATORS: ArithmeticOperator[] = ['+', '-', '*', '/']

interface Props {
  selected: ArithmeticOperator
  onChange: (op: ArithmeticOperator) => void
}

export default function OperatorPanel({ selected, onChange }: Props) {
  return (
    <div className="operator-section">
      <div className="selected-op">{selected}</div>
      <div className="operators">
        {OPERATORS.map((op) => (
          <button
            key={op}
            type="button"
            className={`op-btn ${selected === op ? 'active' : ''}`}
            onClick={() => onChange(op)}
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  )
}
