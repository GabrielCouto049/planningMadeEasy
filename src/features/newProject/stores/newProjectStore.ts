import { create, type StateCreator } from "zustand" // <-- Importe o StateCreator
import { immer } from "zustand/middleware/immer"
import useGlobalStore from "@/stores/globalStore"
import type { GeneralInfoType } from "@/types/generalInfoType"
import validateProject, {
  type GeneralInfoErrors,
} from "../steps/generalInfoStep/utils/validateProject"
import {
  type GeneralInfoSliceType,
  GeneralInfoSlice,
} from "../steps/generalInfoStep/slices/GeneralInfoSlice"
import {
  FolderTreeSlice,
  type FolderTreeSliceType,
} from "../steps/architectureStep/slices/FolderTreeSlice"

export type NewProjectState = GeneralInfoSliceType &
  FolderTreeSliceType & {
    errors: GeneralInfoErrors
    updateErrors: (data: GeneralInfoType) => boolean
    saveProject: () => void
  }

type NewProjectStateCreator = StateCreator<
  NewProjectState,
  [["zustand/immer", never]]
>

const storeApi: NewProjectStateCreator = (set, get, store) => ({
  ...GeneralInfoSlice(set, get, store),
  ...FolderTreeSlice(set, get, store),

  errors: {},

  updateErrors: (data: GeneralInfoType) => {
    const errors = validateProject(data)

    set({ errors })

    return Object.keys(errors).length === 0
  },

  saveProject: () => {
    const {
      title,
      description,
      image,
      stack,
      libs,
      problemSolved,
      targetAudience,
      updateErrors,
    } = get()

    const general: GeneralInfoType = {
      title,
      description,
      image,
      stack,
      libs,
      problemSolved,
      targetAudience,
    }

    if (updateErrors(general)) {
      useGlobalStore.getState().addProject({
        id: crypto.randomUUID(),
        lastEdited: new Date(),
        progress: 0,
        general,
      })
    }
  },
})

const useNewProjectStore = create<NewProjectState>()(immer(storeApi))

export default useNewProjectStore
