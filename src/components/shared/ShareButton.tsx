import { Share2 } from 'lucide-react';
import styles from './ShareButton.module.css';

interface ShareButtonProps {
    label: string;
}

export default function ShareButton({ label }: ShareButtonProps) {
    return (
        <div className={styles.container}>
            <button className={styles.button}>
                <Share2 size={16} /> {label}
            </button>
        </div>
    );
}
