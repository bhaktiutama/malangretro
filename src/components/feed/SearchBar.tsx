import React, { useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleSearch = (value: string) => {
        setQuery(value);
        onSearch(value);
    };

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
                <span className={styles.searchIcon}>🔍</span>
                <input
                    type="text"
                    placeholder="Search events, food, places in Malang..."
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    className={styles.searchInput}
                />
                {query && (
                    <button 
                        className={styles.clearBtn}
                        onClick={() => handleSearch('')}
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}
