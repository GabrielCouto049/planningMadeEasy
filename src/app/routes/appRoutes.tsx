import { createBrowserRouter, Navigate } from "react-router"
import App from "../App"
import AllProjects from "@/features/allProjects/AllProjects"
import Dashboard from "@/features/dashboard/Dashboard"
import NewProject from "@/features/newProject/NewProject"
import GeneralInfo from "@/features/newProject/pages/GeneralInfo"
import ProjectArch from "@/features/newProject/pages/ProjectArch"
import ProjectDesign from "@/features/newProject/pages/ProjectDesign"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <p>SORRY, THERE WAS A PROBLEM</p>,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "allProjects",
        element: <AllProjects />,
      },
      {
        path: "newProject",
        element: <NewProject />,
        children: [
          {
            path: "general",
            element: <GeneralInfo />,
          },
          {
            path: "archtecture",
            element: <ProjectArch />,
          },
          {
            path: "design",
            element: <ProjectDesign />,
          },
        ],
      },
    ],
  },
])
