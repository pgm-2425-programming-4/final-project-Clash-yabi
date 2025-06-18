import { createFileRoute } from '@tanstack/react-router'
import ProjectBoard from '../../components/ProjectBoard';
import { Outlet } from "@tanstack/react-router";
import { useMatchRoute } from "@tanstack/react-router";


export const Route = createFileRoute('/projects/$projectId')({
  component: ProjectPage,
})

function ProjectPage() {
  const { projectId } = Route.useParams();
  const matchRoute = useMatchRoute();

  const isBacklogRoute = matchRoute({
    to: "/projects/$projectId/backlog",
    params: { projectId },
    fuzzy: false,
  });


  return (
    <div>
      {!isBacklogRoute && <ProjectBoard projectId={projectId} />}
      <Outlet />
    </div>
  );
}