import { describe, expect, it, vi, beforeAll } from 'vitest'
import { screen } from '@testing-library/react'
import { renderApp } from '../../test/render-app'
import { Dashboard } from './dashboard'

let mockIsDragActive = false

vi.mock('react-dropzone', () => ({
  useDropzone: (opts: Record<string, unknown>) => ({
    getRootProps: () => ({
      role: 'button',
      'aria-label': 'Upload receipt',
      tabIndex: 0,
    }),
    getInputProps: () => ({
      type: 'file',
      accept: Object.keys((opts.accept as Record<string, unknown>) ?? {})
        .join(','),
      'aria-label': 'Upload receipt',
    }),
    get isDragActive() {
      return mockIsDragActive
    },
    open: vi.fn(),
  }),
}))

describe('Dashboard', () => {
  beforeAll(() => {
    mockIsDragActive = false
  })

  it('renders a receipt upload dropzone as the primary action', async () => {
    mockIsDragActive = false

    renderApp([{ path: '/', component: Dashboard }], {
      path: '/',
      user: { email: 'test@example.com' },
    })

    expect(
      await screen.findByRole('button', { name: /upload receipt/i }),
    ).toBeInTheDocument()

    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement
    expect(fileInput).toBeTruthy()
    expect(fileInput.accept).toContain('image')
  })

  it('shows drop prompt when dragging a file over the dropzone', async () => {
    mockIsDragActive = true

    renderApp([{ path: '/', component: Dashboard }], {
      path: '/',
      user: { email: 'test@example.com' },
    })

    expect(
      await screen.findByText(/drop your receipt here/i),
    ).toBeInTheDocument()
  })
})
