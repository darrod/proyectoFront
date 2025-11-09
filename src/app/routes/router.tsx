import { createBrowserRouter, RouteObject } from "react-router-dom";
import { RootLayout } from "@/app/layouts/RootLayout.tsx";
import { HomePage } from "@/features/home/pages/HomePage.tsx";
import { ExperiencesPage } from "@/features/experiences/pages/ExperiencesPage.tsx";
import { ServicesPage } from "@/features/services/pages/ServicesPage.tsx";
import { NotFoundPage } from "@/features/misc/pages/NotFoundPage.tsx";
import { PlanningPage } from "@/features/planning/pages/PlanningPage.tsx";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "experiencias", element: <ExperiencesPage /> },
      { path: "servicios", element: <ServicesPage /> },
      { path: "planificacion", element: <PlanningPage /> }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
];

export const appRouter = createBrowserRouter(routes);

