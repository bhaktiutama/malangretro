import { Contributor } from '@/lib/feedData';
import styles from './ContributorCard.module.css';

interface ContributorCardProps {
    contributor?: Contributor;
    isAnonymous?: boolean;
}

export default function ContributorCard({ contributor, isAnonymous }: ContributorCardProps) {
    if (!contributor || isAnonymous) {
        return null;
    }

    return (
        <div className={styles.container}>
            <h4 className={styles.title}>Contributed by</h4>
            <div className={styles.content}>
                <span>Contributor #{contributor.id.slice(0, 8)}</span>
                {contributor.badge && (
                    <span className={styles.badge}>
                        {contributor.badge}
                    </span>
                )}
                <span className={styles.contributionCount}>
                    {contributor.contributionCount} contributions
                </span>
            </div>
        </div>
    );
}
