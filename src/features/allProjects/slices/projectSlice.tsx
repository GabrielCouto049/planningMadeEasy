import type { GlobalStoreType } from "@/stores/globalStore"
import type { ProjectType } from "@/types/projectType"
import { Globe, ShoppingCart } from "lucide-react"
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
      title: "E-commerce",
      description: "Loja virtual para venda de roupas.",
      lastEdited: new Date("2026-08-03"),
      progress: 100,
      image: {
        type: "icon",
        value: ShoppingCart,
      },
    },
    {
      id: "project-3",
      title: "Portfólio",
      description: "Meu site pessoal desenvolvido em React.",
      lastEdited: new Date("2026-08-01"),
      progress: 25,
      image: {
        type: "icon",
        value: Globe,
      },
    },
    {
      id: "project-4",
      title: "Weather App",
      description: "Consulta de previsão do tempo.",
      lastEdited: new Date("2026-07-28"),
      progress: 100,
      image: {
        type: "image",
        value: "https://picsum.photos/200?random=1",
      },
    },
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
