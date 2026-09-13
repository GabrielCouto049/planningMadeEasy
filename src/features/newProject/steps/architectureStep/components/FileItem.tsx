import { useRef } from "react"
import { GripVertical, type LucideIcon } from "lucide-react"
import { useDraggable, useDroppable } from "@dnd-kit/react"
import type { FileNode } from "@/types/folderTreeTypes"
import { cn } from "@/lib/utils"
import { useDropDirection } from "../hooks/useDropDirection"
import DropIndicator from "./DropIndicator"
import type { DragNodeData, DropData } from "../types/dragData"

interface FileItemProps {
  file: FileNode
  depth: number
  indentSize: number
  Icon: LucideIcon
  index: number
  parentId: string
}

export default function FileItem({
  file,
  depth,
  indentSize,
  Icon,
  index,
  parentId,
}: FileItemProps) {
  const rowRef = useRef<HTMLDivElement | null>(null)

  const {
    ref: dragRef,
    handleRef,
    isDragging,
  } = useDraggable<DragNodeData>({
    id: file.id,
    data: { title: file.title, isFolder: false, fileType: file.type },
  })

  const { ref: dropRef, isDropTarget } = useDroppable<DropData>({
    id: file.id,
    data: {
      kind: "row",
      parentId,
      index,
      itemId: file.id,
      isFolder: false,
    },
  })

  const direction = useDropDirection(rowRef, isDropTarget, false)

  return (
    <div
      ref={(element) => {
        rowRef.current = element
        dragRef(element)
        dropRef(element)
      }}
      className={cn(
        "group relative flex items-center gap-2 rounded-md py-1 pr-2 transition-colors hover:bg-accent/60",
        isDragging && "opacity-40",
        isDropTarget && "bg-accent/15"
      )}
      style={{
        paddingLeft: `${depth * indentSize + 8}px`,
      }}
    >
      <DropIndicator direction={direction} />

      <GripVertical
        ref={handleRef}
        className="size-4 shrink-0 cursor-grab text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
      />

      <Icon className="size-4 shrink-0 text-muted-foreground" />

      <span className="truncate text-foreground">{file.title}</span>
    </div>
  )
}
