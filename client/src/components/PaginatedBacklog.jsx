import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Backlog from "./BacklogView.jsx";
import { Pagination } from "./Pagination";
import { fetchBacklogTasks } from "../api/tasks.js";
import { Route } from "../routes/projects/$projectId/backlog";

const PaginatedBacklog = () => {
  const { projectId } = Route.useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  console.log("🚀 projectId:", projectId);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks", projectId, currentPage, pageSize],
    queryFn: () => fetchBacklogTasks(currentPage, pageSize, projectId),
    keepPreviousData: true,
  });
  console.log("📡 Fetch params:", { currentPage, pageSize, projectId });

  useEffect(() => {
    if (data?.meta?.pagination?.pageCount) {
      setPageCount(data.meta.pagination.pageCount);
    }
  }, [data]);

  if (isLoading) return <p>Laden...</p>;
  if (isError) return <p>Fout bij het laden van de backlog.</p>;

  return (
    <div>
      <h1>Backlog voor project: {projectId}</h1>
      <Backlog tasks={data.data} />
      {console.log(data)}
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChanged={setCurrentPage}
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default PaginatedBacklog;
