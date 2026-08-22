import {
  FileCode,
  FileImage,
  FileText,
  Folder,
} from "lucide-react"
import type { FileNode, FolderNode } from "@/types/folderArchType"

type TreeNode = FileNode | FolderNode

const ICON_CLASS = "size-4 shrink-0 text-muted-foreground"

function NodeIcon({ node }: { node: TreeNode }) {
  if ("children" in node) return <Folder className={ICON_CLASS} />

  switch (node.type) {
    case "code":
      return <FileCode className={ICON_CLASS} />
    case "image":
      return <FileImage className={ICON_CLASS} />
    default:
      return <FileText className={ICON_CLASS} />
  }
}

interface TreeRowProps {
  node: TreeNode
  depth: number
}

function TreeRow({ node, depth }: TreeRowProps) {
  return (
    <div
      className="flex items-center gap-2 rounded-md py-1 text-sm"
      style={{ paddingLeft: depth * 16 }}
    >
      <NodeIcon node={node} />
      <span className="truncate">{node.title}</span>
    </div>
  )
}

interface FolderTreeProps {
  node: FolderNode
  depth?: number
}

export default function FolderTree({ node, depth = 0 }: FolderTreeProps) {
  return (
    <div>
      <TreeRow node={node} depth={depth} />

      {node.children.map((child) =>
        "children" in child ? (
          <FolderTree
            key={child.id}
            node={child}
            depth={depth + 1}
          />
        ) : (
          <TreeRow
            key={child.id}
            node={child}
            depth={depth + 1}
          />
        )
      )}
    </div>
  )
}