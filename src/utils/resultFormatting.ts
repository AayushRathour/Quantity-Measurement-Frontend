import type { QuantityMeasurementDTO } from '../types'

export function isComparisonResult(resultString: QuantityMeasurementDTO['resultString']): resultString is string {
  return typeof resultString === 'string'
}

export function formatQuantityResult(result: QuantityMeasurementDTO): string {
  if (isComparisonResult(result.resultString)) {
    return result.resultString === 'true' ? 'Equal' : 'Not Equal'
  }

  if (result.resultValue !== undefined) {
    return String(result.resultValue)
  }

  return '—'
}

export function shouldShowUnitSelector(result: QuantityMeasurementDTO | null): boolean {
  return !result || !isComparisonResult(result.resultString)
}