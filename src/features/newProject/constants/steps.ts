import { ClipboardList, Layers, Palette, type LucideIcon } from "lucide-react"

export interface Step {
    to: string,
    title: string,
    icon: LucideIcon,
}

export const steps: Step[] = [
  {
    to: "/projetos/novo/informacoes",
    title: "Informações",
    icon: ClipboardList,
  },
  {
    to: "/projetos/novo/arquitetura",
    title: "Arquitetura",
    icon: Layers,
  },
  {
    to: "/projetos/novo/design",
    title: "Design",
    icon: Palette,
  },
]