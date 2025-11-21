'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/feedData';
import styles from '@/app/feed/feed.module.css';
import { toggleHelpfulVote, checkIfVoted } from '@/lib/api/analytics';
import { Share2, ThumbsUp, Eye, MapPin } from 'lucide-react';

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    const [votes, setVotes] = useState(post.helpfulVotes);
    const [hasVoted, setHasVoted] = useState(false);
    const [isVoting, setIsVoting] = useState(false);

    useEffect(() => {
        checkIfVoted(post.id).then(setHasVoted);
    }, [post.id]);

    const handleVote = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isVoting) return;
        setIsVoting(true);

        // Optimistic update
        const newVotedState = !hasVoted;
        setHasVoted(newVotedState);
        setVotes(prev => newVotedState ? prev + 1 : prev - 1);

        try {
            const result = await toggleHelpfulVote(post.id);
            // Sync with server result if needed, but optimistic is usually fine
            if (result.voted !== newVotedState) {
                // Revert if mismatch (rare)
                setHasVoted(result.voted);
                setVotes(prev => result.voted ? prev + 1 : prev - 1);
            }
        } catch (error) {
            console.error('Error voting:', error);
            // Revert on error
            setHasVoted(!newVotedState);
            setVotes(prev => !newVotedState ? prev + 1 : prev - 1);
        } finally {
            setIsVoting(false);
        }
    };

    const getBadgeClass = (type: string) => {
        switch (type) {
            case 'event': return styles.badgeEvent;
            case 'food': return styles.badgeFood;
            case 'place': return styles.badgePlace;
            default: return '';
        }
    };

    const getContributorBadgeEmoji = (badge?: 'verified' | 'expert') => {
        if (badge === 'expert') return '⭐';
        if (badge === 'verified') return '✓';
        return '';
    };

    const detailLink = `/${post.type === 'event' ? 'events' : post.type}/${post.id}`;

    return (
        <div className={styles.postCard}>
            <Link href={detailLink} className={styles.cardLink}>
                {/* Header */}
                <div className={styles.postHeader}>
                    <div className={styles.authorInfo}>
                        <div className={styles.avatar}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: 'white'
                            }}>
                                {post.type === 'event' ? '🎉' : post.type === 'food' ? '🍜' : '📍'}
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <h3 className={styles.authorName}>{post.title}</h3>
                                {post.verified && <span style={{ color: '#1DA1F2' }}>✓</span>}
                                {post.isOfficial && <span style={{ color: '#FFD700' }}>⭐</span>}
                                {post.trending && <span style={{ color: '#FF6B6B' }}>🔥</span>}
                            </div>
                            <div className={styles.postMeta}>
                                <span>{post.timestamp}</span>
                                <span>•</span>
                                <span>📍 {post.location}</span>
                                {!post.isAnonymous && post.contributor && (
                                    <>
                                        <span>•</span>
                                        <span>
                                            {getContributorBadgeEmoji(post.contributor.badge)}
                                            {post.contributor.contributionCount} contributions
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <span className={`${styles.categoryBadge} ${getBadgeClass(post.type)}`}>
                        {post.type}
                    </span>
                </div>

                {/* Content */}
                <div className={styles.postContent}>
                    <p className={styles.postText}>
                        {post.content}
                    </p>
                    <div className={styles.tags}>
                        {post.tags.map(tag => (
                            <span key={tag} className={styles.tag}>#{tag}</span>
                        ))}
                    </div>
                </div>

                {/* Media */}
                {post.images.length > 0 && (
                    <div className={styles.mediaGrid} style={{
                        display: post.images.length > 1 ? 'grid' : 'block',
                        gridTemplateColumns: post.images.length > 1 ? '1fr 1fr' : '1fr',
                        gap: '2px'
                    }}>
                        {post.images.slice(0, 2).map((img, idx) => (
                            <div key={idx} style={{ position: 'relative', height: post.images.length === 1 ? '300px' : '200px' }}>
                                <Image
                                    src={img}
                                    alt={post.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </Link>

            {/* Footer Actions */}
            <div className={styles.postActions}>
                <button
                    className={`${styles.actionBtn} ${hasVoted ? styles.activeAction : ''}`}
                    onClick={handleVote}
                    disabled={isVoting}
                >
                    <ThumbsUp size={18} className={hasVoted ? 'fill-current' : ''} />
                    <span>{votes}</span>
                </button>

                <div className={styles.actionBtn} style={{ cursor: 'default' }}>
                    <Eye size={18} />
                    <span>{post.views}</span>
                </div>

                {post.visitCount !== undefined && (
                    <div className={styles.actionBtn} style={{ cursor: 'default' }}>
                        <MapPin size={18} />
                        <span>{post.visitCount}</span>
                    </div>
                )}

                <button className={styles.actionBtn}>
                    <Share2 size={18} />
                </button>
            </div>
        </div>
    );
}
