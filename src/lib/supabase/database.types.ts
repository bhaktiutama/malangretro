export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    username: string | null
                    display_name: string | null
                    avatar_url: string | null
                    badge: 'verified' | 'expert' | null
                    contribution_count: number
                    bio: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    username?: string | null
                    display_name?: string | null
                    avatar_url?: string | null
                    badge?: 'verified' | 'expert' | null
                    contribution_count?: number
                    bio?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    username?: string | null
                    display_name?: string | null
                    avatar_url?: string | null
                    badge?: 'verified' | 'expert' | null
                    contribution_count?: number
                    bio?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            posts: {
                Row: {
                    id: string
                    type: 'event' | 'food' | 'place'
                    title: string
                    venue: string | null
                    content: string
                    location: string
                    coordinates: Json | null
                    tags: string[]
                    views: number
                    helpful_votes: number
                    visit_count: number
                    verified: boolean
                    is_official: boolean
                    trending: boolean
                    status: 'active' | 'closed' | 'upcoming'
                    contributor_id: string | null
                    is_anonymous: boolean
                    opening_hours: string | null
                    price_range: string | null
                    facilities: Json | null
                    event_date: string | null
                    event_start_time: string | null
                    event_end_time: string | null
                    capacity: number | null
                    organizer: string | null
                    cuisine_type: string | null
                    reservation_info: string | null
                    payment_methods: Json | null
                    entrance_fee: string | null
                    photo_spots_count: string | null
                    best_season: string | null
                    accessibility: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    type: 'event' | 'food' | 'place'
                    title: string
                    venue?: string | null
                    content: string
                    location: string
                    coordinates?: Json | null
                    tags?: string[]
                    views?: number
                    helpful_votes?: number
                    visit_count?: number
                    verified?: boolean
                    is_official?: boolean
                    trending?: boolean
                    status?: 'active' | 'closed' | 'upcoming'
                    contributor_id?: string | null
                    is_anonymous?: boolean
                    opening_hours?: string | null
                    price_range?: string | null
                    facilities?: Json | null
                    event_date?: string | null
                    event_start_time?: string | null
                    event_end_time?: string | null
                    capacity?: number | null
                    organizer?: string | null
                    cuisine_type?: string | null
                    reservation_info?: string | null
                    payment_methods?: Json | null
                    entrance_fee?: string | null
                    photo_spots_count?: string | null
                    best_season?: string | null
                    accessibility?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    type?: 'event' | 'food' | 'place'
                    title?: string
                    venue?: string | null
                    content?: string
                    location?: string
                    coordinates?: Json | null
                    tags?: string[]
                    views?: number
                    helpful_votes?: number
                    visit_count?: number
                    verified?: boolean
                    is_official?: boolean
                    trending?: boolean
                    status?: 'active' | 'closed' | 'upcoming'
                    contributor_id?: string | null
                    is_anonymous?: boolean
                    opening_hours?: string | null
                    price_range?: string | null
                    facilities?: Json | null
                    event_date?: string | null
                    event_start_time?: string | null
                    event_end_time?: string | null
                    capacity?: number | null
                    organizer?: string | null
                    cuisine_type?: string | null
                    reservation_info?: string | null
                    payment_methods?: Json | null
                    entrance_fee?: string | null
                    photo_spots_count?: string | null
                    best_season?: string | null
                    accessibility?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            post_images: {
                Row: {
                    id: string
                    post_id: string
                    image_url: string
                    storage_path: string
                    display_order: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    post_id: string
                    image_url: string
                    storage_path: string
                    display_order?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    post_id?: string
                    image_url?: string
                    storage_path?: string
                    display_order?: number
                    created_at?: string
                }
            }
            helpful_votes: {
                Row: {
                    id: string
                    post_id: string
                    user_id: string | null
                    browser_fingerprint: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    post_id: string
                    user_id?: string | null
                    browser_fingerprint?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    post_id?: string
                    user_id?: string | null
                    browser_fingerprint?: string | null
                    created_at?: string
                }
            }
            post_views: {
                Row: {
                    id: string
                    post_id: string
                    user_id: string | null
                    browser_fingerprint: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    post_id: string
                    user_id?: string | null
                    browser_fingerprint?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    post_id?: string
                    user_id?: string | null
                    browser_fingerprint?: string | null
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
