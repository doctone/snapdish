import * as React from 'react'
import { render, type RenderResult } from '@testing-library/react'
import {
  createMemoryHistory,
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router'
import type { RouteComponent } from '@tanstack/react-router'

interface RouterContext {
  user: { email: string } | null
}

interface RouteDef {
  path: string
  component: RouteComponent
}

interface RenderAppOptions {
  path?: string
  user?: { email: string } | null
}

function buildTestRouter(routeDefs: RouteDef[], options: RenderAppOptions) {
  const { path = '/', user = null } = options

  const rootRoute = createRootRouteWithContext<RouterContext>()({
    component: () => <Outlet />,
  })

  const routes = routeDefs.map((def) =>
    createRoute({
      getParentRoute: () => rootRoute,
      path: def.path,
      component: def.component,
    }),
  )

  return createRouter({
    routeTree: rootRoute.addChildren(routes),
    history: createMemoryHistory({ initialEntries: [path] }),
    context: { user },
  })
}

export function renderApp(
  routeDefs: RouteDef[],
  options: RenderAppOptions = {},
) {
  const router = buildTestRouter(routeDefs, options)

  const result: RenderResult & { router: typeof router } = {
    ...render(<RouterProvider router={router} />),
    router,
  }

  return result
}
