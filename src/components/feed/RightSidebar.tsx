import React from 'react';
import styles from '@/app/feed/feed.module.css';

export default function RightSidebar() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Trending Widget */}
            <div className={`${styles.widgetCard} glass-panel`}>
                <h3 className={styles.widgetTitle}>Trending in Malang</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className={styles.trendingItem}>
                            <p className={styles.trendingCategory}>Trending in Food</p>
                            <p className={styles.trendingName}>Bakso Bakar Trowulan</p>
                            <p className={styles.trendingCount}>2.5k posts</p>
                        </div>
                    ))}
                </div>
                <button style={{ width: '100%', marginTop: '16px', color: 'var(--color-primary)', fontSize: '14px', fontWeight: 'bold', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Show more
                </button>
            </div>

            {/* Suggested Follows */}
            <div className={`${styles.widgetCard} glass-panel`}>
                <h3 className={styles.widgetTitle}>Who to follow</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[1, 2].map((i) => (
                        <div key={i} className={styles.followItem}>
                            <div className={styles.followAvatar}>
                                <img src={`https://picsum.photos/seed/follow${i}/100/100`} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div className={styles.followInfo}>
                                <p className={styles.followName}>Malang Foodies</p>
                                <p className={styles.followHandle}>@mlgfoodies</p>
                            </div>
                            <button className={styles.followBtn}>
                                Follow
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
