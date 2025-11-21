'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FeedLayout from '@/components/feed/FeedLayout';
import FeedSidebar from '@/components/feed/FeedSidebar';
import RightSidebar from '@/components/feed/RightSidebar';
import FeedFilter from '@/components/feed/FeedFilter';
import PostCard from '@/components/feed/PostCard';
import SearchBar from '@/components/feed/SearchBar';
import ContributionModal from '@/components/feed/ContributionModal';
import type { Post, PostType } from '@/lib/feedData';
import { searchPostsAction } from '@/app/actions/posts';

interface FeedContentProps {
    initialPosts: Post[];
    initialFilter: string;
}

export default function FeedContent({ initialPosts, initialFilter }: FeedContentProps) {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState(initialFilter);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState(initialPosts);
    const [isLoading, setIsLoading] = useState(false);

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.trim()) {
                setIsLoading(true);
                try {
                    // Using server action directly
                    const results = await searchPostsAction(searchQuery, {
                        type: activeFilter !== 'all' ? activeFilter as PostType : undefined
                    });
                    setPosts(results);
                } catch (error) {
                    console.error('Search error:', error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                // If search is cleared, reset to initial posts (or re-fetch if filter changed)
                // For simplicity, we'll just use initialPosts if filter matches, otherwise we might need to refetch
                // But since router.push handles filter, initialPosts should be correct for the filter
                setPosts(initialPosts);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, activeFilter, initialPosts]);

    // Update posts when initialPosts change (e.g. filter change from parent)
    useEffect(() => {
        setPosts(initialPosts);
    }, [initialPosts]);

    // Handle filter change - update URL and refetch
    const handleFilterChange = (filter: string) => {
        setActiveFilter(filter);
        router.push(`/feed?filter=${filter}`);
    };

    // Handle modal close - refresh posts
    const handleModalClose = () => {
        setIsModalOpen(false);
        // Refresh the page to get new posts
        router.refresh();
    };

    return (
        <FeedLayout
            sidebar={<FeedSidebar onPostClick={() => setIsModalOpen(true)} />}
            widgets={<RightSidebar />}
        >
            <SearchBar onSearch={setSearchQuery} />

            <FeedFilter
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '80px 0' }}>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '18px' }}>
                            Searching posts...
                        </p>
                    </div>
                ) : posts.length > 0 ? (
                    posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '80px 0' }}>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '18px' }}>
                            {searchQuery
                                ? `No results found for "${searchQuery}"`
                                : 'No posts found for this category.'}
                        </p>
                    </div>
                )}
            </div>

            <ContributionModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
            />
        </FeedLayout>
    );
}
