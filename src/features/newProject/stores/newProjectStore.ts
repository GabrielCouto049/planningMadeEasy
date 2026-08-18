import { create } from "zustand"
import type { ProjectImage, StackType } from "@/types/generalInfoType"
import { Folder } from "lucide-react"
import useGlobalStore from "@/stores/globalStore"
import type GeneralInfoType from "@/types/generalInfoType"
import validateProject from "../utils/validateProject"

type NewProjectState = GeneralInfoType & {
  setDescription: (v: string) => void
  setTitle: (v: string) => void
  setImage: (v: ProjectImage) => void
  setStack: (v: StackType | ((prev: StackType) => StackType)) => void
  setLibs: (v: string[]) => void
  setProblemSolved: (v: string) => void
  setTargetAudience: (v: string) => void
  saveProject: () => void
}

const useNewProjectStore = create<NewProjectState>((set, get) => ({
  title: "",
  description: "",
  stack: { language: "", framework: "" },
  image: { type: "icon", icon: Folder },
  libs: [],
  problemSolved: "",
  targetAudience: "",

  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setImage: (image) => set({ image }),
  setStack: (stack) =>
    set((state) => ({
      stack: typeof stack === "function" ? stack(state.stack) : stack,
    })),
  setLibs: (libs) => set({ libs }),
  setProblemSolved: (problemSolved) => set({ problemSolved }),
  setTargetAudience: (targetAudience) => set({ targetAudience }),

  saveProject: () => {
    const projectInfo = get(); // Need to be changed later

    if (validateProject(projectInfo)) {
      useGlobalStore.getState().addProject({
      id: crypto.randomUUID(),
      lastEdited: new Date(),
      progress: 0,
      general: {
        ...projectInfo
      },
    })
    }
  }
}))

export default useNewProjectStore
