import type { StateCreator } from "zustand"
import type { NewProjectState } from "@/features/newProject/stores/newProjectStore"
import type {
  FolderNode,
  GenericNodeProps,
  Node,
} from "@/types/folderTreeTypes"

function findParentInfo(
  curr: FolderNode,
  id: string
): { parent: FolderNode; index: number } | null {
  const foundIndex = curr.children.findIndex((child) => child.id === id)

  if (foundIndex !== -1) {
    return { parent: curr, index: foundIndex }
  }

  for (const child of curr.children) {
    if ("children" in child) {
      const found = findParentInfo(child, id)

      if (found) {
        return found
      }
    }
  }

  return null
}

function findFolder(root: FolderNode, id: string): FolderNode | null {
  if (root.id === id) {
    return root
  }

  for (const child of root.children) {
    if ("children" in child) {
      const found = findFolder(child, id)

      if (found) {
        return found
      }
    }
  }

  return null
}

function insertChild(
  root: FolderNode,
  parentId: string,
  index: number | undefined,
  files: Node | Node[]
): boolean {
  const items = Array.isArray(files) ? files : [files]

  if (root.id === parentId) {
    const at =
      index === undefined || index < 0 || index > root.children.length
        ? root.children.length
        : index

    root.children.splice(at, 0, ...items)

    return true
  }

  for (const child of root.children) {
    if ("children" in child) {
      if (insertChild(child, parentId, index, files)) {
        return true
      }
    }
  }

  return false
}

export interface FolderTreeSliceType {
  tree: { root: FolderNode }

  addNode: (
    parent: GenericNodeProps["id"],
    files: Node | Node[],
    index?: number
  ) => void

  remNode: (id: GenericNodeProps["id"]) => void

  updateNode: (
    id: GenericNodeProps["id"],
    props: Partial<GenericNodeProps>
  ) => void

  moveNode: (
    source: GenericNodeProps["id"],
    targetParent: GenericNodeProps["id"],
    targetIndex?: number
  ) => void

  toggleFolder: (id: GenericNodeProps["id"], open?: boolean) => void

  findNode: (id: GenericNodeProps["id"]) => Node | null
}

export const initialFolderTreeState: { tree: { root: FolderNode } } = {
  tree: {
    root: {
      id: "root",
      description: "The root directory of your project",
      title: "ROOT",
      children: [],
      isOpen: true,
    },
  },
}

export const FolderTreeSlice: StateCreator<
  NewProjectState,
  [["zustand/immer", never]],
  [],
  FolderTreeSliceType
> = (set, get) => ({
  ...initialFolderTreeState,

  addNode(parentId, files, index) {
    set((state) => {
      insertChild(state.tree.root, parentId, index, files)
    })
  },

  remNode(id) {
    set((state) => {
      function recursiveRemove(curr: FolderNode): boolean {
        const targetIndex = curr.children.findIndex((child) => child.id === id)

        if (targetIndex !== -1) {
          curr.children.splice(targetIndex, 1)

          return true
        }

        for (const child of curr.children) {
          if ("children" in child) {
            if (recursiveRemove(child)) {
              return true
            }
          }
        }

        return false
      }

      recursiveRemove(state.tree.root)
    })
  },

  moveNode(source, targetParent, targetIndex) {
    set((state) => {
      if (!source || source === targetParent) return

      const info = findParentInfo(state.tree.root, source)

      if (!info) return

      const [moved] = info.parent.children.splice(info.index, 1)

      if (!moved) return

      if ("children" in moved && findFolder(moved, targetParent)) {
        info.parent.children.splice(info.index, 0, moved)

        return
      }

      let index = targetIndex

      if (info.parent.id === targetParent) {
        index =
          targetIndex === undefined
            ? info.parent.children.length
            : targetIndex > info.index
              ? targetIndex - 1
              : targetIndex

        if (index === info.index) {
          info.parent.children.splice(info.index, 0, moved)

          return
        }
      }

      if (!insertChild(state.tree.root, targetParent, index, moved)) {
        info.parent.children.splice(info.index, 0, moved)
      }
    })
  },

  updateNode(id, props) {
    set((state) => {
      function recursiveUpdate(curr: FolderNode): boolean {
        const targetIndex = curr.children.findIndex((child) => child.id === id)

        if (targetIndex !== -1) {
          curr.children[targetIndex] = {
            ...curr.children[targetIndex],
            ...props,
          }

          return true
        }

        for (const child of curr.children) {
          if ("children" in child) {
            if (recursiveUpdate(child)) {
              return true
            }
          }
        }

        return false
      }

      recursiveUpdate(state.tree.root)
    })
  },

  toggleFolder(id, open) {
    set((state) => {
      function recursiveToggle(curr: FolderNode): boolean {
        if (curr.id === id) {
          curr.isOpen = open ?? !curr.isOpen

          return true
        }

        for (const child of curr.children) {
          if ("children" in child) {
            if (recursiveToggle(child)) {
              return true
            }
          }
        }

        return false
      }

      recursiveToggle(state.tree.root)
    })
  },

  findNode(id) {
    function recursiveSearch(curr: Node): Node | null {
      if (curr.id === id) {
        return curr
      }

      if ("children" in curr) {
        for (const child of curr.children) {
          const found = recursiveSearch(child)

          if (found) {
            return found
          }
        }
      }

      return null
    }

    return recursiveSearch(get().tree.root)
  },
})
