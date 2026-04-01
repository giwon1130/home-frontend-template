import { apiFetch } from './client'
import type { ApiResponse, Project } from '../types/api'

export function getProjectsApi() {
  return apiFetch<ApiResponse<Project[]>>('/projects')
}
