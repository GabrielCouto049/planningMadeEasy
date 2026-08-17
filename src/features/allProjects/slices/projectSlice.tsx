import type { GlobalStoreType } from "@/stores/globalStore"
import type { ProjectType } from "@/types/projectType"
import { ShoppingCart } from "lucide-react"
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
  // ===== HARDCODED FOR TEST ===== //
  projects: [
    {
      id: "project-2",
      lastEdited: new Date("2026-08-03"),
      progress: 100,
      general: {
        title: "E-commerce",
        description: "Loja virtual para venda de roupas.",
        image: {
          type: "icon",
          value: ShoppingCart,
        },
        libs: [],
        stack: {
          language: "JS",
          framework: "React",
        },
        problemSolved: "Cats eating dirt",
        targetAudience: "Cats"
      },
    }
  ],

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
