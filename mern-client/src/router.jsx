import React from "react";
import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";

import App from "./App";
import Home from "./routes/home";
import Login from "./routes/login";
import Profile from "./routes/profile";

// Root route
const rootRoute = createRootRoute({
  component: () => <App />,
});

// Child routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Home />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => <Login />,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => <Profile />,
});

// Route tree
const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  profileRoute,
]);

// Router
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPendingComponent: () => <div>Loading...</div>,
});

export default function Router() {
  return <RouterProvider router={router} />;
}
