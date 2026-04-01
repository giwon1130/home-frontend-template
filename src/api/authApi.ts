import { apiFetch } from './client'
import type { ApiResponse, LoginData, LoginRequest } from '../types/api'

export function loginApi(payload: LoginRequest) {
  return apiFetch<ApiResponse<LoginData>>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
