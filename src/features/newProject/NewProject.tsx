import { Outlet } from "react-router"

import Stepper from "./components/Stepper"
import NavButtons from "./components/NavButtons"

export default function NewProject() {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-12">
        <Stepper />
        <section>
          <Outlet />
        </section>
      </div>
      <NavButtons />
    </div>
  )
}
