import { create, type StateCreator } from "zustand"
import { immer } from "zustand/middleware/immer"
import useGlobalStore from "@/stores/globalStore"
import type { GeneralInfoType, ProjectImage } from "@/types/generalInfoType"
import validateProject, {
  type GeneralInfoErrors,
} from "@/features/newProject/steps/generalInfoStep/utils/validateProject"
import {
  type GeneralInfoSliceType,
  GeneralInfoSlice,
  initialGeneralInfoState,
} from "@/features/newProject/steps/generalInfoStep/slices/GeneralInfoSlice"
import {
  FolderTreeSlice,
  type FolderTreeSliceType,
  initialFolderTreeState,
} from "@/features/newProject/steps/architectureStep/slices/FolderTreeSlice"
import {
  DesignSlice,
  type DesignSliceType,
  initialDesignState,
} from "@/features/newProject/steps/designStep/slices/DesignSlice"

export type NewProjectState = GeneralInfoSliceType &
  FolderTreeSliceType &
  DesignSliceType & {
    errors: GeneralInfoErrors
    updateErrors: (data: GeneralInfoType) => boolean
    saveProject: () => boolean
    resetProject: () => void
  }

export function selectGeneralInfo(
  state: NewProjectState
): Omit<GeneralInfoType, "image"> & { image: ProjectImage } {
  return {
    title: state.title,
    description: state.description,
    image: state.image,
    stack: state.stack,
    libs: state.libs,
    problemSolved: state.problemSolved,
    targetAudience: state.targetAudience,
  }
}

type NewProjectStateCreator = StateCreator<
  NewProjectState,
  [["zustand/immer", never]]
>

const storeApi: NewProjectStateCreator = (set, get, store) => ({
  ...GeneralInfoSlice(set, get, store),
  ...FolderTreeSlice(set, get, store),
  ...DesignSlice(set, get, store),

  errors: {},

  updateErrors: (data: GeneralInfoType) => {
    const errors = validateProject(data)

    set({ errors })

    return Object.keys(errors).length === 0
  },

  saveProject: () => {
    const state = get()
    const general = selectGeneralInfo(state)

    if (!state.updateErrors(general)) {
      return false
    }

    useGlobalStore.getState().addProject({
      id: crypto.randomUUID(),
      lastEdited: new Date(),
      progress: 0,
      general,
      folderArch: state.tree,
      design: {
        colors: state.colors,
        fonts: state.fonts,
        rounding: state.rounding,
        shadow: state.shadow,
        spacing: state.spacing,
      },
    })

    return true
  },

  resetProject: () =>
    set({
      ...initialGeneralInfoState,
      ...initialFolderTreeState,
      ...initialDesignState,
      errors: {},
    }),
})

const useNewProjectStore = create<NewProjectState>()(immer(storeApi))

export default useNewProjectStore
