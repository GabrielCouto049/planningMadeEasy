import { useState } from "react"

import type { Node } from "@/types/folderTreeTypes"
import PendentFile from "./components/PendentFile"
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react"
import useNewProjectStore from "../../stores/newProjectStore"
import FolderTree from "./components/FolderTree"
import NewFileForm from "./components/NewFileForm"

export default function ProjectArch() {
  const tree = useNewProjectStore((state) => state.tree)
  const moveNode = useNewProjectStore((state) => state.moveNode)

  const [pendentFiles, setPendentFiles] = useState<Node[]>([])

  function handleDragEnd(event: DragEndEvent) {
    if (event.canceled) return

    const operation = event.operation

    moveNode(operation.source?.id as string, operation.target?.id as string)
  }

  return (
    <>
      <h1 className="sectionTitle">Arquitetura</h1>

      <DragDropProvider onDragEnd={handleDragEnd}>
        <section className="grid grid-cols-2 grid-rows-2 gap-x-6 gap-y-3">
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
      </DragDropProvider>
    </>
  )
}
