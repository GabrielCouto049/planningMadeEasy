import {
  Baby,
  BriefcaseBusiness,
  Gem,
  List,
  Rocket,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

export interface ProjectStyleCard {
  Icon: LucideIcon
  title: string
}

export const PROJECT_STYLE_CARDS: ProjectStyleCard[] = [
  {
    Icon: Sparkles,
    title: "Minimalista",
  },
  {
    Icon: Rocket,
    title: "Moderno",
  },
  {
    Icon: BriefcaseBusiness,
    title: "Corporativo",
  },
  {
    Icon: Baby,
    title: "Feliz",
  },
  {
    Icon: Gem,
    title: "Elegante",
  },
  {
    Icon: List,
    title: "Personalizado",
  },
]
