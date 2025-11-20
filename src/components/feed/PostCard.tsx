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

    return (
        <div className={styles.postCard}>
            {/* Header */}
            <div className={styles.postHeader}>
                <div className={styles.authorInfo}>
                    <div className={styles.avatar}>
                        <img src={post.author.avatar} alt={post.author.name} />
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h3 className={styles.authorName}>{post.author.name}</h3>
                            <span className={styles.authorHandle}>{post.author.handle}</span>
                        </div>
                        <div className={styles.postMeta}>
                            <span>{post.timestamp}</span>
                            <span>•</span>
                            {post.location && <span>📍 {post.location}</span>}
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

            {/* Footer Actions */}
            <div className={styles.postActions}>
                <button className={styles.actionBtn}>
                    <span>❤️</span>
                    <span>{post.likes}</span>
                </button>

                <button className={styles.actionBtn}>
                    <span>💬</span>
                    <span>{post.comments}</span>
                </button>

                <button className={styles.actionBtn}>
                    <span>🔄</span>
                    <span>{post.shares}</span>
                </button>

                <button className={styles.actionBtn}>
                    <span>📤</span>
                </button>
            </div>
        </div>
    );
}
