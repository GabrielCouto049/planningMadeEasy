import { create } from "zustand"

import { projectsSlice, type ProjectSliceType } from "@/features/allProjects/slices/projectSlice"

export type GlobalStoreType = ProjectSliceType

const useGlobalStore = create<GlobalStoreType>((...a) => ({
  ...projectsSlice(...a)
}))

export default useGlobalStore
