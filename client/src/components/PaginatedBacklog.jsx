import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Backlog from "./Backlog";
import { Pagination } from "./Pagination";

const fetchTasks = async (page) => {
  const url = `http://localhost:1337/api/tasks?filters[currentstate][Title][$eq]=Backlog&pagination[page]=${page}&pagination[pageSize]=5&populate=currentstate`;

  const response = await fetch(url);
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Strapi fout:", errorText);
    throw new Error("Fout bij het ophalen van taken");
  }

  const data = await response.json();
  return data;
};

const PaginatedBacklog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks", currentPage],
    queryFn: () => fetchTasks(currentPage),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data?.meta?.pagination?.pageCount) {
      setPageCount(data.meta.pagination.pageCount);
    }
  }, [data]);

  if (isLoading) return <p>Laden...</p>;
  if (isError) return <p>Fout bij het laden van de backlog.</p>;

  return (
    <div>
      <Backlog tasks={data.data} />
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChanged={setCurrentPage}
      />
    </div>
  );
};

export default PaginatedBacklog;
