import { createFileRoute } from "@tanstack/react-router";
import PaginatedBacklog from "../../../components/PaginatedBacklog";

export const Route = createFileRoute("/projects/$temp/backlog")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PaginatedBacklog />;
}