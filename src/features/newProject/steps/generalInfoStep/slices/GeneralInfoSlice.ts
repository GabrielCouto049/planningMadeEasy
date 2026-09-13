import type { ProjectImage, StackType } from "@/types/generalInfoType"
import type { GeneralInfoType } from "@/types/generalInfoType"
import { Folder } from "lucide-react"
import type { StateCreator } from "zustand"
import type { NewProjectState } from "@/features/newProject/stores/newProjectStore"

export type GeneralInfoSliceType = Omit<GeneralInfoType, "image"> & {
  image: ProjectImage
  setDescription: (v: string) => void
  setTitle: (v: string) => void
  setImage: (v: ProjectImage) => void
  setStack: (v: StackType | ((prev: StackType) => StackType)) => void
  setLibs: (v: string[]) => void
  setProblemSolved: (v: string) => void
  setTargetAudience: (v: string) => void
}

export const initialGeneralInfoState: Omit<GeneralInfoType, "image"> & {
  image: ProjectImage
} = {
  title: "",
  description: "",
  stack: { language: "", framework: "" },
  image: { type: "icon", icon: Folder },
  libs: [],
  problemSolved: "",
  targetAudience: "",
}

export const GeneralInfoSlice: StateCreator<
  NewProjectState,
  [],
  [],
  GeneralInfoSliceType
> = (set) => ({
  ...initialGeneralInfoState,

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
})
