import { apiFetch } from './client'
import type { ApiResponse, Profile } from '../types/api'

export function getProfileApi() {
  return apiFetch<ApiResponse<Profile>>('/api/profile')
}
