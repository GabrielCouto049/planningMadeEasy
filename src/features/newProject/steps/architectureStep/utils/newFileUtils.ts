import type { GenericNodeProps, Node } from "@/types/folderTreeTypes"
import { fileTypeLib } from "../constants/iconLib"

export function getFileExtension(filename: string) {
  const lastDot = filename.lastIndexOf(".")

  if (lastDot <= 0) return ""

  return filename.slice(lastDot + 1).toLowerCase()
}

export function createNode(data: Omit<GenericNodeProps, "id">): Node {
  const extension = getFileExtension(data.title)
  const fileType = fileTypeLib[extension]

  // Arquivo sem extensão será considerado uma pasta
  if (!fileType) {
    return {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      isOpen: false,
      children: [],
    }
  }

  return {
    id: crypto.randomUUID(),
    title: data.title,
    description: data.description,
    type: fileType,
  }
}
