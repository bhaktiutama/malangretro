import React from 'react';
import styles from '@/app/feed/feed.module.css';

interface FeedLayoutProps {
    children: React.ReactNode;
    sidebar: React.ReactNode;
    widgets: React.ReactNode;
}

export default function FeedLayout({ children, sidebar, widgets }: FeedLayoutProps) {
    return (
        <div className={styles.feedContainer}>
            <div className={styles.feedGrid}>
                {/* Left Sidebar - Navigation */}
                <aside className={styles.sidebar}>
                    {sidebar}
                </aside>

                {/* Main Feed Stream */}
                <main className={styles.mainFeed}>
                    {children}
                </main>

                {/* Right Sidebar - Widgets */}
                <aside className={styles.widgets}>
                    {widgets}
                </aside>
            </div>
        </div>
    );
}
