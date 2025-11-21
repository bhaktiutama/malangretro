import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FeedContent from '@/components/feed/FeedContent';
import { getPosts } from '@/lib/api/posts';
import type { PostType } from '@/lib/feedData';

interface FeedPageProps {
    searchParams: Promise<{ filter?: string }>;
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function FeedPage({ searchParams }: FeedPageProps) {
    const resolvedSearchParams = await searchParams;
    const filterParam = resolvedSearchParams.filter || 'all';

    // Fetch posts from Supabase
    let posts: Awaited<ReturnType<typeof getPosts>> = [];
    try {
        if (filterParam === 'all') {
            posts = await getPosts({ limit: 50 });
        } else {
            posts = await getPosts({
                type: filterParam as PostType,
                limit: 50
            });
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        posts = [];
    }

    return (
        <main>
            <Navbar />
            <FeedContent
                initialPosts={posts}
                initialFilter={filterParam}
            />
            <Footer />
        </main>
    );
}
