import { NavLink } from "react-router"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { buttonVariants } from "@/components/ui/button"
import useGlobalStore from "@/stores/globalStore"
import ProjectCard from "@/components/shared/ProjectCard"
import { SearchIcon } from "lucide-react"

export default function AllProjects() {
  const allProjects = useGlobalStore((state) => state.projects)

  return (
    <>
      <h1 className="sectionTitle">Projetos</h1>

      <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
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

        <div className="flex gap-3">
          <InputGroup className="w-72 px-3 py-2">
            <InputGroupInput placeholder="Buscar Projetos" />
            <InputGroupAddon align="inline-end">
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
          
          <NavLink to="/projetos/novo" className={buttonVariants()}>
            Novo Projeto
          </NavLink>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {allProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  )
}
