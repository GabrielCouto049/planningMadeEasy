import { Fragment } from "react"
import { Link } from "react-router"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { steps } from "../constants/steps"
import { useCreationSteps } from "../hooks/useCreationSteps"

export default function Stepper() {
  const { currentIndex } = useCreationSteps()

  return (
    <nav className="card px-6 py-5">
      <ol className="flex items-start justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isDone = index < currentIndex
          const isCurrent = index === currentIndex

          return (
            <Fragment key={step.to}>
              <li>
                <Link
                  to={step.to}
                  className="group flex flex-col items-center gap-2"
                >
                  <span
                    className={cn(
                      "flex size-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                      isCurrent &&
                        "border-primary bg-primary text-primary-foreground ring-4 ring-primary/15",
                      isDone &&
                        "border-primary bg-primary text-primary-foreground",
                      !isCurrent &&
                        !isDone &&
                        "border-border bg-background text-muted-foreground group-hover:border-muted-foreground/50 group-hover:text-foreground"
                    )}
                  >
                    {isDone ? (
                      <Check className="size-3.5" />
                    ) : (
                      <Icon className="size-3.5" />
                    )}
                  </span>

                  <span
                    className={cn(
                      "text-xs font-medium transition-colors",
                      isCurrent || isDone
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                </Link>
              </li>

              {index < steps.length - 1 && (
                <li
                  aria-hidden="true"
                  className={cn(
                    "mx-3 mt-4 h-px flex-1 transition-colors",
                    index < currentIndex ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
