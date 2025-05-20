import React from "react";
import PaginatedBacklog from "./components/PaginatedBacklog.jsx";
import "./styles/App.css";
import "./styles/Pagination.css";

function BacklogApp() {
  return (
    <div>
      <h1>Project Backlog</h1>
      <PaginatedBacklog />
    </div>
  );
}

export default BacklogApp;
