'use server'

import { createPost, searchPosts, type CreatePostData, type PostFilters } from '@/lib/api/posts'
import { createPostImages } from '@/lib/api/images'

export async function createPostAction(data: CreatePostData) {
    return await createPost(data)
}

export async function searchPostsAction(query: string, filters?: PostFilters) {
    return await searchPosts(query, filters)
}

export async function createPostImagesAction(postId: string, imageUrls: string[]) {
    return await createPostImages(postId, imageUrls)
}
