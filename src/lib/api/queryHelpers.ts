/**
 * Reusable Supabase query selection string for posts with relations
 */
export const POST_WITH_RELATIONS_SELECT = `
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
`;
