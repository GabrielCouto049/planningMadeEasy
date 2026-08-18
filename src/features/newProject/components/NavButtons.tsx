import { NavLink } from "react-router";
import { useCreationSteps } from "../hooks/useCreationSteps";
import { buttonVariants } from "@/components/ui/button";
import useNewProjectStore from "../stores/newProjectStore";

export default function NavButtons() {
  const { previousStep, nextStep } = useCreationSteps();
  const saveProject = useNewProjectStore((state) => state.saveProject);

  return (
    <footer className="mt-12 flex items-center justify-end gap-3 border-t border-border pt-6">
      {previousStep ? (
        <NavLink
          to={previousStep.to}
          className={buttonVariants({ variant: "outline" })}
        >
          Voltar
        </NavLink>
      ) : (
        <span />
      )}

      {nextStep ? (
        <NavLink to={nextStep.to} className={buttonVariants()}>
          Próximo passo
        </NavLink>
      ) : (
        <button className={buttonVariants()} onClick={saveProject}>
          Salvar
        </button>
      )}
    </footer>
  );
}