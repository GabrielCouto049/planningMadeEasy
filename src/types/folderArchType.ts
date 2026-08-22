export interface GenericNode {
  id: string | "root"
  title: string
  description: string
}

export type FileNode = GenericNode & {
  type: "code" | "image" | "text"
}

export type FolderNode = GenericNode & {
  children: Node[]
}

export type Node = FileNode | FolderNode