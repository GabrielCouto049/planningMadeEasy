import { FolderOpen } from "lucide-react"
import useNewProjectStore from "../stores/newProjectStore"
import FolderTree from "../components/FolderTree"

export default function ProjectArch() {
  const { folderStructure } = useNewProjectStore()

  const isEmpty = false

  return (
    <>
      <h1 className="sectionTitle">Arquitetura</h1>
      <div className="grid grid-cols-2 gap-6">
        <section className="card h-100 p-4">
          {isEmpty ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <FolderOpen className="size-8" />
              <p className="text-sm">Nenhuma pasta ou arquivo criado</p>
            </div>
          ) : (
            <FolderTree node={folderStructure.root} />
          )}
        </section>
        <section className="card h-100"></section>
      </div>
    </>
  )
}
