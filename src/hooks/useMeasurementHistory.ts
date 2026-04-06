import type { MeasurementHistoryEntry } from '../types'
import { getStoredToken } from './useAuth'

const HISTORY_PREFIX = 'quantity-history'

function getBase64Payload(token: string): string | null {
  const parts = token.split('.')
  if (parts.length < 2) return null

  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
    return atob(padded)
  } catch {
    return null
  }
}

function getHistoryScope(token: string | null): string {
  if (!token) return 'guest'

  const payloadText = getBase64Payload(token)
  if (!payloadText) return token

  try {
    const payload = JSON.parse(payloadText) as Record<string, unknown>
    const candidate = payload.sub ?? payload.email ?? payload.userId ?? payload.id ?? payload.name
    return candidate ? String(candidate) : token
  } catch {
    return token
  }
}

function getHistoryKey(token: string | null): string {
  return `${HISTORY_PREFIX}:${getHistoryScope(token)}`
}

function readHistoryFromStorage(token: string | null = getStoredToken()): MeasurementHistoryEntry[] {
  if (typeof window === 'undefined') return []

  const raw = localStorage.getItem(getHistoryKey(token))
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw) as MeasurementHistoryEntry[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveHistoryToStorage(entries: MeasurementHistoryEntry[], token: string | null = getStoredToken()): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(getHistoryKey(token), JSON.stringify(entries))
}

function createEntryId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function loadMeasurementHistory(token: string | null = getStoredToken()): MeasurementHistoryEntry[] {
  return readHistoryFromStorage(token)
}

export function addMeasurementHistoryEntry(
  entry: Omit<MeasurementHistoryEntry, 'id' | 'createdAt'>,
  token: string | null = getStoredToken(),
): MeasurementHistoryEntry {
  const nextEntry: MeasurementHistoryEntry = {
    ...entry,
    id: createEntryId(),
    createdAt: new Date().toISOString(),
  }

  const nextHistory = [nextEntry, ...readHistoryFromStorage(token)].slice(0, 50)
  saveHistoryToStorage(nextHistory, token)
  return nextEntry
}

export function clearMeasurementHistory(token: string | null = getStoredToken()): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(getHistoryKey(token))
}