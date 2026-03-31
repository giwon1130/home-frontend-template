import { useEffect, useState } from 'react'
import { getProjectsApi } from '../api/projectApi'
import { useAuth } from '../auth/AuthContext'
import { ProjectTable } from '../components/ProjectTable'
import type { Project } from '../types/api'

export function HomePage() {
  const appName = import.meta.env.VITE_APP_NAME ?? 'home-frontend-template'
  const { token, user, logout } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!token) return

    getProjectsApi(token)
      .then((response) => {
        if (!response.success || !response.data) {
          setErrorMessage(response.message ?? '프로젝트 조회에 실패했습니다.')
          return
        }

        setProjects(response.data)
      })
      .catch(() => {
        setErrorMessage('프로젝트 조회에 실패했습니다.')
      })
  }, [token])

  return (
    <main className="container">
      <header className="home-header">
        <div>
          <h1>{appName}</h1>
          <p className="home-subtitle">{user ? `${user.name}님 환영합니다.` : 'Project Home'}</p>
        </div>
        <button type="button" onClick={logout}>
          로그아웃
        </button>
      </header>

      {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
      <ProjectTable projects={projects} />
    </main>
  )
}
