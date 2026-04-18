import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from './supabase'
import { validateReceiptFile } from './validate-receipt-file'

export const uploadReceipt = createServerFn({ method: 'POST' })
  .inputValidator((data: FormData) => data)
  .handler(async ({ data }) => {
    const file = data.get('file') as File | null

    if (!file) {
      return { error: true as const, message: 'No file provided.' }
    }

    const validation = validateReceiptFile(file)
    if (!validation.valid) {
      return validation
    }

    const supabase = getSupabaseServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { error: true as const, message: 'Not authenticated.' }
    }

    const storagePath = `${user.id}/${Date.now()}-${file.name}`

    const { error: uploadError } = await supabase.storage
      .from('receipts')
      .upload(storagePath, file, { contentType: file.type })

    if (uploadError) {
      return { error: true as const, message: uploadError.message }
    }

    const { data: receipt, error: insertError } = await supabase
      .from('receipts')
      .insert({
        user_id: user.id,
        storage_path: storagePath,
        original_filename: file.name,
        content_type: file.type,
        size_bytes: file.size,
      })
      .select()
      .single()

    if (insertError) {
      return { error: true as const, message: insertError.message }
    }

    return { receipt }
  })
