/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { createServerFn } from '@tanstack/react-start'
import * as React from 'react'
import { DefaultCatchBoundary } from '../components/DefaultCatchBoundary'
import { NotFound } from '../components/NotFound'
import appCss from '../styles/app.css?url'
import { seo } from '../utils/seo'
import { getSupabaseServerClient } from '../utils/supabase'

const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
  const supabase = getSupabaseServerClient()
  const { data, error: _error } = await supabase.auth.getUser()

  if (!data.user?.email) {
    return null
  }

  return {
    email: data.user.email,
  }
})

export const Route = createRootRoute({
  beforeLoad: async () => {
    const user = await fetchUser()

    return {
      user,
    }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title: 'SnapDish — Turn Groceries into Gourmet',
        description:
          'The minimalist kitchen assistant for busy households. Scan receipts, track your pantry, discover personalized recipes.',
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: '',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Manrope:wght@400;500;600&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { user } = Route.useRouteContext()

  return (
    <html lang="en" className="light">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-on-surface antialiased">
        <header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl">
          <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="material-symbols-outlined text-primary">restaurant_menu</span>
              <span className="text-2xl font-extrabold text-primary tracking-tighter font-headline">
                SnapDish
              </span>
            </Link>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-sm text-on-surface-variant">{user.email}</span>
                  <Link
                    to="/logout"
                    className="text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-primary font-bold font-headline hover:opacity-80 transition-opacity"
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="pt-20 px-6 max-w-7xl mx-auto">
          <Outlet />
        </main>
        <footer className="mt-16 w-full bg-surface-container-low rounded-t-lg">
          <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-6 max-w-7xl mx-auto">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-lg font-bold text-primary font-headline">SnapDish</span>
              <p className="text-sm text-on-surface-variant text-center md:text-left">
                &copy; 2024 SnapDish. Crafted for the Culinary Curator.
              </p>
            </div>
          </div>
        </footer>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
