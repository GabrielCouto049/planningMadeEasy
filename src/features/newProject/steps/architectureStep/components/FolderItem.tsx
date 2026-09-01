import type { FolderNode } from "@/types/folderTreeTypes"
import { ChevronRight, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useDroppable } from "@dnd-kit/react"

interface FolderItemProps {
  folder: FolderNode
  depth: number
  indentSize: number
  onToggle: (id: string) => void
  children?: React.ReactNode
  Icon: LucideIcon
}

export default function FolderItem({
  folder,
  depth,
  indentSize,
  onToggle,
  children,
  Icon,
}: FolderItemProps) {
  const id = folder.id

  const { ref: dropRef } = useDroppable({
    id: `dropArea-${id}`,
  })

  const button = (
    <div
      onClick={() => onToggle(folder.id)}
      className="flex w-full items-center gap-2 rounded-md py-1 pr-3 text-left transition-colors hover:bg-accent"
      style={{
        paddingLeft: `${depth * indentSize}px`,
      }}
    >
      <ChevronRight
        className={cn(
          "size-4 shrink-0 text-muted-foreground transition-transform",
          folder.isOpen && "rotate-90"
        )}
      />

      <Icon className="size-4 shrink-0 text-muted-foreground" />

      <span className="truncate font-medium text-foreground">
        {folder.title}
      </span>
    </div>
  )

  return (
    <div>
      {folder.description ? (
        <Tooltip>
          <TooltipTrigger delay={600}>{button}</TooltipTrigger>

          <TooltipContent side="right" sideOffset={8}>
            {folder.description}
          </TooltipContent>
        </Tooltip>
      ) : (
        button
      )}

      {folder.isOpen && <div ref={dropRef}>{children}</div>}
    </div>
  )
}
