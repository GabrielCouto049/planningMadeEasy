import { Ellipsis } from "lucide-react"
import type { ProjectType } from "../../types/projectType"
import formatDate from "../../utils/formatDate"
import { renderImage } from "../../utils/renderImage"

const getStatus = (progress: number): string => {
  if (progress <= 0 || progress > 100) return "Inválido"
  if (progress === 100) return "Completo"
  return "Ativo"
}

export default function RecentProjects({
  projects,
}: {
  projects: ProjectType[]
}) {
  return (
    <section className="grid grid-cols-4 gap-4">
      {projects.map(({ title, lastEdited, progress, image, description }) => (
        <aside key={title} className="card flex flex-col gap-6 p-6">
          <header className="flex justify-between">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
              {renderImage(image)}
            </div>
            <button>
              <Ellipsis />
            </button>
          </header>

          <main>
            <div className="mb-2 flex items-center gap-3">
              <h2 className="font-semibold">{title}</h2>
              <div className="rounded-full border border-gray-400 px-2 py-0.5 text-xs text-gray-800">
                {getStatus(progress)}
              </div>
            </div>
            <p className="mb-4 line-clamp-3 flex-1 text-sm text-gray-500">
              {description}
            </p>
            <p className="text-xs text-gray-500">
              Editado em {formatDate(lastEdited)}
            </p>
          </main>

          <footer className="grid grid-cols-2 gap-6">
            <button className="ghostButton w-full">Editar</button>
            <button className="primaryButton w-full">Ver Projeto</button>
          </footer>
        </aside>
      ))}
    </section>
  )
}
