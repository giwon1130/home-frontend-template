import { assistantApiFetch } from './client'
import type {
  ApiResponse,
  AssistantBriefing,
  AssistantBriefingHistory,
  AssistantCopilot,
  AssistantCopilotAskResponse,
  AssistantCopilotHistory,
  AssistantAction,
  AssistantIdea,
  AssistantPlan,
  AssistantWeeklyReview,
} from '../types/api'

export function getTodayBriefingApi() {
  return assistantApiFetch<ApiResponse<AssistantBriefing>>('/api/v1/briefings/today')
}

export function getBriefingHistoryApi() {
  return assistantApiFetch<ApiResponse<AssistantBriefingHistory[]>>('/api/v1/briefings/history')
}

export function getTodayPlanApi() {
  return assistantApiFetch<ApiResponse<AssistantPlan>>('/api/v1/plans/today')
}

export function getTodayCopilotApi() {
  return assistantApiFetch<ApiResponse<AssistantCopilot>>('/api/v1/copilot/today')
}

export function getCopilotHistoryApi() {
  return assistantApiFetch<ApiResponse<AssistantCopilotHistory[]>>('/api/v1/copilot/history')
}

export function askCopilotApi(question: string) {
  return assistantApiFetch<ApiResponse<AssistantCopilotAskResponse>>('/api/v1/copilot/ask', {
    method: 'POST',
    body: JSON.stringify({ question }),
  })
}

export function getActionsApi(status?: 'OPEN' | 'DONE') {
  const query = status ? `?status=${status}` : ''
  return assistantApiFetch<ApiResponse<AssistantAction[]>>(`/api/v1/actions${query}`)
}

export function getWeeklyReviewApi() {
  return assistantApiFetch<ApiResponse<AssistantWeeklyReview>>('/api/v1/reviews/weekly')
}

export function createActionApi(payload: { title: string; sourceQuestion: string }) {
  return assistantApiFetch<ApiResponse<AssistantAction>>('/api/v1/actions', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateActionStatusApi(actionId: string, status: 'OPEN' | 'DONE') {
  return assistantApiFetch<ApiResponse<AssistantAction>>(`/api/v1/actions/${actionId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
}

export function getIdeasApi() {
  return assistantApiFetch<ApiResponse<AssistantIdea[]>>('/api/v1/ideas')
}

export function createIdeaApi(payload: { title: string; rawText: string; tags: string[] }) {
  return assistantApiFetch<ApiResponse<AssistantIdea>>('/api/v1/ideas', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateIdeaApi(
  ideaId: string,
  payload: { title?: string; rawText?: string; tags?: string[]; status?: string },
) {
  return assistantApiFetch<ApiResponse<AssistantIdea>>(`/api/v1/ideas/${ideaId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}
