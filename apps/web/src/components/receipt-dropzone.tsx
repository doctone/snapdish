import * as React from 'react'
import { useDropzone } from 'react-dropzone'
import { useMutation } from '../hooks/useMutation'
import { uploadReceipt } from '../utils/upload-receipt'
import { validateReceiptFile } from '../utils/validate-receipt-file'

type UploadResult =
  | { receipt: { original_filename: string }; error?: undefined }
  | { error: true; message: string; receipt?: undefined }

async function submitReceipt(file: File): Promise<UploadResult> {
  const formData = new FormData()
  formData.append('file', file)
  return uploadReceipt({ data: formData }) as Promise<UploadResult>
}

export function ReceiptDropzone() {
  const [validationError, setValidationError] = React.useState<string | null>(
    null,
  )
  const [uploadedFiles, setUploadedFiles] = React.useState<string[]>([])

  const mutation = useMutation({
    fn: submitReceipt,
    onSuccess: () => {
      setValidationError(null)
    },
  })

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      const result = validateReceiptFile(file)
      if (!result.valid) {
        setValidationError(result.message)
        return
      }

      setValidationError(null)
      mutation.mutate(file)
    },
    [mutation],
  )

  const onDropRejected = React.useCallback(() => {
    setValidationError('Please upload a JPEG, PNG, WebP, or PDF file.')
  }, [])

  const dropzone = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    onDrop,
    onDropRejected,
  })

  if (mutation.status === 'pending') {
    return (
      <div
        role="status"
        aria-label="Uploading receipt"
        className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-primary rounded-2xl bg-primary/5"
      >
        <span
          className="material-symbols-outlined text-4xl text-primary animate-spin"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          progress_activity
        </span>
        <p className="text-on-surface-variant text-center">Uploading…</p>
      </div>
    )
  }

  if (mutation.status === 'success' && mutation.data && !mutation.data.error) {
    const filename =
      mutation.data.receipt?.original_filename ?? 'Receipt'
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-solid border-primary rounded-2xl bg-primary/5">
        <span
          className="material-symbols-outlined text-4xl text-primary"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
        <p className="text-on-surface-variant text-center font-semibold">
          {filename} uploaded
        </p>
        <button
          type="button"
          onClick={() => {
            setUploadedFiles((prev) => [...prev, filename])
            mutation.reset()
          }}
          className="text-sm text-primary underline"
        >
          Upload another
        </button>
      </div>
    )
  }

  const errorMessage =
    validationError ??
    (mutation.status === 'error'
      ? mutation.error?.message ?? 'Upload failed'
      : null)

  return (
    <>
      {errorMessage && (
        <p role="alert" className="text-sm text-error mb-2 text-center">
          {errorMessage}
        </p>
      )}
      <div
        {...dropzone.getRootProps({
          role: 'button',
          'aria-label': 'Upload receipt',
          tabIndex: 0,
        })}
        className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-outline-variant rounded-2xl bg-surface-container-low cursor-pointer transition-colors hover:border-primary hover:bg-primary/5"
      >
        <input {...dropzone.getInputProps({ 'aria-label': 'Upload receipt' })} />
        <span
          className="material-symbols-outlined text-4xl text-primary"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          upload_file
        </span>
        <p className="text-on-surface-variant text-center">
          {dropzone.isDragActive
            ? 'Drop your receipt here'
            : 'Upload receipt'}
        </p>
      </div>
      {uploadedFiles.length > 0 && (
        <ul aria-label="Uploaded files" className="mt-4 space-y-1 text-sm text-on-surface-variant">
          {uploadedFiles.map((filename) => (
            <li key={filename} aria-label={filename}>
              {filename}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}