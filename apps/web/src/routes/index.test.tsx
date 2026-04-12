import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { Home } from './index'

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-router')>()
  return {
    ...actual,
    createFileRoute: () => (config: Record<string, unknown>) => config,
    Link: ({
      children,
      to,
      ...rest
    }: {
      children?: React.ReactNode
      to: string
      [key: string]: unknown
    }) => React.createElement('a', { ...rest, href: to }, children),
  }
})

vi.mock('@tanstack/react-start', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-start')>()
  return {
    ...actual,
    createServerFn: () => ({
      handler: (fn: unknown) => fn,
      inputValidator: () => ({ handler: (fn: unknown) => fn }),
    }),
  }
})

describe('Homepage', () => {
  it('renders the hero heading', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Turn Groceries into/i,
    )
  })

  it('renders the Gourmet gradient text', () => {
    render(<Home />)
    expect(screen.getByText('Gourmet')).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(<Home />)
    expect(
      screen.getByText('The minimalist kitchen assistant for busy households.'),
    ).toBeInTheDocument()
  })

  it('renders the Get Started link pointing to /login', () => {
    render(<Home />)
    const link = screen.getByRole('link', { name: /get started/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/login')
  })

  it('renders Kitchen Intelligence section heading', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { name: /kitchen intelligence/i }),
    ).toBeInTheDocument()
  })

  it('renders all feature cards', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { name: /scan receipts/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /personalized recipes/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /smart pantry/i }),
    ).toBeInTheDocument()
  })

  it('renders stats section', () => {
    render(<Home />)
    expect(screen.getByText(/cook more, waste less/i)).toBeInTheDocument()
    expect(screen.getByText('30%')).toBeInTheDocument()
    expect(screen.getByText('2h')).toBeInTheDocument()
  })

  it('renders feature descriptions', () => {
    render(<Home />)
    expect(
      screen.getByText(/instantly digitize your grocery shop/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/recommendations based on what you actually have/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/low on milk/i)).toBeInTheDocument()
  })
})