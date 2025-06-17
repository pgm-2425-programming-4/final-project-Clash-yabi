import React from "react";
import ReactDOM from "react-dom/client";
import BacklogApp from "./App";
// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";


// Create a new router instance
const router = createRouter({ routeTree })

// const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <BacklogApp />
    </RouterProvider>
  </StrictMode>,
);
