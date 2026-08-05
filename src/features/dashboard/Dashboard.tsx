import { Globe, ShoppingCart, ToolCase } from "lucide-react"
import RecentProjects from "../../components/shared/ProjectCard"
import UnfinishedProjectCard from "./Components/UnfinishedProjectCard"
import type { ProjectType } from "../../types/projectType"

// === PLACEHOLDERS === //

const unfinishedProject: ProjectType = {
  title: "Project 1",
  description: "A project about a cat",
  lastEdited: new Date(),
  progress: 50,
  image: {
    type: "icon",
    value: ToolCase,
  },
}

const recentProjects: ProjectType[] = [
  {
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
    title: "Weather App",
    description: "Consulta de previsão do tempo.",
    lastEdited: new Date("2026-07-28"),
    progress: 100,
    image: {
      type: "image",
      value: "https://picsum.photos/200?random=1",
    },
  },
]

// ===== //

export default function Dashboard() {
  return (
    <>
      <h1 className="sectionTitle">DashBoard</h1>

      <section className="mb-12">
        <h2 className="label text-sm">Continue de onde parou</h2>
        <UnfinishedProjectCard project={unfinishedProject} />
      </section>
      <section className="mb-12">
        <h2 className="label text-sm">Projetos Recentes</h2>
        <RecentProjects projects={recentProjects} />
      </section>
    </>
  )
}
