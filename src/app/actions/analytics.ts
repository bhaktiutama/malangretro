'use server'

import { createClient } from '@/lib/supabase/server'

export async function trackPostViewAction(postId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase
        .from('post_views')
        .insert({
            post_id: postId,
            user_id: user?.id || null,
            browser_fingerprint: null // Server-side tracking doesn't use fingerprinting
        })

    // Ignore duplicate constraint errors (same user viewing within 1 hour)
    if (error && error.code !== '23505') {
        console.error('Error tracking view:', error)
    }
}
