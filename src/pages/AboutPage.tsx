import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProfileApi } from '../api/profileApi'
import type { Profile } from '../types/api'

const STACK = [
  { label: 'Kotlin', category: 'backend' },
  { label: 'Spring Boot', category: 'backend' },
  { label: 'PostgreSQL', category: 'backend' },
  { label: 'PostGIS', category: 'backend' },
  { label: 'React', category: 'frontend' },
  { label: 'TypeScript', category: 'frontend' },
  { label: 'Vite', category: 'frontend' },
  { label: 'Docker', category: 'infra' },
  { label: 'AWS', category: 'infra' },
  { label: 'Flyway', category: 'infra' },
] as const

const STACK_LABEL: Record<string, string> = {
  backend: 'Backend',
  frontend: 'Frontend',
  infra: 'Infra',
}

const STACK_COLOR: Record<string, string> = {
  backend: 'stack-chip-backend',
  frontend: 'stack-chip-frontend',
  infra: 'stack-chip-infra',
}

export function AboutPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    getProfileApi()
      .then((response) => {
        if (!response.success || !response.data) {
          setErrorMessage(response.message ?? '프로필 조회에 실패했습니다.')
          return
        }
        setProfile(response.data)
      })
      .catch(() => {
        setErrorMessage('프로필을 불러오지 못했습니다.')
      })
  }, [])

  const groupedStack = STACK.reduce<Record<string, typeof STACK[number][]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  return (
    <main className="page-shell about-shell">
      {/* ── Header ── */}
      <div className="about-header">
        <div className="about-header-copy">
          <p className="eyebrow">About</p>
          <h1 className="about-name">{profile?.name ?? '임기원'}</h1>
          <p className="about-title">{profile?.title ?? 'Backend-Focused Product Developer'}</p>
        </div>
        <div className="about-header-actions">
          <Link className="secondary-link" to="/">← Back Home</Link>
          <Link className="secondary-link" to="/assistant">AI Assistant</Link>
        </div>
      </div>

      {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

      {/* ── Summary ── */}
      <section className="about-summary-card">
        <p className="eyebrow">Summary</p>
        <p className="about-summary-text">{profile?.summary ?? '개인 프로젝트와 공개 저장소를 한 곳에서 연결하는 공개 허브'}</p>
      </section>

      {/* ── Main grid ── */}
      <div className="about-main-grid">
        {/* Strengths */}
        <article className="about-card">
          <p className="eyebrow">Strengths</p>
          <h2 className="about-section-title">핵심 역량</h2>
          <ul className="about-strength-list">
            {(profile?.strengths ?? []).map((strength) => (
              <li key={strength} className="about-strength-item">
                <span className="about-strength-dot" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </article>

        {/* Links */}
        <article className="about-card">
          <p className="eyebrow">Links</p>
          <h2 className="about-section-title">채널 & 저장소</h2>
          <div className="about-link-list">
            {Object.entries(profile?.links ?? {}).map(([label, href]) => {
              const domain = href.replace(/^https?:\/\//, '').split('/')[0]
              return (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="about-link-item">
                  <span className="about-link-label">{label}</span>
                  <span className="about-link-domain">{domain} →</span>
                </a>
              )
            })}
          </div>
        </article>
      </div>

      {/* ── Tech Stack ── */}
      <section className="about-card about-stack-card">
        <p className="eyebrow">Tech Stack</p>
        <h2 className="about-section-title">주 기술 스택</h2>
        <div className="about-stack-groups">
          {Object.entries(groupedStack).map(([category, items]) => (
            <div key={category} className="about-stack-group">
              <span className="about-stack-group-label">{STACK_LABEL[category]}</span>
              <div className="about-stack-chips">
                {items.map((item) => (
                  <span key={item.label} className={`about-stack-chip ${STACK_COLOR[category]}`}>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Work style ── */}
      <section className="about-card about-style-card">
        <p className="eyebrow">Work Style</p>
        <h2 className="about-section-title">작업 방식</h2>
        <div className="about-style-grid">
          {[
            { title: 'MVP First', desc: '아이디어를 빠르게 동작하는 형태로 만들어 검증하는 것을 우선한다.' },
            { title: 'Full-stack Ownership', desc: '백엔드 설계부터 프론트 배포까지 제품 단위로 직접 담당한다.' },
            { title: 'Data-Informed', desc: '실제 사용 흐름과 데이터를 기반으로 다음 개선을 결정한다.' },
            { title: 'Progressive Refinement', desc: '완성보다 작동을 먼저, 이후 반복적으로 품질을 높여간다.' },
          ].map((item) => (
            <div key={item.title} className="about-style-item">
              <strong className="about-style-title">{item.title}</strong>
              <p className="about-style-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
