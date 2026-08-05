import { NavLink } from "react-router"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { buttonVariants } from "@/components/ui/button"
import useGlobalStore from "@/stores/globalStore"
import ProjectCard from '@/components/shared/ProjectCard'

export default function AllProjects() {
  const allProjects = useGlobalStore((state) => state.projects)

  return (
    <>
      <h1 className="sectionTitle">Projetos</h1>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
        <div className="flex flex-wrap gap-3">
          <Select>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="completo">Completo</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Filtrar por categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <NavLink to="/projetos/novo" className={buttonVariants()}>
          Novo Projeto
        </NavLink>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {allProjects.map(project => <ProjectCard key={project.id} project={project}/>)}
      </div>
    </>
  )
}
