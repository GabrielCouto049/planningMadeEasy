import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./styles/index.css"
import { ThemeProvider } from "@/app/providers/theme-provider.tsx"
import { router } from "@/app/routes/appRoutes.tsx"
import { RouterProvider } from "react-router"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
)
