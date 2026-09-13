import type { FileType } from "@/types/folderTreeTypes"

export type DropDirection = "before" | "after" | "inside"

export type DropData =
  | {
      kind: "row"
      parentId: string
      index: number
      itemId: string
      isFolder: boolean
    }
  | { kind: "container"; parentId: string; index: number }

export type DragNodeData = {
  title: string
  isFolder: boolean
  fileType?: FileType | "pendent"
}
