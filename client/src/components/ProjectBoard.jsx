import FilterBar from "./FilterBar";
import TaskCard from "./TaskCard";
import { Route } from "../routes/projects/$projectId";
import "../styles/boardheader.css"


const mockTasks = [
  {
    id: 1,
    title: "Create pipeline with Github Actions",
    labels: ["Infra"],
    status: "To do",
  },
  {
    id: 2,
    title: "Set up Strapi on Render",
    labels: ["Infra", "Back-end"],
    status: "In progress",
  },
  {
    id: 3,
    title: "Add formatting with Prettier",
    labels: ["Front-end"],
    status: "Ready for review",
  },
  {
    id: 4,
    title: "Initialize Git repository on Github",
    labels: ["Infra"],
    status: "Done",
  },
];

const columns = ["To do", "In progress", "Ready for review", "Done"];

export default function ProjectBoard() {
    const { projectId } = Route.useParams();
  const tasksByStatus = columns.reduce((acc, status) => {
    acc[status] = mockTasks.filter((task) => task.status === status);
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
          <button className="project-board__button project-board__button--backlog">
            View backlog
          </button>
        </div>
      </div>

      <div className="project-board__columns">
        {columns.map((status) => (
          <div key={status} className="project-board__column">
            <h3 className="project-board__column-title">{status}</h3>
            <div className="project-board__task-list">
              {tasksByStatus[status].map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
