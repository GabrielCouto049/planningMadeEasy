import type { GlobalStoreType } from "@/stores/globalStore"
import type { ProjectType } from "@/types/projectType"
import type { StateCreator } from "zustand"

export interface ProjectSliceType {
  projects: ProjectType[]
  addProject: (project: ProjectType) => void
  deleteProject: (id: ProjectType["id"]) => void
  updateProject: (
    id: ProjectType["id"],
    properties: Partial<ProjectType>
  ) => void
}

export const projectsSlice: StateCreator<
  GlobalStoreType,
  [],
  [],
  ProjectSliceType
> = (set) => ({
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
})
