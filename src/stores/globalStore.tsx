import { create } from "zustand"
import type { ProjectType } from "@/types/projectType"

interface GlobalStoreType {
  projects: ProjectType[]
  addProject: (project: ProjectType) => void
  deleteProject: (id: ProjectType["id"]) => void
  updateProject: (
    id: ProjectType["id"],
    properties: Partial<ProjectType>
  ) => void
}

//all this will be moved to projectSlice

const useGlobalStore = create<GlobalStoreType>((set) => ({
  projects: [],

  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),

  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
    })),

  updateProject: (id, properties) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id ? { ...project, ...properties } : project
      ),
    })),
}))

export default useGlobalStore
