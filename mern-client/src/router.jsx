import {
  createRouter,
  createRootRoute,
  createRoute,
} from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import Home from './routes/home'
import About from './routes/about'
import Login from './routes/login'

// Use inline layout instead of Root.jsx
const rootRoute = createRootRoute({
  component: () => (
    <div className="p-4">
      <nav className="flex gap-4 mb-4">
        <a href="/" className="underline">Home</a>
        <a href="/about" className="underline">About</a>
        <a href="/login" className="underline">Login</a>
      </nav>
      <Outlet />
    </div>
  ),
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
})

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  loginRoute,
])

export const router = createRouter({ routeTree })
