import { useState, useCallback } from 'react'
import { performQuantityOperation } from '../api/quantityApi'
import { UNIT_MAPS, MEASUREMENT_TYPE_MAP, UNIT_OPTIONS } from '../constants/units'
import { addMeasurementHistoryEntry } from './useMeasurementHistory'
import type {
  MeasurementCategory,
  ActionType,
  ArithmeticOperator,
  QuantityDTO,
  QuantityInputDTO,
  QuantityMeasurementDTO,
} from '../types'

export function useQuantity() {
  const [selectedType, setSelectedType] = useState<MeasurementCategory>('length')
  const [action, setAction] = useState<ActionType>('arithmetic')
  const [value1, setValue1] = useState<string>('1')
  const [unit1, setUnit1] = useState<string>('feet')
  const [value2, setValue2] = useState<string>('1')
  const [unit2, setUnit2] = useState<string>('feet')
  const [resultUnit, setResultUnit] = useState<string>('feet')
  const [operator, setOperator] = useState<ArithmeticOperator>('+')
  const [result, setResult] = useState<QuantityMeasurementDTO | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeType = useCallback((type: MeasurementCategory) => {
    setSelectedType(type)
    const firstUnit = UNIT_OPTIONS[type][0]
    setUnit1(firstUnit)
    setUnit2(firstUnit)
    setResultUnit(firstUnit)
    setResult(null)
    setError(null)
  }, [])

  const changeAction = useCallback((a: ActionType) => {
    setAction(a)
    setResult(null)
    setError(null)
  }, [])

  function buildQuantityDTO(value: string, unit: string): QuantityDTO {
    const unitMap = UNIT_MAPS[selectedType]
    return {
      value: parseFloat(value) || 0,
      unit: unitMap[unit],
      measurementType: MEASUREMENT_TYPE_MAP[selectedType],
    }
  }

  const execute = useCallback(async () => {
    if (!value1 || !value2) return

    setLoading(true)
    setError(null)

    try {
      let payload: QuantityInputDTO
      let endpoint: Parameters<typeof performQuantityOperation>[0]

      const q1 = buildQuantityDTO(value1, unit1)
      const q2 = buildQuantityDTO(value2, unit2)
      const qTarget = buildQuantityDTO('0', resultUnit)

      if (action === 'comparison') {
        endpoint = 'compare'
        payload = { thisQuantityDTO: q1, thatQuantityDTO: q2 }
      } else if (action === 'conversion') {
        endpoint = 'convert'
        payload = { thisQuantityDTO: q1, thatQuantityDTO: qTarget }
      } else {
        // arithmetic
        if (operator === '+') {
          endpoint = 'add-with-target-unit'
          payload = { thisQuantityDTO: q1, thatQuantityDTO: q2, targetQuantityDTO: qTarget }
        } else if (operator === '-') {
          endpoint = 'subtract-with-target-unit'
          payload = { thisQuantityDTO: q1, thatQuantityDTO: q2, targetQuantityDTO: qTarget }
        } else if (operator === '*') {
          endpoint = 'add'
          payload = { thisQuantityDTO: q1, thatQuantityDTO: q2 }
        } else {
          endpoint = 'divide'
          payload = { thisQuantityDTO: q1, thatQuantityDTO: q2 }
        }
      }

      const res = await performQuantityOperation(endpoint, payload)
      setResult(res)
      addMeasurementHistoryEntry({
        selectedType,
        action,
        operator: action === 'arithmetic' ? operator : undefined,
        value1,
        unit1,
        value2: action === 'conversion' ? undefined : value2,
        unit2: action === 'conversion' ? resultUnit : unit2,
        resultUnit,
        result: res,
      })
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, operator, value1, unit1, value2, unit2, resultUnit, selectedType])

  return {
    selectedType, changeType,
    action, changeAction,
    value1, setValue1,
    unit1, setUnit1,
    value2, setValue2,
    unit2, setUnit2,
    resultUnit, setResultUnit,
    operator, setOperator,
    result, loading, error,
    execute,
  }
}
