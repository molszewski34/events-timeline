import { createBrowserClient } from '@supabase/ssr'
import { Database } from '../types/supabase';
import type { TypedSupabaseClient } from '@/utils/types'
import { useMemo } from 'react'


let client: ReturnType<typeof createBrowserClient<Database>> | undefined;
export function getSupabaseBrowserClient() {
  if (client) {
    return client
  }

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return client
}

function useSupabaseBrowser() {
  return useMemo(getSupabaseBrowserClient, [])
}

export default useSupabaseBrowser