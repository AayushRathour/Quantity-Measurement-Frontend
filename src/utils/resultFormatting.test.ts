import { describe, expect, it } from 'vitest'
import { formatQuantityResult, shouldShowUnitSelector } from './resultFormatting'
import type { QuantityMeasurementDTO } from '../types'

describe('result formatting', () => {
  it('formats conversion results as numeric values', () => {
    const conversionResult: QuantityMeasurementDTO = {
      resultValue: 144,
      resultUnit: 'inch',
      resultString: null,
    }

    expect(formatQuantityResult(conversionResult)).toBe('144')
    expect(shouldShowUnitSelector(conversionResult)).toBe(true)
  })

  it('formats comparison results as text', () => {
    const comparisonResult: QuantityMeasurementDTO = {
      resultString: 'true',
    }

    expect(formatQuantityResult(comparisonResult)).toBe('Equal')
    expect(shouldShowUnitSelector(comparisonResult)).toBe(false)
  })
})