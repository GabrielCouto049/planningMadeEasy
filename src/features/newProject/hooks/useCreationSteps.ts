import { useLocation } from "react-router"
import { steps } from "../constants/steps"

export function useCreationSteps() {
  const location = useLocation()

  const currentIndex = steps.findIndex(
    (step) => step.to === location.pathname
  )

  return {
    currentIndex,
    currentStep: steps[currentIndex],
    previousStep: steps[currentIndex - 1],
    nextStep: steps[currentIndex + 1],
  }
}