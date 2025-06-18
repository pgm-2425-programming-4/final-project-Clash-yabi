import React from "react";
import ReactDOM from "react-dom/client";
import BacklogApp from "./App";
// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// Create a new router instance
const router = createRouter({ routeTree })

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
