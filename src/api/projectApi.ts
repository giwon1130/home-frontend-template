import { apiFetch } from './client'
import type { ApiResponse, Project } from '../types/api'

export function getProjectsApi(token: string) {
  return apiFetch<ApiResponse<Project[]>>('/api/projects', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
