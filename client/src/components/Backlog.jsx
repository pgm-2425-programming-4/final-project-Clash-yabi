import React from "react";
import { Route } from "../routes/projects/$projectid/backlog.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchBacklogTasks } from "../api/tasks.js";

function Backlog() {
  const { projectId } = Route.useParams(); // gebruik juiste naam!

  const { data, isLoading, isError } = useQuery({
    queryKey: ["backlog", projectId],
    queryFn: () => fetchBacklogTasks(projectId),
  });

  if (isLoading) return <p>Laden...</p>;
  if (isError) return <p>Fout bij ophalen.</p>;

  return (
    <div>
      <h1>Backlog – {projectId.toUpperCase()}</h1>
      <ul>
        {data?.data.map((task) => (
          <li key={task.id}>{task.attributes.Title}</li>
        ))}
      </ul>
    </div>
  );
}
export default Backlog;
