import type { Database } from '@/lib/supabase/database.types'
import type { Post, Contributor } from '@/lib/feedData'

type DbPost = Database['public']['Tables']['posts']['Row']
type DbProfile = Database['public']['Tables']['profiles']['Row']
type DbPostImage = Database['public']['Tables']['post_images']['Row']

export interface PostWithRelations extends DbPost {
    post_images?: DbPostImage[]
    profiles?: DbProfile | null
}

/**
 * Map database post to UI Post type
 */
export function mapPostToUI(dbPost: PostWithRelations): Post {
    const contributor: Contributor | undefined = dbPost.profiles ? {
        id: dbPost.profiles.id,
        badge: dbPost.profiles.badge || undefined,
        contributionCount: dbPost.profiles.contribution_count
    } : undefined

    // Parse coordinates from JSONB
    const coordinates = dbPost.coordinates as { lat: number; lng: number } | null

    // Get image URLs from post_images
    const images = dbPost.post_images
        ? dbPost.post_images
            .sort((a, b) => a.display_order - b.display_order)
            .map(img => img.image_url)
        : []

    // Format timestamp to relative time
    const timestamp = formatRelativeTime(dbPost.created_at)

    return {
        id: dbPost.id,
        type: dbPost.type,
        title: dbPost.title,
        venue: dbPost.venue || undefined,
        content: dbPost.content,
        images,
        location: dbPost.location,
        coordinates: coordinates || undefined,
        tags: dbPost.tags,
        views: dbPost.views,
        helpfulVotes: dbPost.helpful_votes,
        visitCount: dbPost.visit_count,
        verified: dbPost.verified,
        isOfficial: dbPost.is_official,
        trending: dbPost.trending,
        contributor,
        isAnonymous: dbPost.is_anonymous,
        timestamp,
        lastUpdated: dbPost.updated_at !== dbPost.created_at
            ? formatRelativeTime(dbPost.updated_at)
            : undefined,
        status: dbPost.status,

        // Common fields
        opening_hours: dbPost.opening_hours || undefined,
        price_range: dbPost.price_range || undefined,
        facilities: dbPost.facilities,

        // Event-specific fields
        event_date: dbPost.event_date || undefined,
        event_start_time: dbPost.event_start_time || undefined,
        event_end_time: dbPost.event_end_time || undefined,
        capacity: dbPost.capacity || undefined,
        organizer: dbPost.organizer || undefined,

        // Food-specific fields
        cuisine_type: dbPost.cuisine_type || undefined,
        reservation_info: dbPost.reservation_info || undefined,
        payment_methods: dbPost.payment_methods,

        // Place-specific fields
        entrance_fee: dbPost.entrance_fee || undefined,
        photo_spots_count: dbPost.photo_spots_count || undefined,
        best_season: dbPost.best_season || undefined,
        accessibility: dbPost.accessibility || undefined
    }
}
/**
 * Format ISO timestamp to relative time (e.g., "2h ago", "1d ago")
 */
export function formatRelativeTime(isoString: string): string {
    const date = new Date(isoString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`
    return `${Math.floor(diffDays / 365)}y ago`
}

/**
 * Parse facilities JSONB field
 */
export function parseFacilities(facilities: unknown): string[] {
    if (!facilities) return []
    if (Array.isArray(facilities)) return facilities as string[]
    return []
}

/**
 * Parse payment methods JSONB field
 */
export function parsePaymentMethods(paymentMethods: unknown): string[] {
    if (!paymentMethods) return []
    if (Array.isArray(paymentMethods)) return paymentMethods as string[]
    return []
}
