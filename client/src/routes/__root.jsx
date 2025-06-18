import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "../components/sidebar";
import "../styles/app.css";
const projects = [
  { id: "pgm3", name: "PGM3" },
  { id: "pgm4", name: "PGM4" },
];

export const Route = createRootRoute({
  component: () => (
   <>
      <Navbar projects={projects} />
      <div className="app__content">
        <Outlet />
        <TanStackRouterDevtools />
      </div>
   </>
  ),
});
