import UnfinishedProjectCard from "./components/UnfinishedProjectCard"
import type { ProjectType } from "@/types/projectType"
import useGlobalStore from "@/stores/globalStore"
import ProjectCard from "@/components/shared/ProjectCard"

// === PLACEHOLDERS === //

const unfinishedProject: ProjectType = {
  id: "project-1",
  lastEdited: new Date(),
  progress: 50,
  general: {
    description: "skmkamf",
    libs: ["kasdas", "asfasfa"],
    problemSolved: "iksfafa",
    stack: {
      framework: "dsfasfa",
      language: "asdasfa",
    },
    targetAudience: "safafasf",
    title: "asfasfasf",
  },
  folderArch: {
    root: {
      id: "root",
      description: "The root directory of your project",
      title: "ROOT",
      children: [],
      isOpen: true,
    },
  },
  design: {
    colors: {
      primary: "#000000",
      secundary: "#000000",
      neutral: "#000000",
      background: "#000000",
    },
    fonts: {
      base: "Inter",
      functional: "Inter",
      headings: "Inter",
    },
    rounding: "large",
    shadow: "medium",
    spacing: "spacious",
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
