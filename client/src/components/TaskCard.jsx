import "../styles/taskcard.css";
export default function TaskCard({ task, onClick }) {
  return (
    <div onClick={onClick} className="task-card">
      <h4 className="task-card__title">{task.title}</h4>
      <div className="task-card__labels">
        {task.labels.map((label, i) => (
          <span key={i} className="task-card__label">
            {label || "No Label"}
          </span>
        ))}
      </div>
    </div>
  );
}
