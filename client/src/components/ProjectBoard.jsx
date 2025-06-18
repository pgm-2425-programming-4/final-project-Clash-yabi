import FilterBar from "./FilterBar";
import TaskCard from "./TaskCard";
import { Route } from "../routes/projects/$projectId";
import { API_URL, API_TOKEN } from "../constants/constant";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { TaskDialog } from "./TaskDialog.jsx";
import { updateTask } from "../api/tasks";

import { useState } from "react";

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
  const [selectedTask, setSelectedTask] = useState(null);

  const { projectId } = Route.useParams();

  const {
    data: tasks = [],
    isLoading,
    isError,
    refetch,
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

  const handleTaskSave = async (updatedTask) => {
    console.log("➡️ Opslaan van taak met documentId:", updatedTask.documentId);
    try {
      // Zoek bijbehorende statusId op basis van titel
      const statusObj = statuses.find(
        (s) => s.Title === updatedTask.currentstate
      );

      if (!statusObj) {
        console.error("Status niet gevonden:", updatedTask.currentstate);
        return;
      }

      await updateTask(updatedTask.documentId, {
        Title: updatedTask.Title,
        Description: updatedTask.Description,
        label: updatedTask.label || "",
        Deadline: updatedTask.Deadline,
        currentstate: statusObj.id,
      });
      await refetch();
      setSelectedTask(null);
    } catch (err) {
      console.error("❌ Fout bij updaten van taak:", err.message);
    }
  };

  if (isLoading || loadingStatuses) return <p>Laden...</p>;
  if (isError || errorStatuses) return <p>Fout bij het ophalen van data.</p>;
  console.log("statuses:", statuses);

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
          <Link to={`/projects/${projectId}/backlog`}>
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
                        id: task.id,
                        documentId: task.documentId,
                        title: task.Title,
                        description: task.Description,
                        labels: task.label ? [task.label] : [],
                        currentstate: task.currentstate?.Title,
                      }}
                      onClick={() => setSelectedTask(task)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
      </div>

      {selectedTask && (
        <TaskDialog
          task={selectedTask}
          statuses={statuses}
          onClose={() => setSelectedTask(null)}
          onSave={handleTaskSave}
        />
      )}
    </div>
  );
}