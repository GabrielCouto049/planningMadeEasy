import type { ProjectType } from "@/types/projectType"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"
import { renderImage } from "../../../utils/renderImage"
import formatDate from "../../../utils/formatDate"

export default function UnfinishedProjectCard({
  project,
}: {
  project: ProjectType
}) {
  const { image, description, progress, lastEdited, title } = project
  return (
    <aside className="card flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
          {renderImage(image)}
        </div>

        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="line-clamp-1 max-w-md text-sm text-gray-500">
            {description}
          </p>
        </div>
      </div>

      <div className="w-1/3">
        <Progress value={progress} className="mb-2 w-full">
          <ProgressLabel>Progresso</ProgressLabel>
          <ProgressValue />
        </Progress>

        <p className="text-xs text-gray-500">
          Editado em {formatDate(lastEdited)}
        </p>
      </div>

      <button className="primaryButton px-4 py-2">Continuar</button>
    </aside>
  )
}
