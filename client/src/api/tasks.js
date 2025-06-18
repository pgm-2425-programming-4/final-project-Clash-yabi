import { API_URL, API_TOKEN } from "../constants/constant";


export const fetchBacklogTasks = async (page, pageSize, projectSlug) => {
  if (!page || !pageSize || !projectSlug) {
    console.error("⚠️ fetchBacklogTasks: ontbrekende parameter(s)");
    console.log({ page, pageSize, projectSlug });
    throw new Error("fetchBacklogTasks: één of meer parameters zijn undefined");
  }

  const url = `${API_URL}/tasks?filters[currentstate][Title][$eq]=Backlog&filters[project][slug][$eq]=${projectSlug}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`;

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



export const updateTask = async (documentId, updatedFields) => {
  const updateRes = await fetch(`${API_URL}/tasks/${documentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      data: updatedFields,
    }),
  });

  if (!updateRes.ok) {
    const err = await updateRes.text();
    throw new Error("Fout bij bijwerken taak: " + err);
  }

  return await updateRes.json();
};
