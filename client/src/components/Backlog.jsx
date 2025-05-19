import React from "react";

const Backlog = ({ tasks }) => {
  return (
    <table className="task-table">
      <thead className="task-header">
        <tr>
          <th>Titel</th>
          <th>Beschrijving</th>
          <th>Deadline</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody className="task-body">
        {tasks.map((task) => (
          <tr key={task.id} className="task-row">
            <td>{task.Title}</td>
            <td>{task.Description}</td>
            <td>{new Date(task.Deadline).toLocaleDateString("nl-BE")}</td>
            <td>{task.currentstate?.Title ?? "Geen status"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Backlog;
