import React from "react";
import "../styles/backlog.css";

function Backlog({ tasks }) {
  return (
    <div className="backlog-task-list">
      {tasks.map((task) => (
        <div key={task.id} className="backlog-task-card">
          <h4 className="backlog-task-title">{task.Title}</h4>
          <div className="backlog-task-labels">
            {task.label ? (
              <span className="backlog-task-label">{task.label}</span>
            ) : (
              <span className="backlog-task-label">Geen label</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Backlog;
