import { createBrowserRouter, Navigate, NavLink } from "react-router"
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
    errorElement: <><p>SORRY, THERE WAS A PROBLEM </p><NavLink to="/dashboard">Return Home</NavLink></>,
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
        path: "projetos",
        children: [
          {
            index: true,
            element: <AllProjects />,
          },
          {
            path: "novo",
            element: <NewProject />,
            children: [
              {
                index: true,
                element: <Navigate to="informacoes" replace />,
              },
              {
                path: "informacoes",
                element: <GeneralInfo />,
              },
              {
                path: "arquitetura",
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
    ],
  },
])
