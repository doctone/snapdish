import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from './supabase'
import type { Receipt } from '../types/receipt'

export const fetchReceipts = createServerFn({ method: 'GET' }).handler(
  async () => {
    const supabase = getSupabaseServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { error: true as const, message: 'Not authenticated.' }
    }

    const { data: receipts, error: queryError } = await supabase
      .from('receipts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (queryError) {
      return { error: true as const, message: queryError.message }
    }

    return { receipts: receipts as Receipt[] }
  },
)