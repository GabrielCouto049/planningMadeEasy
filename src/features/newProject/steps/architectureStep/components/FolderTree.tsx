import type { FileNode, FolderNode, Node } from "@/types/folderTreeTypes"
import useNewProjectStore from "@/features/newProject/stores/newProjectStore"

import FolderItem from "./FolderItem"
import FileItem from "./FileItem"
import { Folder, FolderClosed } from "lucide-react"
import { getTreeIcon } from "../constants/iconLib"

const INDENT_SIZE = 20

interface FolderTreeProps {
  tree: {
    root: FolderNode
  }
}

export default function FolderTree({ tree }: FolderTreeProps) {
  const toggleFolder = useNewProjectStore((state) => state.toggleFolder)

  function renderNode(node: Node, depth: number) {
    if ("children" in node) {
      const folders: FolderNode[] = []
      const files: FileNode[] = []

      for (const child of node.children) {
        if ("children" in child) {
          folders.push(child)
        } else {
          files.push(child)
        }
      }

      return (
        <FolderItem
          key={node.id}
          folder={node}
          depth={depth}
          indentSize={INDENT_SIZE}
          onToggle={toggleFolder}
          Icon={node.isOpen ? FolderClosed : Folder}
        >
          {folders.map((child) => renderNode(child, depth + 1))}

          <div>{files.map((child) => renderNode(child, depth + 1))}</div>
        </FolderItem>
      )
    }

    return (
      <FileItem
        key={node.id}
        file={node}
        depth={depth}
        indentSize={INDENT_SIZE}
        Icon={getTreeIcon(node.type)}
      />
    )
  }

  return <div className="text-sm">{renderNode(tree.root, 0)}</div>
}
