import { StatusCard } from '../components/StatusCard'

export function HomePage() {
  const appName = import.meta.env.VITE_APP_NAME ?? 'g-frontend-template'

  return (
    <main className="container">
      <h1>{appName}</h1>
      <StatusCard title="Template Ready" description="Start building your app from this base." />
    </main>
  )
}
