import { NavLink, useNavigate } from "react-router"
import { useShallow } from "zustand/react/shallow"
import { useCreationSteps } from "../hooks/useCreationSteps"
import { buttonVariants } from "@/components/ui/button"
import useNewProjectStore, {
  selectGeneralInfo,
} from "@/features/newProject/stores/newProjectStore"

export default function NavButtons() {
  const { currentIndex, previousStep, nextStep } = useCreationSteps()
  const navigate = useNavigate()

  const general = useNewProjectStore(useShallow(selectGeneralInfo))
  const updateErrors = useNewProjectStore((state) => state.updateErrors)
  const saveProject = useNewProjectStore((state) => state.saveProject)
  const resetProject = useNewProjectStore((state) => state.resetProject)

  function handleNext() {
    if (!nextStep) return

    // Valida o passo de Informações antes de avançar
    if (currentIndex === 0 && !updateErrors(general)) {
      return
    }

    navigate(nextStep.to)
  }

  function handleSave() {
    if (!saveProject()) {
      navigate("/projetos/novo/informacoes")
      return
    }

    resetProject()
    navigate("/projetos")
  }

  return (
    <footer className="flex justify-end gap-3 border-t border-border p-3">
      {previousStep && (
        <NavLink
          to={previousStep.to}
          className={buttonVariants({ variant: "outline" })}
        >
          Voltar
        </NavLink>
      )}

      {nextStep ? (
        <button className={buttonVariants()} onClick={handleNext}>
          Próximo passo
        </button>
      ) : (
        <button className={buttonVariants()} onClick={handleSave}>
          Salvar
        </button>
      )}
    </footer>
  )
}
