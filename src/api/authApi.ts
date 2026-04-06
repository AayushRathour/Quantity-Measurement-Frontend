import axiosInstance from './axiosInstance'
import type { LoginRequest, SignupRequest, UserDto } from '../types'

/**
 * POST /auth/login  → returns raw JWT string
 */
export async function loginUser(data: LoginRequest): Promise<string> {
  const response = await axiosInstance.post<string>('/auth/login', data)
  return response.data
}

/**
 * POST /auth/signup  → returns created UserDto
 */
export async function signupUser(data: SignupRequest): Promise<UserDto> {
  const response = await axiosInstance.post<UserDto>('/auth/signup', data)
  return response.data
}
