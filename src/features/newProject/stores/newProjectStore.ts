import { create } from "zustand"

import useGlobalStore from "@/stores/globalStore"
import type GeneralInfoType from "@/types/generalInfoType"

import validateProject, {
  type GeneralInfoErrors,
} from "../utils/validateProject"

import {
  type GeneralInfoSliceType,
  GeneralInfoSlice,
} from "../slices/GeneralInfoSlice"

import {
  type FolderTreeSliceType,
  FolderTreeSlice,
} from "../slices/FolderTreeSlice"

export type NewProjectState = GeneralInfoSliceType &
  FolderTreeSliceType & {
    errors: GeneralInfoErrors
    updateErrors: (data: GeneralInfoType) => boolean
    saveProject: () => void
  }

const useNewProjectStore = create<NewProjectState>((set, get, store) => ({
  ...GeneralInfoSlice(set, get, store),
  ...FolderTreeSlice(set, get, store),

  errors: {},

  updateErrors: (data) => {
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
}))

export default useNewProjectStore
