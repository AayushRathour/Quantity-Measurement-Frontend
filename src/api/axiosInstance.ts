import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1',
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT to every request automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Normalize error responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status: number = error.response?.status ?? 0
    const rawMessage: string = error.response?.data?.message ?? error.message ?? ''
    const endpoint: string = error.config?.url ?? ''

    const normalized = normalizeApiError(rawMessage, status, endpoint)
    return Promise.reject(new Error(normalized))
  },
)

function normalizeApiError(rawMessage: string, status: number, endpoint: string): string {
  const lower = rawMessage.toLowerCase()

  if (endpoint.includes('/login')) {
    if (
      lower.includes('bad credentials') ||
      lower.includes('invalid') ||
      status === 401 ||
      status === 403
    ) {
      return 'Wrong email or password.'
    }
  }

  if (
    lower.includes('duplicate entry') ||
    lower.includes('already exists') ||
    lower.includes('constraint')
  ) {
    return 'This email is already registered. Please log in or use a different email.'
  }

  if (status === 400) {
    return endpoint.includes('/signup')
      ? 'Invalid signup data. Check your name, email, and password.'
      : 'Invalid login request. Check your credentials.'
  }

  if (status === 401 || status === 403) return 'Email or password is incorrect.'
  if (status >= 500) return 'Server error. Please try again in a moment.'
  if (!rawMessage) return 'Request failed. Please try again.'

  return rawMessage
}

export default axiosInstance
