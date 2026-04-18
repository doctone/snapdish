import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from '../test/render-app'
import { ReceiptDropzone } from './receipt-dropzone'

let mockStatus: 'idle' | 'pending' | 'success' | 'error' = 'idle'
let mockError: Error | undefined = undefined
let mockData: Record<string, unknown> | undefined = undefined
const mockMutate = vi.fn()

vi.mock('../hooks/useMutation', () => ({
  useMutation: () => {
    const [, forceUpdate] = React.useReducer((x: number) => x + 1, 0)
    return {
      mutate: mockMutate,
      reset: () => {
        mockStatus = 'idle'
        mockError = undefined
        mockData = undefined
        forceUpdate()
      },
      get status() {
        return mockStatus
      },
      get error() {
        return mockError
      },
      get data() {
        return mockData
      },
      variables: undefined,
      submittedAt: undefined,
    }
  },
}))

vi.mock('../utils/upload-receipt', () => ({
  uploadReceipt: vi.fn(),
}))

let mockIsDragActive = false

vi.mock('react-dropzone', () => ({
  useDropzone: (opts: Record<string, unknown>) => ({
    getRootProps: () => ({
      role: 'button',
      'aria-label': 'Upload receipt',
      tabIndex: 0,
    }),
    getInputProps: () => {
      const accept = opts.accept as Record<string, string[]> | undefined
      return {
        type: 'file',
        accept: accept ? Object.keys(accept).join(',') : '',
        'aria-label': 'Upload receipt',
      }
    },
    get isDragActive() {
      return mockIsDragActive
    },
    isDragReject: false,
    isDragAccept: true,
    acceptedFiles: [],
    fileRejections: [],
    open: vi.fn(),
  }),
}))

vi.mock('../utils/validate-receipt-file', () => ({
  validateReceiptFile: (_file: File) => ({ valid: true }),
  ALLOWED_TYPES: new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
  ]),
  MAX_SIZE_BYTES: 10 * 1024 * 1024,
}))

describe('ReceiptDropzone', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockStatus = 'idle'
    mockError = undefined
    mockData = undefined
    mockIsDragActive = false
  })

  it('renders a dropzone accepting JPEG, PNG, WebP, and PDF', async () => {
    renderApp([{ path: '/', component: ReceiptDropzone }])

    expect(
      await screen.findByRole('button', { name: /upload receipt/i }),
    ).toBeInTheDocument()

    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement
    expect(fileInput).toBeTruthy()
    expect(fileInput.accept).toContain('image/jpeg')
    expect(fileInput.accept).toContain('image/png')
    expect(fileInput.accept).toContain('image/webp')
    expect(fileInput.accept).toContain('application/pdf')
  })

  it('shows drop prompt when dragging a file over the dropzone', async () => {
    mockIsDragActive = true

    renderApp([{ path: '/', component: ReceiptDropzone }])

    expect(
      await screen.findByText(/drop your receipt here/i),
    ).toBeInTheDocument()
  })

  it('shows a spinner when upload is pending', async () => {
    mockStatus = 'pending'

    renderApp([{ path: '/', component: ReceiptDropzone }])

    expect(
      await screen.findByRole('status', { name: /uploading/i }),
    ).toBeInTheDocument()
  })

  it('shows a success message after upload completes', async () => {
    mockStatus = 'success'
    mockData = { receipt: { original_filename: 'grocery.jpg' } }

    renderApp([{ path: '/', component: ReceiptDropzone }])

    expect(
      await screen.findByText(/grocery\.jpg uploaded/i),
    ).toBeInTheDocument()
  })

  it('shows an error message when upload fails', async () => {
    mockStatus = 'error'
    mockError = new Error('Upload failed')

    renderApp([{ path: '/', component: ReceiptDropzone }])

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /upload failed/i,
    )
  })

it('shows upload another button after success', async () => {
    mockStatus = 'success'
    mockData = { receipt: { original_filename: 'grocery.jpg' } }

    renderApp([{ path: '/', component: ReceiptDropzone }])

    expect(
      await screen.findByRole('button', { name: /upload another/i }),
    ).toBeInTheDocument()
  })

  it('displays uploaded files underneath the dropzone after upload', async () => {
    mockStatus = 'success'
    mockData = { receipt: { original_filename: 'grocery.jpg' } }

    renderApp([{ path: '/', component: ReceiptDropzone }])

    expect(
      await screen.findByText(/grocery\.jpg uploaded/i),
    ).toBeInTheDocument()

    const uploadAnotherButton = await screen.findByRole('button', {
      name: /upload another/i,
    })
    await userEvent.click(uploadAnotherButton)

    const dropzone = await screen.findByRole('button', {
      name: /upload receipt/i,
    })
    expect(dropzone).toBeInTheDocument()

    expect(
      screen.getByRole('list', { name: /uploaded files/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('listitem', { name: /grocery\.jpg/i }),
    ).toBeInTheDocument()
  })

})