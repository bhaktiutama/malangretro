import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/database.types'

type DbPostImage = Database['public']['Tables']['post_images']['Insert']

/**
 * Upload image to Supabase Storage
 * For now, this is a placeholder - will be implemented when Storage bucket is set up
 */
export async function uploadImage(file: File, postId: string): Promise<string> {
    // TODO: Implement Supabase Storage upload when bucket is configured
    // For now, return a placeholder or external URL

    // Example implementation (when Storage is ready):
    // const supabase = createClient()
    // const fileExt = file.name.split('.').pop()
    // const fileName = `${postId}/${Date.now()}.${fileExt}`
    // const { data, error } = await supabase.storage
    //     .from('post-images')
    //     .upload(fileName, file)
    // 
    // if (error) throw new Error(`Failed to upload image: ${error.message}`)
    // 
    // const { data: { publicUrl } } = supabase.storage
    //     .from('post-images')
    //     .getPublicUrl(fileName)
    // 
    // return publicUrl

    throw new Error('Image upload not yet configured. Please set up Supabase Storage bucket first.')
}

/**
 * Create post_images records for a post
 */
export async function createPostImages(
    postId: string,
    imageUrls: string[]
): Promise<void> {
    const supabase = createClient()

    const postImages: DbPostImage[] = imageUrls.map((url, index) => ({
        post_id: postId,
        image_url: url,
        storage_path: url, // For external URLs, storage_path = image_url
        display_order: index
    }))

    const { error: insertError } = await (supabase as any)
        .from('post_images')
        .insert(postImages)

    if (insertError) {
        console.error('Error creating post images:', insertError)
        throw new Error(`Failed to create post images: ${insertError.message}`)
    }
}

/**
 * Delete post images (cascade handled by database)
 */
export async function deletePostImages(postId: string): Promise<void> {
    const supabase = createClient()

    // Get images to delete from storage
    const { data: images } = await supabase
        .from('post_images')
        .select('storage_path')
        .eq('post_id', postId)

    // Delete from database (will cascade)
    const { error } = await supabase
        .from('post_images')
        .delete()
        .eq('post_id', postId)

    if (error) {
        console.error('Error deleting post images:', error)
        throw new Error(`Failed to delete post images: ${error.message}`)
    }

    // TODO: Delete from storage when Storage is configured
    // if (images) {
    //     for (const image of images) {
    //         await supabase.storage
    //             .from('post-images')
    //             .remove([image.storage_path])
    //     }
    // }
}

/**
 * Get public URL for an image in Supabase Storage
 */
export function getImageUrl(storagePath: string): string {
    // TODO: Implement when Storage is configured
    // const supabase = createClient()
    // const { data } = supabase.storage
    //     .from('post-images')
    //     .getPublicUrl(storagePath)
    // return data.publicUrl

    // For now, assume storagePath is already a full URL
    return storagePath
}
