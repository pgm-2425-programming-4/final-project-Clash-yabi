import React from "react";

const Backlog = ({ tasks }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Titel</th>
          <th>Beschrijving</th>
          <th>Deadline</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.Title}</td>
            <td>{task.Description}</td>
            <td>{task.Deadline}</td>
            <td>{task.currentstate?.Title ?? "Geen status"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Backlog;
