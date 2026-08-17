import { Ellipsis } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type { ProjectType } from "../../types/projectType"
import formatDate from "../../utils/formatDate"
import { renderImage } from "../../utils/renderImage"

const getStatus = (progress: number): string => {
  if (progress <= 0 || progress > 100) return "Inválido"
  if (progress === 100) return "Completo"
  return "Ativo"
}

interface ProjectCardProps {
  project: ProjectType
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  const { lastEdited, progress, general } = project
  const {image, title, description} = general

  return (
    <aside className="card flex flex-col gap-6 p-6 transition-all hover:-translate-y-0.5 hover:shadow-md">
      <header className="flex justify-between">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-muted text-muted-foreground">
          {renderImage(image)}
        </div>

        <Button variant="ghost" size="icon-sm" aria-label="Mais opções">
          <Ellipsis />
        </Button>
      </header>

      <main>
        <div className="mb-2 flex items-center gap-3">
          <h2 className="font-semibold">{title}</h2>

          <div
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-medium",
              progress === 100
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground"
            )}
          >
            {getStatus(progress)}
          </div>
        </div>

        <p className="mb-4 line-clamp-3 flex-1 text-sm text-muted-foreground">
          {description}
        </p>

        <p className="text-xs text-muted-foreground">
          Editado em {formatDate(lastEdited)}
        </p>
      </main>

      <footer className="grid grid-cols-2 gap-3">
        <Button variant="outline">Editar</Button>
        <Button>Ver Projeto</Button>
      </footer>
    </aside>
  )
}