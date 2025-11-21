'use client'

import { createClient } from '@/lib/supabase/client'
import { getBrowserFingerprint } from '@/lib/fingerprint/client'

export async function trackPostView(postId: string) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Use fingerprint only for anonymous users
    const fingerprint = user ? null : await getBrowserFingerprint()

    const { error } = await supabase
        .from('post_views')
        .insert({
            post_id: postId,
            user_id: user?.id || null,
            browser_fingerprint: fingerprint
        })

    // Ignore duplicate constraint errors (same user viewing within 1 hour)
    if (error && error.code !== '23505') {
        console.error('Error tracking view:', error)
    }
}

export async function toggleHelpfulVote(postId: string) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const fingerprint = user ? null : await getBrowserFingerprint()

    // Check if already voted
    const { data: existingVote } = await supabase
        .from('helpful_votes')
        .select('id')
        .eq('post_id', postId)
        .or(
            user
                ? `user_id.eq.${user.id}`
                : `browser_fingerprint.eq.${fingerprint}`
        )
        .single()

    if (existingVote) {
        // Remove vote (toggle off)
        await supabase
            .from('helpful_votes')
            .delete()
            .eq('id', existingVote.id)

        return { voted: false }
    } else {
        // Add vote (toggle on)
        await supabase
            .from('helpful_votes')
            .insert({
                post_id: postId,
                user_id: user?.id || null,
                browser_fingerprint: fingerprint
            })

        return { voted: true }
    }
}

export async function checkIfVoted(postId: string): Promise<boolean> {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const fingerprint = user ? null : await getBrowserFingerprint()

    const { data } = await supabase
        .from('helpful_votes')
        .select('id')
        .eq('post_id', postId)
        .or(
            user
                ? `user_id.eq.${user.id}`
                : `browser_fingerprint.eq.${fingerprint}`
        )
        .single()

    return !!data
}
