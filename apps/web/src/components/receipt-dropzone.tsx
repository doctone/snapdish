import { useDropzone } from 'react-dropzone'

export function ReceiptDropzone() {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
  })

  return (
    <div
      {...getRootProps({
        role: 'button',
        'aria-label': 'Upload receipt',
        tabIndex: 0,
      })}
      className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-outline-variant rounded-2xl bg-surface-container-low cursor-pointer transition-colors hover:border-primary hover:bg-primary/5"
    >
      <input {...getInputProps({ 'aria-label': 'Upload receipt' })} />
      <span
        className="material-symbols-outlined text-4xl text-primary"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        upload_file
      </span>
      <p className="text-on-surface-variant text-center">
        {isDragActive ? 'Drop your receipt here' : 'Upload receipt'}
      </p>
    </div>
  )
}
