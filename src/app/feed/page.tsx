'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FeedLayout from '@/components/feed/FeedLayout';
import FeedSidebar from '@/components/feed/FeedSidebar';
import RightSidebar from '@/components/feed/RightSidebar';
import FeedFilter from '@/components/feed/FeedFilter';
import PostCard from '@/components/feed/PostCard';
import { feedPosts } from '@/lib/feedData';
import styles from './feed.module.css';

export default function FeedPage() {
    const searchParams = useSearchParams();
    const filterParam = searchParams.get('filter') || 'all';
    const [activeFilter, setActiveFilter] = useState(filterParam);

    useEffect(() => {
        setActiveFilter(filterParam);
    }, [filterParam]);

    const filteredPosts = feedPosts.filter(post => {
        if (activeFilter === 'all') return true;
        return post.type === activeFilter;
    });

    return (
        <main>
            <Navbar />
            <FeedLayout
                sidebar={<FeedSidebar />}
                widgets={<RightSidebar />}
            >
                <FeedFilter
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {filteredPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}

                    {filteredPosts.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '80px 0' }}>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '18px' }}>No posts found for this category.</p>
                        </div>
                    )}
                </div>
            </FeedLayout>
            <Footer />
        </main>
    );
}
