import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Backlog from "./Backlog";
import { Pagination } from "./Pagination";
import { API_URL, API_TOKEN } from "../constants/constant";

const fetchTasks = async (page, pageSize) => {
  const url = `${API_URL}/tasks?filters[currentstate][Title][$eq]=Backlog&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=currentstate`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_TOKEN}`,
    },
  });
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
  const [pageSize, setPageSize] = useState(5);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks", currentPage, pageSize],
    queryFn: () => fetchTasks(currentPage,pageSize),
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
