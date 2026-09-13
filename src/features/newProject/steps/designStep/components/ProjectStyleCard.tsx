import type { ProjectStyleCard } from "../constants/ProjectStyleCards"

export function ProjectStyleCard({ Icon, title }: ProjectStyleCard) {
  return (
    <div
      key={title}
      className="card flex min-w-24 cursor-pointer flex-col items-center justify-center gap-1 py-6 shadow-sm"
    >
      <Icon />
      <p>{title}</p>
    </div>
  )
}
