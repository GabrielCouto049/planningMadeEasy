import type { FolderNode, Node } from "@/types/folderTreeTypes"
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

  function renderNode(
    node: Node,
    depth: number,
    index: number,
    parentId: string
  ) {
    if ("children" in node) {
      return (
        <FolderItem
          key={node.id}
          folder={node}
          depth={depth}
          indentSize={INDENT_SIZE}
          onToggle={toggleFolder}
          Icon={node.isOpen ? FolderClosed : Folder}
          index={index}
          parentId={parentId}
          isRoot={node.id === "root"}
        >
          {node.children.map((child, childIndex) =>
            renderNode(child, depth + 1, childIndex, node.id)
          )}
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
        index={index}
        parentId={parentId}
      />
    )
  }

  return (
    <div className="text-sm">{renderNode(tree.root, 0, 0, tree.root.id)}</div>
  )
}
