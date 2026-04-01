import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProfileApi } from '../api/profileApi'
import { getProjectsApi } from '../api/projectApi'
import { ProjectGrid } from '../components/ProjectGrid'
import type { Profile, Project } from '../types/api'

export function HomePage() {
  const appName = import.meta.env.VITE_APP_NAME ?? 'home'
  const [profile, setProfile] = useState<Profile | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    Promise.all([getProfileApi(), getProjectsApi()])
      .then(([profileResponse, projectResponse]) => {
        if (!profileResponse.success || !profileResponse.data) {
          setErrorMessage(profileResponse.message ?? '프로필 조회에 실패했습니다.')
          return
        }

        if (!projectResponse.success || !projectResponse.data) {
          setErrorMessage(projectResponse.message ?? '프로젝트 조회에 실패했습니다.')
          return
        }

        setProfile(profileResponse.data)
        setProjects(projectResponse.data)
      })
      .catch(() => {
        setErrorMessage('홈 데이터를 불러오지 못했습니다.')
      })
  }, [])

  return (
    <main className="page-shell">
      <header className="hero-section">
        <div className="hero-copy-block">
          <p className="eyebrow">{appName}</p>
          <h1>{profile?.title ?? 'Public Service Hub'}</h1>
          <p className="hero-summary">
            {profile?.summary ?? '개인 프로젝트와 공개 저장소를 한 곳에서 연결하는 공개 허브'}
          </p>
          <div className="hero-actions">
            <Link className="primary-link" to="/about">
              About Me
            </Link>
            {profile?.links.github ? (
              <a className="secondary-link" href={profile.links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            ) : null}
          </div>
        </div>
        <div className="hero-side-card">
          <span className="control-label">핵심 강점</span>
          <ul className="strength-list">
            {profile?.strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </div>
      </header>

      {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Projects</p>
            <h2>대표 프로젝트</h2>
          </div>
        </div>
        <ProjectGrid projects={projects} />
      </section>
    </main>
  )
}
