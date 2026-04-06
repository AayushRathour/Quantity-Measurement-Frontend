import type { MeasurementCategory, MeasurementType } from '../types'

// ─── Display labels → API enum values ─────────────────────────────────────────

export const UNIT_MAPS: Record<MeasurementCategory, Record<string, string>> = {
  length: {
    feet: 'FEET',
    inch: 'INCHES',
    yard: 'YARDS',
    cm: 'CENTIMETERS',
  },
  weight: {
    milligram: 'MILLIGRAM',
    gram: 'GRAM',
    kilogram: 'KILOGRAM',
    pound: 'POUND',
    ton: 'TONNE',
  },
  volume: {
    liter: 'LITRE',
    milliliter: 'MILLILITER',
    gallon: 'GALLON',
  },
  temperature: {
    celsius: 'CELSIUS',
    fahrenheit: 'FAHRENHEIT',
  },
}

// ─── Unit display labels per category ─────────────────────────────────────────

export const UNIT_OPTIONS: Record<MeasurementCategory, string[]> = {
  length: ['feet', 'inch', 'yard', 'cm'],
  weight: ['milligram', 'gram', 'kilogram', 'pound', 'ton'],
  volume: ['liter', 'milliliter', 'gallon'],
  temperature: ['celsius', 'fahrenheit'],
}

// ─── measurementType string per category ──────────────────────────────────────

export const MEASUREMENT_TYPE_MAP: Record<MeasurementCategory, MeasurementType> = {
  length: 'LengthUnit',
  weight: 'WeightUnit',
  volume: 'VolumeUnit',
  temperature: 'TemperatureUnit',
}

// ─── Type card config ──────────────────────────────────────────────────────────

export const TYPE_CARDS: { key: MeasurementCategory; label: string; icon: string }[] = [
  { key: 'length', label: 'Length', icon: '📏' },
  { key: 'weight', label: 'Weight', icon: '⚖️' },
  { key: 'temperature', label: 'Temperature', icon: '🌡️' },
  { key: 'volume', label: 'Volume', icon: '🧪' },
]

// ─── Validation regexes (mirror auth.js) ──────────────────────────────────────

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const NAME_REGEX = /^[A-Za-z][A-Za-z\s]{2,49}$/
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,20}$/
