import type { Node } from "@/types/folderTreeTypes"
import { FileQuestionMark, GripVertical } from "lucide-react"
import { useDraggable } from "@dnd-kit/react"

export default function PendentFile({ file }: { file: Node }) {
  const { ref } = useDraggable({
    id: file.id,
  })

  return (
    <div
      ref={ref}
      className="flex items-center justify-between rounded-lg border border-accent p-3"
    >
      <div className="flex items-center gap-3">
        <FileQuestionMark />
        <p>{file.title}</p>
      </div>
      <GripVertical className="cursor-grab" />
    </div>
  )
}
