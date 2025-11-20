import React from 'react';
import styles from '@/app/feed/feed.module.css';

interface FeedFilterProps {
    activeFilter: string;
    onFilterChange: (filter: string) => void;
}

export default function FeedFilter({ activeFilter, onFilterChange }: FeedFilterProps) {
    const filters = [
        { id: 'all', label: 'For You' },
        { id: 'event', label: 'Events' },
        { id: 'food', label: 'Food' },
        { id: 'place', label: 'Places' },
    ];

    return (
        <div className={styles.filterContainer}>
            <div className={`${styles.filterBar} glass-panel`} style={{ borderRadius: 'var(--radius-full)' }}>
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => onFilterChange(filter.id)}
                        className={`${styles.filterButton} ${activeFilter === filter.id ? styles.filterButtonActive : ''}`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
