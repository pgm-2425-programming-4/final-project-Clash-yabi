import { createFileRoute } from '@tanstack/react-router'
import ProjectBoard from '../../components/ProjectBoard';

export const Route = createFileRoute('/projects/$projectId')({
  component: ProjectPage,
})

function ProjectPage() {
  const projectId = Route.useParams();

  return <ProjectBoard projectId={projectId} />;
}
