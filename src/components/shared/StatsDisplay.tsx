import styles from './StatsDisplay.module.css';

interface StatsDisplayProps {
    views: number;
    helpfulVotes: number;
    visitCount?: number;
}

export default function StatsDisplay({ views, helpfulVotes, visitCount }: StatsDisplayProps) {
    return (
        <div className={styles.container}>
            <div className={styles.stats}>
                <div className={styles.stat}>
                    <div className={styles.value}>{views}</div>
                    <div className={styles.label}>Views</div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.value}>{helpfulVotes}</div>
                    <div className={styles.label}>Helpful</div>
                </div>
                {visitCount !== undefined && (
                    <div className={styles.stat}>
                        <div className={styles.value}>{visitCount}</div>
                        <div className={styles.label}>Visits</div>
                    </div>
                )}
            </div>
        </div>
    );
}
