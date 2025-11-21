"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import styles from "./Trending.module.css";
import type { Post } from "@/lib/feedData";

interface TrendingProps {
    posts: Post[];
}

export default function Trending({ posts }: TrendingProps) {
    if (!posts || posts.length === 0) return null;

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Trending Events</h2>
                    <Link href="/feed?filter=event&trending=true" className={styles.viewAll}>
                        View All Events <ArrowRight size={18} />
                    </Link>
                </div>

                <div className={styles.grid}>
                    {posts.map((post) => {
                        const date = post.event_date ? new Date(post.event_date) : new Date();
                        const day = date.getDate();
                        const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
                        const imageUrl = post.images?.[0] || `https://picsum.photos/seed/${post.id}/400/300`;
                        const price = post.price_range || post.entrance_fee || "FREE";

                        return (
                            <Link href={`/events/${post.id}`} key={post.id} className={styles.card}>
                                <div className={styles.imageContainer}>
                                    <div className={styles.dateBadge}>
                                        <div className={styles.dateDay}>{day}</div>
                                        <div className={styles.dateMonth}>{month}</div>
                                    </div>
                                    <Image
                                        src={imageUrl}
                                        alt={post.title}
                                        fill
                                        style={{ objectFit: "cover" }}
                                        sizes="(max-width: 768px) 100vw, 400px"
                                    />
                                </div>

                                <div className={styles.content}>
                                    <div className={styles.category}>{post.tags?.[0] || "Event"}</div>
                                    <h3 className={styles.cardTitle}>{post.title}</h3>

                                    <div className={styles.info}>
                                        <div className={styles.infoItem}>
                                            <MapPin size={14} /> {post.location}
                                        </div>
                                        <div className={styles.infoItem}>
                                            <Clock size={14} /> {post.event_start_time || post.opening_hours || "TBA"}
                                        </div>
                                    </div>

                                    <div className={styles.price}>{price}</div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
