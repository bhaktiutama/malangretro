import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/supabase/database.types'

type DbProfile = Database['public']['Tables']['profiles']['Row']

export interface ProfileData {
    username?: string
    display_name?: string
    avatar_url?: string
    bio?: string
}

/**
 * Get user profile by ID
 */
export async function getProfile(userId: string): Promise<DbProfile | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

    if (error) {
        if (error.code === 'PGRST116') {
            // Not found
            return null
        }
        console.error('Error fetching profile:', error)
        throw new Error(`Failed to fetch profile: ${error.message}`)
    }

    return data
}

/**
 * Create or update user profile
 */
export async function upsertProfile(userId: string, profileData: ProfileData): Promise<DbProfile> {
    const supabase = await createClient()

    const { data, error } = await (supabase as any)
        .from('profiles')
        .upsert({
            id: userId,
            username: profileData.username,
            display_name: profileData.display_name,
            avatar_url: profileData.avatar_url,
            bio: profileData.bio
        })
        .select()
        .single()

    if (error) {
        console.error('Error upserting profile:', error)
        throw new Error(`Failed to upsert profile: ${error.message}`)
    }

    return data
}

/**
 * Get contributor stats
 */
export async function getContributorStats(userId: string) {
    const supabase = await createClient()

    const { data: profile } = await (supabase as any)
        .from('profiles')
        .select('contribution_count, badge')
        .eq('id', userId)
        .single()

    const { count: postsCount } = await (supabase as any)
        .from('posts')
        .select('*', { count: 'exact', head: true })
        .eq('contributor_id', userId)

    const { data: posts } = await (supabase as any)
        .from('posts')
        .select('views, helpful_votes')
        .eq('contributor_id', userId)

    const totalViews = posts?.reduce((sum: number, post: any) => sum + post.views, 0) || 0
    const totalVotes = posts?.reduce((sum: number, post: any) => sum + post.helpful_votes, 0) || 0

    return {
        contributionCount: profile?.contribution_count || 0,
        badge: profile?.badge,
        postsCount: postsCount || 0,
        totalViews,
        totalVotes
    }
}
