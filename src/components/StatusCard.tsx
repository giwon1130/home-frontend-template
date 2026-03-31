type StatusCardProps = {
  title: string
  description: string
}

export function StatusCard({ title, description }: StatusCardProps) {
  return (
    <section className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  )
}
