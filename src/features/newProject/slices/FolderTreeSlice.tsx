import type { FolderNode, GenericNode, Node } from "@/types/folderArchType"

import type { StateCreator } from "zustand"

import type { NewProjectState } from "../stores/newProjectStore"

import {
  findNode,
  insertNode,
  isDescendant,
  removeNode,
  updateNode,
} from "../utils/folderTreeUtils"

type NodeId = GenericNode["id"]

export type FolderTreeSliceType = {
  folderStructure: {
    root: FolderNode
  }

  addNode: (parentId: NodeId, node: Node) => void

  removeNode: (id: NodeId) => void

  findNode: (id: NodeId) => Node | undefined

  moveNode: (id: NodeId, newParentId: NodeId) => void

  updateNode: (
    id: NodeId,
    data:
      | Partial<Pick<GenericNode, "title" | "description">>
      | { type: "code" | "image" | "text" }
  ) => void
}

export const FolderTreeSlice: StateCreator<
  NewProjectState,
  [],
  [],
  FolderTreeSliceType
> = (set, get) => ({
  folderStructure: {
    root: {
      id: "root",
      title: "my-project",
      description: "O diretório raiz do seu projeto",
      children: [],
    },
  },

  addNode(parentId, node) {
    set((state) => {
      const result = insertNode(state.folderStructure.root, parentId, node)

      if (!result.inserted) {
        return state
      }

      return {
        folderStructure: {
          root: result.node,
        },
      }
    })
  },

  removeNode(id) {
    set((state) => {
      if (id === "root") {
        return state
      }

      const result = removeNode(state.folderStructure.root, id)

      if (!result.removed) {
        return state
      }

      return {
        folderStructure: {
          root: result.node,
        },
      }
    })
  },

  findNode(id) {
    return findNode(get().folderStructure.root, id)
  },

  moveNode(id, newParentId) {
    set((state) => {
      const root = state.folderStructure.root

      if (id === "root") {
        return state
      }

      if (id === newParentId) {
        return state
      }

      const movedNode = findNode(root, id)
      const newParent = findNode(root, newParentId)

      if (!movedNode) {
        return state
      }

      if (!newParent || !("children" in newParent)) {
        return state
      }

      if (isDescendant(root, id, newParentId)) {
        return state
      }

      const removed = removeNode(root, id)

      if (!removed.removed) {
        return state
      }

      const inserted = insertNode(removed.node, newParentId, movedNode)

      if (!inserted.inserted) {
        return state
      }

      return {
        folderStructure: {
          root: inserted.node,
        },
      }
    })
  },

  updateNode(id, data) {
    set((state) => {
      if (id === "root") {
        const root = {
          ...state.folderStructure.root,
          ...data,
        }

        return {
          folderStructure: {
            root,
          },
        }
      }

      const result = updateNode(state.folderStructure.root, id, data)

      if (!result.updated) {
        return state
      }

      return {
        folderStructure: {
          root: result.node,
        },
      }
    })
  },
})
