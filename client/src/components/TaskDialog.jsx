import React, { useState } from "react";
import "../styles/dialog.css";

export function TaskDialog({ task, statuses, onClose, onSave }) {
  const [title, setTitle] = useState(task.Title || "");
  const [description, setDescription] = useState(task.Description || "");
  const [label, setLabel] = useState(task.label || "");
  const [deadline, setDeadline] = useState(task.Deadline || "");
  const [selectedStatus, setSelectedStatus] = useState(
    task.currentstate?.Title || ""
  );

  const handleSave = () => {
    const updatedTask = {
      ...task,
      Title: title,
      Description: description,
      label,
      Deadline: deadline,
      currentstate: selectedStatus,
    };

    onSave(updatedTask);
    onClose();
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>Taak bewerken</h2>

        <label>Titel:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Beschrijving:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Label:</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />

        <label>Deadline:</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <label>Status wijzigen:</label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          {statuses.map((s) => (
            <option key={s.id} value={s.Title}>
              {s.Title}
            </option>
          ))}
        </select>

        <div className="dialog-buttons">
          <button onClick={onClose}>Sluiten</button>
          <button onClick={handleSave}>Opslaan</button>
        </div>
      </div>
    </div>
  );
}
