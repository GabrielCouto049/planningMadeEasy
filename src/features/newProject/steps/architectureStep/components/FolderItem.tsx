import { useRef } from "react"
import type { FolderNode } from "@/types/folderTreeTypes"
import { ChevronRight, GripVertical, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDraggable, useDroppable } from "@dnd-kit/react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { useDropDirection } from "../hooks/useDropDirection"
import DropIndicator from "./DropIndicator"
import type { DragNodeData, DropData } from "../types/dragData"

interface FolderItemProps {
  folder: FolderNode
  depth: number
  indentSize: number
  onToggle: (id: string) => void
  children?: React.ReactNode
  Icon: LucideIcon
  index: number
  parentId: string
  isRoot?: boolean
}

export default function FolderItem({
  folder,
  depth,
  indentSize,
  onToggle,
  children,
  Icon,
  index,
  parentId,
  isRoot = false,
}: FolderItemProps) {
  const rowRef = useRef<HTMLDivElement | null>(null)

  const {
    ref: rowDragRef,
    handleRef,
    isDragging,
  } = useDraggable<DragNodeData>({
    id: folder.id,
    data: { title: folder.title, isFolder: true },
    disabled: isRoot,
  })

  const { ref: rowDropRef, isDropTarget: isRowTarget } = useDroppable<DropData>(
    {
      id: folder.id,
      data: {
        kind: "row",
        parentId,
        index,
        itemId: folder.id,
        isFolder: true,
      },
      disabled: isRoot,
    }
  )

  const { ref: contentDropRef, isDropTarget: isContentTarget } =
    useDroppable<DropData>({
      id: `${folder.id}:content`,
      data: {
        kind: "container",
        parentId: folder.id,
        index: folder.children.length,
      },
    })

  const direction = useDropDirection(rowRef, isRowTarget, true)

  const rowButton = (
    <button
      type="button"
      onClick={() => onToggle(folder.id)}
      className="flex min-w-0 flex-1 items-center gap-2 py-1 text-left"
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
    </button>
  )

  return (
    <div>
      <div
        ref={(element) => {
          rowRef.current = element
          rowDragRef(element)
          rowDropRef(element)
        }}
        className={cn(
          "group relative flex w-full items-center gap-2 rounded-md pr-2 transition-colors hover:bg-accent",
          isDragging && "opacity-40",
          direction === "inside" && "bg-accent/40 ring-2 ring-accent ring-inset"
        )}
        style={{
          paddingLeft: `${depth * indentSize}px`,
        }}
      >
        <DropIndicator direction={direction} />

        {!isRoot && (
          <GripVertical
            ref={handleRef}
            className="size-4 shrink-0 cursor-grab text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
          />
        )}

        {folder.description ? (
          <Tooltip>
            <TooltipTrigger delay={600}>{rowButton}</TooltipTrigger>

            <TooltipContent side="right" sideOffset={8}>
              {folder.description}
            </TooltipContent>
          </Tooltip>
        ) : (
          rowButton
        )}
      </div>

      {folder.isOpen && <div>{children}</div>}

      <div
        ref={contentDropRef}
        className={cn(
          "relative min-h-1 rounded-md",
          isContentTarget && [
            "min-h-6",
            "bg-accent/40",
            "ring-2 ring-accent",
            "ring-inset",
          ]
        )}
      />
    </div>
  )
}
