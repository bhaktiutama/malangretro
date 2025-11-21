import { createClient } from '@/lib/supabase/server'
import type { Post, PostType } from '@/lib/feedData'
import { mapPostToUI, type PostWithRelations } from '@/lib/mappers/postMapper'

export interface PostFilters {
    type?: PostType
    trending?: boolean
    verified?: boolean
    limit?: number
    offset?: number
    orderBy?: 'created_at' | 'views' | 'helpful_votes'
    orderDirection?: 'asc' | 'desc'
    userId?: string
}

export interface CreatePostData {
    type: PostType
    title: string
    venue?: string
    content: string
    location: string
    coordinates?: { lat: number; lng: number }
    tags?: string[]

    // Type-specific fields
    event_date?: string
    event_start_time?: string
    event_end_time?: string
    capacity?: number
    organizer?: string

    cuisine_type?: string
    reservation_info?: string
    payment_methods?: string[]

    entrance_fee?: string
    photo_spots_count?: string
    best_season?: string
    accessibility?: string

    // Common fields
    opening_hours?: string
    price_range?: string
    facilities?: string[]

    // Contributor
    contributor_id?: string
    is_anonymous?: boolean
}

/**
 * Fetch posts with optional filters
 */
export async function getPosts(filters?: PostFilters): Promise<Post[]> {
    const supabase = await createClient()

    let query = supabase
        .from('posts')
        .select(`
            *,
            post_images (
                id,
                image_url,
                storage_path,
                display_order
            ),
            profiles (
                id,
                username,
                display_name,
                avatar_url,
                badge,
                contribution_count
            )
        `)

    // Apply filters
    if (filters?.type) {
        query = query.eq('type', filters.type)
    }

    if (filters?.trending !== undefined) {
        query = query.eq('trending', filters.trending)
    }

    if (filters?.verified !== undefined) {
        query = query.eq('verified', filters.verified)
    }

    if (filters?.userId) {
        query = query.eq('contributor_id', filters.userId)
    }

    // Order by
    const orderBy = filters?.orderBy || 'created_at'
    const orderDirection = filters?.orderDirection || 'desc'
    query = query.order(orderBy, { ascending: orderDirection === 'asc' })

    // Pagination
    if (filters?.limit) {
        query = query.limit(filters.limit)
    }

    if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching posts:', error)
        throw new Error(`Failed to fetch posts: ${error.message}`)
    }

    if (!data) return []

    return data.map(post => mapPostToUI(post as PostWithRelations))
}

/**
 * Fetch a single post by ID
 */
export async function getPostById(id: string): Promise<Post | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('posts')
        .select(`
            *,
            post_images (
                id,
                image_url,
                storage_path,
                display_order
            ),
            profiles (
                id,
                username,
                display_name,
                avatar_url,
                badge,
                contribution_count
            )
        `)
        .eq('id', id)
        .single()

    if (error) {
        if (error.code === 'PGRST116') {
            // Not found
            return null
        }
        console.error('Error fetching post:', error)
        throw new Error(`Failed to fetch post: ${error.message}`)
    }

    if (!data) return null

    return mapPostToUI(data as PostWithRelations)
}

/**
 * Search posts using full-text search
 */
export async function searchPosts(query: string, filters?: PostFilters): Promise<Post[]> {
    const supabase = await createClient()

    let dbQuery = supabase
        .from('posts')
        .select(`
            *,
            post_images (
                id,
                image_url,
                storage_path,
                display_order
            ),
            profiles (
                id,
                username,
                display_name,
                avatar_url,
                badge,
                contribution_count
            )
        `)
        .textSearch('search_vector', query, {
            type: 'websearch',
            config: 'indonesian'
        })

    // Apply additional filters
    if (filters?.type) {
        dbQuery = dbQuery.eq('type', filters.type)
    }

    if (filters?.limit) {
        dbQuery = dbQuery.limit(filters.limit)
    }

    const { data, error } = await dbQuery

    if (error) {
        console.error('Error searching posts:', error)
        throw new Error(`Failed to search posts: ${error.message}`)
    }

    if (!data) return []

    return data.map(post => mapPostToUI(post as PostWithRelations))
}

/**
 * Create a new post
 */
export async function createPost(postData: CreatePostData): Promise<Post> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('posts')
        .insert({
            type: postData.type,
            title: postData.title,
            venue: postData.venue,
            content: postData.content,
            location: postData.location,
            coordinates: postData.coordinates,
            tags: postData.tags || [],

            // Type-specific fields
            event_date: postData.event_date,
            event_start_time: postData.event_start_time,
            event_end_time: postData.event_end_time,
            capacity: postData.capacity,
            organizer: postData.organizer,

            cuisine_type: postData.cuisine_type,
            reservation_info: postData.reservation_info,
            payment_methods: postData.payment_methods,

            entrance_fee: postData.entrance_fee,
            photo_spots_count: postData.photo_spots_count,
            best_season: postData.best_season,
            accessibility: postData.accessibility,

            // Common fields
            opening_hours: postData.opening_hours,
            price_range: postData.price_range,
            facilities: postData.facilities,

            // Contributor
            contributor_id: postData.contributor_id,
            is_anonymous: postData.is_anonymous ?? true
        })
        .select(`
            *,
            post_images (
                id,
                image_url,
                storage_path,
                display_order
            ),
            profiles (
                id,
                username,
                display_name,
                avatar_url,
                badge,
                contribution_count
            )
        `)
        .single()

    if (error) {
        console.error('Error creating post:', error)
        throw new Error(`Failed to create post: ${error.message}`)
    }

    return mapPostToUI(data as PostWithRelations)
}

/**
 * Update a post (owner only - RLS enforced)
 */
export async function updatePost(id: string, postData: Partial<CreatePostData>): Promise<Post> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('posts')
        .update({
            title: postData.title,
            venue: postData.venue,
            content: postData.content,
            location: postData.location,
            coordinates: postData.coordinates,
            tags: postData.tags,

            // Type-specific fields
            event_date: postData.event_date,
            event_start_time: postData.event_start_time,
            event_end_time: postData.event_end_time,
            capacity: postData.capacity,
            organizer: postData.organizer,

            cuisine_type: postData.cuisine_type,
            reservation_info: postData.reservation_info,
            payment_methods: postData.payment_methods,

            entrance_fee: postData.entrance_fee,
            photo_spots_count: postData.photo_spots_count,
            best_season: postData.best_season,
            accessibility: postData.accessibility,

            // Common fields
            opening_hours: postData.opening_hours,
            price_range: postData.price_range,
            facilities: postData.facilities
        })
        .eq('id', id)
        .select(`
            *,
            post_images (
                id,
                image_url,
                storage_path,
                display_order
            ),
            profiles (
                id,
                username,
                display_name,
                avatar_url,
                badge,
                contribution_count
            )
        `)
        .single()

    if (error) {
        console.error('Error updating post:', error)
        throw new Error(`Failed to update post: ${error.message}`)
    }

    return mapPostToUI(data as PostWithRelations)
}

/**
 * Delete a post (owner only - RLS enforced)
 */
export async function deletePost(id: string): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting post:', error)
        throw new Error(`Failed to delete post: ${error.message}`)
    }
}
