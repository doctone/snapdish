import { createRouter, createRoute, createRootRoute, RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import * as React from 'react'

export function createTestRouter(initialPath = '/') {
  const rootRoute = createRootRoute({
    component: () => React.createElement('div', null, React.createElement(React.Outlet)),
  })

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => null,
  })

  const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: () => null,
  })

  const routeTree = rootRoute.addChildren([indexRoute, loginRoute])

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [initialPath] }),
  })

  return router
}

export function TestRouterWrapper({ children, initialPath = '/' }: { children: React.ReactNode; initialPath?: string }) {
  const router = createTestRouter(initialPath)
  return React.createElement(RouterProvider, { router }, children)
}