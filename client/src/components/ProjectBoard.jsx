import FilterBar from "./FilterBar";
import TaskCard from "./TaskCard";
import { Route } from "../routes/projects/$projectId";
import { API_URL, API_TOKEN } from "../constants/constant";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import "../styles/boardheader.css"


const fetchTasksForProject = async (projectSlug) => {
    const url = `${API_URL}/projects?filters[slug][$eq]=${projectSlug}&populate[tasks][populate]=currentstate`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Strapi fout (tasks):", errorText);
    throw new Error("Fout bij het ophalen van taken");
  }

    const data = await response.json();
    console.log("Volledige API-response:", JSON.stringify(data, null, 2));

    
    return data.data?.[0]?.tasks || [];
};
  
  
const fetchStatuses = async () => {
  const url = `${API_URL}/statuses?sort=order:asc`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Strapi fout (statuses):", errorText);
    throw new Error("Fout bij het ophalen van statussen");
  }

  const data = await response.json();
  return data.data;
};

export default function ProjectBoard() {
  const { projectId } = Route.useParams();

  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["project-tasks", projectId],
    queryFn: () => fetchTasksForProject(projectId),
  });

  const {
    data: statuses = [],
    isLoading: loadingStatuses,
    isError: errorStatuses,
  } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });

  if (isLoading || loadingStatuses) return <p>Laden...</p>;
  if (isError || errorStatuses) return <p>Fout bij het ophalen van data.</p>;
  console.log("statuses:", statuses);
    console.log("Tasks:", tasks);

  const tasksByStatus = statuses.reduce((acc, statusObj) => {
    const status = statusObj.Title;
    acc[status] = tasks.filter((t) => t.currentstate?.Title === status);
      
    return acc;
  }, {});

  return (
    <div className="project-board">
      <div className="project-board__header">
        <FilterBar />
        <div className="project-board__actions">
          <span className="project-board__title">
            Active project: {projectId.toUpperCase()}
          </span>
          <button className="project-board__button project-board__button--add">
            Add new task
          </button>
          <Link to="/projects/$projectid/backlog" params={{ projectId }}>
            <button className="project-board__button project-board__button--backlog">
              View backlog
            </button>
          </Link>
        </div>
      </div>

      <div className="project-board__columns">
        {statuses
          .filter((s) => s.Title !== "Backlog")
          .map((statusObj) => {
            const status = statusObj.Title;
            return (
              <div key={status} className="project-board__column">
                <h3 className="project-board__column-title">{status}</h3>
                <div className="project-board__task-list">
                  {tasksByStatus[status]?.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={{
                        title: task.Title,
                        labels: task.label ? [task.label] : [],
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
