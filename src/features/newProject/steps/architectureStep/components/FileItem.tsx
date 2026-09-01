import type { FileNode } from "@/types/folderTreeTypes"
import { useDraggable } from "@dnd-kit/react"
import type { LucideIcon } from "lucide-react"

interface FileItemProps {
  file: FileNode
  depth: number
  indentSize: number
  Icon: LucideIcon
}

export default function FileItem({
  file,
  depth,
  indentSize,
  Icon,
}: FileItemProps) {
  const id = file.id

  const { ref } = useDraggable({
    id,
  })

  return (
    <div
      ref={ref}
      className="flex items-center gap-2 rounded-md py-1 pr-3 transition-colors hover:bg-accent/60"
      style={{
        paddingLeft: `${depth * indentSize + 24}px`,
      }}
    >
      <Icon className="size-4 shrink-0 text-muted-foreground" />

      <span className="truncate text-foreground">{file.title}</span>
    </div>
  )
}
