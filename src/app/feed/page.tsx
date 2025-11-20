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
import SearchBar from '@/components/feed/SearchBar';
import ContributionModal from '@/components/feed/ContributionModal';
import { feedPosts } from '@/lib/feedData';
import styles from './feed.module.css';

export default function FeedPage() {
    const searchParams = useSearchParams();
    const filterParam = searchParams.get('filter') || 'all';
    const [activeFilter, setActiveFilter] = useState(filterParam);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setActiveFilter(filterParam);
    }, [filterParam]);

    const filteredPosts = feedPosts.filter(post => {
        // Filter by category
        if (activeFilter !== 'all' && post.type !== activeFilter) {
            return false;
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                post.title.toLowerCase().includes(query) ||
                post.venue?.toLowerCase().includes(query) ||
                post.content.toLowerCase().includes(query) ||
                post.location.toLowerCase().includes(query) ||
                post.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        return true;
    });

    return (
        <main>
            <Navbar />
            <FeedLayout
                sidebar={<FeedSidebar onPostClick={() => setIsModalOpen(true)} />}
                widgets={<RightSidebar />}
            >
                <SearchBar onSearch={setSearchQuery} />
                
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
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '18px' }}>
                                {searchQuery 
                                    ? `No results found for "${searchQuery}"`
                                    : 'No posts found for this category.'}
                            </p>
                        </div>
                    )}
                </div>
            </FeedLayout>
            
            <ContributionModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
            
            <Footer />
        </main>
    );
}
