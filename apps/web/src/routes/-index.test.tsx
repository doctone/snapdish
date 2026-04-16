import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderApp } from '../test/render-app'
import { Home } from './index'

describe('Homepage', () => {
  it('renders the hero heading', async () => {
    renderApp([{ path: '/', component: Home }])
    expect(
      await screen.findByRole('heading', { level: 1 }),
    ).toHaveTextContent(/Turn Groceries into/i)
  })

  it('renders the Gourmet gradient text', async () => {
    renderApp([{ path: '/', component: Home }])
    expect(await screen.findByText('Gourmet')).toBeInTheDocument()
  })

  it('renders the tagline', async () => {
    renderApp([{ path: '/', component: Home }])
    expect(
      await screen.findByText(
        'The minimalist kitchen assistant for busy households.',
      ),
    ).toBeInTheDocument()
  })

  it('renders the Get Started link pointing to /login', async () => {
    renderApp([{ path: '/', component: Home }])
    const link = await screen.findByRole('link', { name: /get started/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/login')
  })

  it('renders Kitchen Intelligence section heading', async () => {
    renderApp([{ path: '/', component: Home }])
    expect(
      await screen.findByRole('heading', { name: /kitchen intelligence/i }),
    ).toBeInTheDocument()
  })

  it('renders all feature cards', async () => {
    renderApp([{ path: '/', component: Home }])
    expect(
      await screen.findByRole('heading', { name: /scan receipts/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /personalized recipes/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /smart pantry/i }),
    ).toBeInTheDocument()
  })

  it('renders stats section', async () => {
    renderApp([{ path: '/', component: Home }])
    expect(await screen.findByText(/cook more, waste less/i)).toBeInTheDocument()
    expect(screen.getByText('30%')).toBeInTheDocument()
    expect(screen.getByText('2h')).toBeInTheDocument()
  })

  it('renders feature descriptions', async () => {
    renderApp([{ path: '/', component: Home }])
    expect(
      await screen.findByText(/instantly digitize your grocery shop/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/recommendations based on what you actually have/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/low on milk/i)).toBeInTheDocument()
  })
})
