import { useState } from "react"

import type { Node } from "@/types/folderTreeTypes"
import {
  DragDropProvider,
  DragOverlay,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/react"
import { FileQuestionMark, Folder } from "lucide-react"

import useNewProjectStore from "@/features/newProject/stores/newProjectStore"
import PendentFile from "./components/PendentFile"
import FolderTree from "./components/FolderTree"
import NewFileForm from "./components/NewFileForm"
import { getTreeIcon } from "./constants/iconLib"
import { computeDropDirection } from "./hooks/useDropDirection"
import type { DragNodeData, DropData, DropDirection } from "./types/dragData"

type DropTarget = {
  element?: Element | null
  data: { isFolder?: unknown }
}

export default function ProjectArch() {
  const tree = useNewProjectStore((state) => state.tree)
  const moveNode = useNewProjectStore((state) => state.moveNode)
  const findNode = useNewProjectStore((state) => state.findNode)
  const addNode = useNewProjectStore((state) => state.addNode)
  const toggleFolder = useNewProjectStore((state) => state.toggleFolder)

  const [pendentFiles, setPendentFiles] = useState<Node[]>([])

  function directionOf(target: DropTarget, pointer: { x: number; y: number }) {
    const rect = target.element?.getBoundingClientRect()

    if (!rect || rect.height === 0) {
      return "after" as DropDirection
    }

    const fraction = (pointer.y - rect.top) / rect.height

    return computeDropDirection(target.data.isFolder === true, fraction)
  }

  function handleDragOver(event: DragOverEvent) {
    const target = event.operation.target

    if (!target) return

    const data = target.data as DropData | undefined

    if (data?.kind === "container") {
      toggleFolder(data.parentId, true)

      return
    }

    if (data?.kind === "row" && data.isFolder) {
      const direction = directionOf(target, event.operation.position.current)

      if (direction === "inside") {
        toggleFolder(data.itemId, true)
      }
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    if (event.canceled) return

    const { operation } = event
    const sourceId = operation.source?.id
    const target = operation.target

    if (sourceId == null || !target) return

    const data = target.data as DropData | undefined

    if (!data) return

    let targetParent = data.parentId
    let targetIndex: number | undefined = data.index

    if (data.kind === "row") {
      const direction = directionOf(target, operation.position.current)

      if (direction === "inside") {
        targetParent = data.itemId
        targetIndex = undefined
      } else if (direction === "after") {
        targetIndex = data.index + 1
      }
    }

    const source = String(sourceId)

    if (findNode(source)) {
      moveNode(source, targetParent, targetIndex)
      return
    }

    const pendentFile = pendentFiles.find((file) => file.id === source)

    if (!pendentFile) {
      return
    }

    addNode(targetParent, pendentFile, targetIndex)

    setPendentFiles((files) => files.filter((file) => file.id !== source))
  }

  function overlayIcon(data: DragNodeData) {
    if (data.isFolder) return Folder

    if (data.fileType === "pendent") return FileQuestionMark

    return getTreeIcon(data.fileType ?? "text")
  }

  return (
    <>
      <h1 className="sectionTitle">Arquitetura</h1>

      <DragDropProvider onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
        <section className="grid grid-cols-2 grid-rows-2 gap-x-6 gap-y-4">
          <div className="card row-span-2 p-6">
            <FolderTree tree={tree} />
          </div>

          <NewFileForm setPendentFiles={setPendentFiles} />

          <div className="card col-start-2 p-6">
            {pendentFiles.map((file) => (
              <PendentFile key={file.id} file={file} />
            ))}
          </div>
        </section>

        <DragOverlay>
          {(source) => {
            const data = source.data as DragNodeData
            const Icon = overlayIcon(data)

            return (
              <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-1.5 shadow-lg">
                <Icon className="size-4 shrink-0 text-muted-foreground" />
                <span className="truncate text-sm font-medium text-foreground">
                  {data.title}
                </span>
              </div>
            )
          }}
        </DragOverlay>
      </DragDropProvider>
    </>
  )
}
