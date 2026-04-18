import { describe, expect, it } from 'vitest'
import { validateReceiptFile, ALLOWED_TYPES, MAX_SIZE_BYTES } from './validate-receipt-file'

describe('validateReceiptFile', () => {
  it('accepts JPEG files', () => {
    const file = new File(['data'], 'photo.jpg', { type: 'image/jpeg' })
    expect(validateReceiptFile(file)).toEqual({ valid: true })
  })

  it('accepts PNG files', () => {
    const file = new File(['data'], 'photo.png', { type: 'image/png' })
    expect(validateReceiptFile(file)).toEqual({ valid: true })
  })

  it('accepts WebP files', () => {
    const file = new File(['data'], 'photo.webp', { type: 'image/webp' })
    expect(validateReceiptFile(file)).toEqual({ valid: true })
  })

  it('accepts PDF files', () => {
    const file = new File(['data'], 'receipt.pdf', { type: 'application/pdf' })
    expect(validateReceiptFile(file)).toEqual({ valid: true })
  })

  it('rejects unsupported MIME types', () => {
    const file = new File(['text'], 'notes.txt', { type: 'text/plain' })
    const result = validateReceiptFile(file)
    expect(result.valid).toBe(false)
    if (!result.valid) {
      expect(result.message).toMatch(/unsupported/i)
      expect(result.message).toContain('text/plain')
    }
  })

  it('rejects files exceeding 10MB', () => {
    const file = new File(['x'], 'huge.jpg', { type: 'image/jpeg' })
    Object.defineProperty(file, 'size', { value: MAX_SIZE_BYTES + 1 })

    const result = validateReceiptFile(file)
    expect(result.valid).toBe(false)
    if (!result.valid) {
      expect(result.message).toMatch(/10\s*mb/i)
    }
  })

  it('accepts files at exactly 10MB', () => {
    const file = new File(['x'], 'exact.jpg', { type: 'image/jpeg' })
    Object.defineProperty(file, 'size', { value: MAX_SIZE_BYTES })

    expect(validateReceiptFile(file)).toEqual({ valid: true })
  })

  it('exports ALLOWED_TYPES containing accepted MIME types', () => {
    expect(ALLOWED_TYPES).toContain('image/jpeg')
    expect(ALLOWED_TYPES).toContain('image/png')
    expect(ALLOWED_TYPES).toContain('image/webp')
    expect(ALLOWED_TYPES).toContain('application/pdf')
  })

  it('exports MAX_SIZE_BYTES as 10MB', () => {
    expect(MAX_SIZE_BYTES).toBe(10 * 1024 * 1024)
  })
})