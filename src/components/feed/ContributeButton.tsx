import React from 'react';
import styles from './ContributeButton.module.css';

interface ContributeButtonProps {
    onClick: () => void;
}

export default function ContributeButton({ onClick }: ContributeButtonProps) {
    return (
        <button className={styles.fab} onClick={onClick} title="Contribute">
            <span className={styles.icon}>✏️</span>
            <span className={styles.label}>Contribute</span>
        </button>
    );
}
