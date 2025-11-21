"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, ThumbsUp } from "lucide-react";
import type { Post } from "@/lib/feedData";
import styles from "./UserPosts.module.css";

interface UserPostsProps {
    posts: Post[];
}

export default function UserPosts({ posts }: UserPostsProps) {
    if (!posts || posts.length === 0) {
        return (
            <div className={styles.emptyState}>
                <h3>No contributions yet</h3>
                <p>Start sharing your favorite spots in Malang!</p>
                <Link href="/feed" className={styles.createBtn}>
                    Explore & Contribute
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>My Contributions</h2>
            <div className={styles.grid}>
                {posts.map((post) => (
                    <Link href={`/${post.type === 'event' ? 'events' : post.type}/${post.id}`} key={post.id} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={post.images?.[0] || `https://picsum.photos/seed/${post.id}/400/300`}
                                alt={post.title}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                            <div className={styles.badge}>{post.type}</div>
                        </div>
                        <div className={styles.content}>
                            <h3 className={styles.cardTitle}>{post.title}</h3>
                            <div className={styles.meta}>
                                <div className={styles.metaItem}>
                                    <MapPin size={14} /> {post.location}
                                </div>
                                <div className={styles.metaItem}>
                                    <ThumbsUp size={14} /> {post.helpfulVotes}
                                </div>
                            </div>
                            <div className={styles.status}>
                                <span className={`${styles.statusBadge} ${styles[post.status || 'active']}`}>
                                    {post.status || 'Active'}
                                </span>
                                <span className={styles.date}>{post.timestamp}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
