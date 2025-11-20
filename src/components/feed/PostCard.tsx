import React from 'react';
import { Post } from '@/lib/feedData';
import styles from '@/app/feed/feed.module.css';

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
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

    return (
        <div className={styles.postCard}>
            {/* Header */}
            <div className={styles.postHeader}>
                <div className={styles.authorInfo}>
                    <div className={styles.avatar}>
                        {/* Show venue initial or category icon */}
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
                    {post.images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt="Post content"
                            style={{ height: post.images.length === 1 ? '300px' : '200px' }}
                        />
                    ))}
                </div>
            )}

            {/* Footer Actions - Community Metrics */}
            <div className={styles.postActions}>
                <button className={styles.actionBtn}>
                    <span>👍</span>
                    <span>{post.helpfulVotes}</span>
                </button>

                <button className={styles.actionBtn}>
                    <span>👁️</span>
                    <span>{post.views}</span>
                </button>

                {post.visitCount !== undefined && (
                    <button className={styles.actionBtn}>
                        <span>📍</span>
                        <span>{post.visitCount}</span>
                    </button>
                )}

                <button className={styles.actionBtn}>
                    <span>📤</span>
                </button>
            </div>
        </div>
    );
}
