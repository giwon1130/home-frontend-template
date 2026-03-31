import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('demo@home.io')
  const [password, setPassword] = useState('home1234')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')

    try {
      await login(email, password)
      navigate('/', { replace: true })
    } catch {
      setErrorMessage('이메일 또는 비밀번호가 올바르지 않습니다.')
    }
  }

  return (
    <main className="container">
      <h1>Home Login</h1>
      <form className="card login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

        <button type="submit">로그인</button>
      </form>
    </main>
  )
}
