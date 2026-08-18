import type { ProjectType } from "@/types/projectType"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"
import { renderImage } from "../../../utils/renderImage"
import formatDate from "../../../utils/formatDate"
import { Button } from "@/components/ui/button"

export default function UnfinishedProjectCard({
  project,
}: {
  project: ProjectType
}) {
  const { progress, lastEdited, general } = project
  const { description, title, image } = general

  return (
    <aside className="card flex flex-col items-start justify-between gap-6 px-6 py-5 lg:flex-row lg:items-center">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-muted text-muted-foreground">
          {renderImage(image)}
        </div>

        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="line-clamp-1 max-w-md text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/3">
        <Progress value={progress} className="mb-2 w-full">
          <ProgressLabel>Progresso</ProgressLabel>
          <ProgressValue />
        </Progress>

        <p className="text-xs text-muted-foreground">
          Editado em {formatDate(lastEdited)}
        </p>
      </div>

      <Button className="shrink-0">Continuar</Button>
    </aside>
  )
}
