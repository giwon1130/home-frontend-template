import type { Project } from '../types/api'

type ProjectGridProps = {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const statusLabel = {
    LIVE: 'Live',
    BUILDING: 'Building',
    PLANNING: 'Planning',
  } as const

  const sortedProjects = [...projects].sort((left, right) => {
    const priority = {
      LIVE: 0,
      BUILDING: 1,
      PLANNING: 2,
    }

    return priority[left.status as keyof typeof priority] - priority[right.status as keyof typeof priority]
  })

  return (
    <section className="project-grid">
      {sortedProjects.map((project) => (
        <article key={project.id} className="project-card">
          <div className="project-card-header">
            <div>
              <span className="project-category">{project.category}</span>
              <h3>{project.name}</h3>
            </div>
            <span className={`project-status ${project.status.toLowerCase()}`}>
              {statusLabel[project.status as keyof typeof statusLabel] ?? project.status}
            </span>
          </div>
          <p className="project-summary">{project.summary}</p>
          <div className="project-meta">
            <span>{project.tags.length} tags</span>
            <span>{project.liveUrl ? '실행 링크 있음' : '저장소 중심'}</span>
          </div>
          <div className="tag-list">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>
          <div className="project-links">
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                Live
              </a>
            ) : null}
            {project.repositoryUrl ? (
              <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                Repository
              </a>
            ) : null}
            {project.docsUrl ? (
              <a href={project.docsUrl} target="_blank" rel="noreferrer">
                Docs
              </a>
            ) : null}
          </div>
        </article>
      ))}
    </section>
  )
}
