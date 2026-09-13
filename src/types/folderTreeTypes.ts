interface GenericNodeProps {
  id: string
  title: string
  description: string
}

type FileType = "code" | "image" | "text"

type FileNode = GenericNodeProps & {
  type: FileType
}

type FolderNode = GenericNodeProps & {
  isOpen: boolean
  children: Node[]
}

type Node = FileNode | FolderNode

export type { GenericNodeProps, FileNode, FileType, FolderNode, Node }
