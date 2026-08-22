import type {
  FileNode,
  FolderNode,
  GenericNode,
  Node,
} from "@/types/folderArchType"

type NodeId = GenericNode["id"]

type InsertResult = {
  node: FolderNode
  inserted: boolean
}

type RemoveResult = {
  node: FolderNode
  removed: Node | undefined
}

type UpdateResult = {
  node: FolderNode
  updated: boolean
}

export function findNode(
  node: Node,
  id: NodeId,
): Node | undefined {
  if (node.id === id) {
    return node
  }

  if ("children" in node) {
    for (const child of node.children) {
      const result = findNode(child, id)

      if (result) {
        return result
      }
    }
  }

  return undefined
}

export function insertNode(
  node: FolderNode,
  parentId: NodeId,
  newNode: Node,
): InsertResult {
  if (node.id === parentId) {
    return {
      node: {
        ...node,
        children: [...node.children, newNode],
      },
      inserted: true,
    }
  }

  let inserted = false

  const children = node.children.map((child) => {
    if (!("children" in child)) {
      return child
    }

    if (inserted) {
      return child
    }

    const result = insertNode(child, parentId, newNode)

    inserted = result.inserted

    return result.node
  })

  return {
    node: {
      ...node,
      children,
    },
    inserted,
  }
}

export function removeNode(
  node: FolderNode,
  id: NodeId,
): RemoveResult {
  let removed: Node | undefined

  const children = node.children
    .filter((child) => {
      if (child.id === id) {
        removed = child
        return false
      }

      return true
    })
    .map((child) => {
      if (!("children" in child) || removed) {
        return child
      }

      const result = removeNode(child, id)

      removed = result.removed

      return result.node
    })

  return {
    node: {
      ...node,
      children,
    },
    removed,
  }
}

export function updateNode(
  node: FolderNode,
  id: NodeId,
  data: Partial<Pick<GenericNode, "title" | "description">>
    | { type: FileNode["type"] },
): UpdateResult {
  if (node.id === id) {
    return {
      node: {
        ...node,
        ...data,
      },
      updated: true,
    }
  }

  let updated = false

  const children = node.children.map((child) => {
    if (child.id === id) {
      updated = true

      return {
        ...child,
        ...data,
      }
    }

    if (!("children" in child) || updated) {
      return child
    }

    const result = updateNode(child, id, data)

    updated = result.updated

    return result.node
  })

  return {
    node: {
      ...node,
      children,
    },
    updated,
  }
}

export function isDescendant(
  node: FolderNode,
  ancestorId: NodeId,
  targetId: NodeId,
): boolean {
  const ancestor = findNode(node, ancestorId)

  if (!ancestor || !("children" in ancestor)) {
    return false
  }

  return findNode(ancestor, targetId) !== undefined
}