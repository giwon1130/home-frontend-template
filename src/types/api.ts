export type ApiResponse<T> = {
  success: boolean
  data: T | null
  message: string | null
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginUser = {
  email: string
  name: string
}

export type LoginData = {
  token: string
  user: LoginUser
}

export type Project = {
  id: string
  name: string
  status: string
  category: string
  summary: string
  primaryUrl: string
  repositoryUrl: string | null
  tags: string[]
}

export type Profile = {
  name: string
  title: string
  summary: string
  strengths: string[]
  links: Record<string, string>
}
