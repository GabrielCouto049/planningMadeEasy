import { ToolCase } from "lucide-react"
import UnfinishedProjectCard from "./Components/UnfinishedProjectCard"
import type { ProjectType } from "../../types/projectType"
import useGlobalStore from "@/stores/globalStore"
import ProjectCard from "../../components/shared/ProjectCard"

// === PLACEHOLDERS === //

const unfinishedProject: ProjectType = {
  id: "project-1",
  title: "Project 1",
  description: "A project about a cat",
  lastEdited: new Date(),
  progress: 50,
  image: {
    type: "icon",
    value: ToolCase,
  },
}

// ===== //

export default function Dashboard() {
  const projects = useGlobalStore((state) => state.projects)

  return (
    <>
      <h1 className="sectionTitle">DashBoard</h1>

      <section className="mb-12">
        <h2 className="label text-sm">Continue de onde parou</h2>
        <UnfinishedProjectCard project={unfinishedProject} />
      </section>
      <section className="mb-12">
        <h2 className="label text-sm">Projetos Recentes</h2>
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
      </section>
    </>
  )
}
