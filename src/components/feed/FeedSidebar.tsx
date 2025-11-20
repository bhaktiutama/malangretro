import React from 'react';
import Link from 'next/link';
import styles from '@/app/feed/feed.module.css';

export default function FeedSidebar() {
    const navItems = [
        { label: 'Home', icon: '🏠', href: '/' },
        { label: 'Explore', icon: '🌍', href: '/feed' },
        { label: 'Notifications', icon: '🔔', href: '#' },
        { label: 'Messages', icon: '✉️', href: '#' },
        { label: 'Bookmarks', icon: '🔖', href: '#' },
        { label: 'Profile', icon: '👤', href: '#' },
    ];

    return (
        <div className={styles.sidebarNav}>
            <nav>
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={styles.navItem}
                    >
                        <span className={styles.navIcon}>{item.icon}</span>
                        <span className={styles.navLabel}>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <button className={styles.postButton}>
                Post Event / Food
            </button>

            <div className={`${styles.userProfile} glass-panel`}>
                <div className={styles.avatar} style={{ width: '40px', height: '40px' }}>
                    <img src="https://picsum.photos/seed/user/100/100" alt="User" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Majoo User</p>
                    <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>@majoo_user</p>
                </div>
                <button style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
                    •••
                </button>
            </div>
        </div>
    );
}
