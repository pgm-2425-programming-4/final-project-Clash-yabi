import { API_URL, API_TOKEN } from "../constants/constant";


export const fetchBacklogTasks = async (page, pageSize, projectId) => {
    if (!page || !pageSize || !projectId) {
      console.error("⚠️ fetchBacklogTasks: ontbrekende parameter(s)");
      console.log({ page, pageSize, projectId });
      throw new Error(
        "fetchBacklogTasks: één of meer parameters zijn undefined"
      );
    }
      
  const url = `${API_URL}/tasks?filters[currentstate][Title][$eq]=Backlog&filters[project][id][$eq]=${projectId}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
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
