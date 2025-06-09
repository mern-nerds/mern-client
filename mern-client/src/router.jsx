import React from "react";
import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";

import App from "./App";
import Home from "./routes/home";
import About from "./routes/about"
import Login from "./routes/login";
import Profile from "./routes/profile";
import Admin from "./routes/admin";
import Register from "./routes/register";

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

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => <About />,
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

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => <Admin />,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: () => <Register />,
});

// Route tree
const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  loginRoute,
  profileRoute,
  adminRoute,
  registerRoute
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
