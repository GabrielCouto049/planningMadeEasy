import type { StateCreator } from "zustand"
import { current } from "immer"
import type { NewProjectState } from "@/features/newProject/stores/newProjectStore"
import type {
  FolderNode,
  GenericNodeProps,
  Node,
} from "@/types/folderTreeTypes"

export interface FolderTreeSliceType {
  tree: { root: FolderNode }
  addNode: (parent: GenericNodeProps["id"], files: Node | Node[]) => void
  remNode: (id: GenericNodeProps["id"]) => Node | null
  updateNode: (
    id: GenericNodeProps["id"],
    props: Partial<GenericNodeProps>
  ) => void
  moveNode: (source: GenericNodeProps["id"], target: GenericNodeProps["id"]) => void
  toggleFolder: (id: GenericNodeProps["id"], open?: boolean) => void
}

export const FolderTreeSlice: StateCreator<
  NewProjectState,
  [["zustand/immer", never]],
  [],
  FolderTreeSliceType
> = (set, get) => ({
  tree: {
    root: {
      id: "root",
      description: "The root directory of your project",
      title: "ROOT",
      children: [
        {
          id: "folder-src",
          title: "src",
          description: "source folder",
          isOpen: true,
          children: [
            { id: "file-main", title: "main.tsx", description: "", type: "code" },
            { id: "file-app", title: "App.tsx", description: "", type: "code" },
            {
              id: "folder-components",
              title: "components",
              description: "ui components",
              isOpen: false,
              children: [
                {
                  id: "file-button",
                  title: "Button.tsx",
                  description: "",
                  type: "code",
                },
              ],
            },
          ],
        },
        { id: "file-readme", title: "README.md", description: "", type: "text" },
        {
          id: "folder-assets",
          title: "assets",
          description: "assets folder",
          isOpen: false,
          children: [
            {
              id: "file-logo",
              title: "logo.png",
              description: "",
              type: "image",
            },
          ],
        },
      ],
      isOpen: true,
    },
  },

  addNode(parentId, files) {
  set((state) => {
    function recursiveInsert(curr: FolderNode): boolean {
      if (curr.id === parentId) {
        curr.children.push(
          ...(Array.isArray(files) ? files : [files])
        )
        return true
      }

      for (const child of curr.children) {
        if ("children" in child) {
          if (recursiveInsert(child)) {
            return true
          }
        }
      }

      return false
    }

    recursiveInsert(state.tree.root)
  })
},

  remNode(id) {
    let removedNode: Node | null = null

    set((state) => {
      function recursiveRemove(curr: FolderNode): boolean {
        const targetIndex = curr.children.findIndex((child) => child.id === id)

        if (targetIndex !== -1) {
          removedNode = current(curr.children[targetIndex])

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

    return removedNode
  },

  moveNode(source, target) {
    const movedNode = get().remNode(target);

    if (movedNode) {
      get().addNode(source, movedNode)
    }
  },

  updateNode(id, props) {
    set((state) => {
      function recursiveUpdate(curr: FolderNode) {
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
})
