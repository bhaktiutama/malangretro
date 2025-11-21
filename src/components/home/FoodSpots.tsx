"use client";

import Image from "next/image";
import Link from "next/link";
import { ThumbsUp } from "lucide-react";
import styles from "./FoodSpots.module.css";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/feedData";

interface FoodSpotsProps {
    posts: Post[];
}

export default function FoodSpots({ posts }: FoodSpotsProps) {
    if (!posts || posts.length === 0) return null;

    // Helper to determine size based on index for bento grid
    const getSize = (index: number) => {
        const pattern = ["large", "tall", "normal", "normal", "wide", "normal"];
        return pattern[index % pattern.length];
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Top Food Spots</h2>
                    <p className={styles.subtitle}>
                        From legendary colonial-era restaurants to the best street food in town.
                    </p>
                </div>

                <div className={styles.bentoGrid}>
                    {posts.map((post, index) => {
                        const size = getSize(index);
                        const imageUrl = post.images?.[0] || `https://picsum.photos/seed/${post.id}/600/600`;

                        return (
                            <Link
                                href={`/food/${post.id}`}
                                key={post.id}
                                className={cn(
                                    styles.item,
                                    size === "large" && styles.itemLarge,
                                    size === "wide" && styles.itemWide,
                                    size === "tall" && styles.itemTall
                                )}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <div className={styles.rating}>
                                    <ThumbsUp size={14} fill="currentColor" /> {post.helpfulVotes}
                                </div>

                                <Image
                                    src={imageUrl}
                                    alt={post.title}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className={styles.image}
                                    sizes="(max-width: 768px) 100vw, 400px"
                                />

                                <div className={styles.overlay}>
                                    <span className={styles.itemCategory}>{post.cuisine_type || post.tags?.[0] || "Food"}</span>
                                    <h3 className={styles.itemName}>{post.title}</h3>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
