const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
])

const MAX_SIZE_BYTES = 10 * 1024 * 1024

export function validateReceiptFile(file: File):
  | { valid: true }
  | { valid: false; error: true; message: string } {
  if (!ALLOWED_TYPES.has(file.type)) {
    return {
      valid: false,
      error: true,
      message: `Unsupported file type: ${file.type}. Accepted: JPEG, PNG, WebP, PDF.`,
    }
  }

  if (file.size > MAX_SIZE_BYTES) {
    return {
      valid: false,
      error: true,
      message: 'File size exceeds 10MB limit.',
    }
  }

  return { valid: true }
}

export { ALLOWED_TYPES, MAX_SIZE_BYTES }