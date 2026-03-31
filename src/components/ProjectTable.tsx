import type { Project } from '../types/api'

type ProjectTableProps = {
  projects: Project[]
}

export function ProjectTable({ projects }: ProjectTableProps) {
  return (
    <table className="project-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id}>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
