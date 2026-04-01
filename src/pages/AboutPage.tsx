import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProfileApi } from '../api/profileApi'
import type { Profile } from '../types/api'

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

  return (
    <main className="page-shell about-shell">
      <div className="section-heading">
        <div>
          <p className="eyebrow">About</p>
          <h1>{profile?.name ?? '임기원'}</h1>
        </div>
        <Link className="secondary-link" to="/">
          Back Home
        </Link>
      </div>

      {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

      <section className="about-card">
        <h2>{profile?.title}</h2>
        <p className="about-summary">{profile?.summary}</p>
      </section>

      <section className="about-grid">
        <article className="about-card">
          <h3>강점</h3>
          <ul className="strength-list">
            {profile?.strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </article>

        <article className="about-card">
          <h3>링크</h3>
          <div className="link-list">
            {Object.entries(profile?.links ?? {}).map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer">
                {label}
              </a>
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}
