import type { Node } from "@/types/folderTreeTypes"
import { FileQuestionMark, GripVertical } from "lucide-react"
import { useDraggable } from "@dnd-kit/react"
import type { DragNodeData } from "../types/dragData"

export default function PendentFile({ file }: { file: Node }) {
  const isFolder = "children" in file

  const { ref, handleRef } = useDraggable<DragNodeData>({
    id: file.id,
    data: {
      title: file.title,
      isFolder,
      fileType: isFolder ? undefined : file.type,
    },
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
      <GripVertical ref={handleRef} className="cursor-grab" />
    </div>
  )
}
