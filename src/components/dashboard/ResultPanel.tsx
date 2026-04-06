import type { QuantityMeasurementDTO } from '../../types'
import { formatQuantityResult, shouldShowUnitSelector } from '../../utils/resultFormatting'

interface Props {
  result: QuantityMeasurementDTO | null
  resultUnit: string
  unitOptions: string[]
  onResultUnitChange: (u: string) => void
}

export default function ResultPanel({
  result,
  resultUnit,
  unitOptions,
  onResultUnitChange,
}: Props) {
  const displayUnit = result?.resultUnit
    ? result.resultUnit.toLowerCase()
    : resultUnit

  return (
    <div className="result-box">
      <div className="result-left">
        <p>Result</p>
        <h2 className="result-value">
          {result ? formatQuantityResult(result) : '0'}
        </h2>
      </div>

      {/* Hide unit dropdown for comparison (result is text) */}
      {shouldShowUnitSelector(result) && (
        <select
          value={displayUnit}
          onChange={(e) => onResultUnitChange(e.target.value)}
        >
          {unitOptions.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
