"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import styles from "./Featured.module.css";
import type { Post } from "@/lib/feedData";

interface FeaturedProps {
    posts: Post[];
}

export default function Featured({ posts }: FeaturedProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Fallback if no posts
    if (!posts || posts.length === 0) {
        return null;
    }

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % posts.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + posts.length) % posts.length);
    };

    const getCardStyle = (index: number) => {
        const total = posts.length;
        // Calculate distance from active index, handling wrap-around
        let diff = (index - activeIndex + total) % total;

        // Adjust diff to be -1, 0, 1 for the immediate neighbors
        if (diff > total / 2) diff -= total;

        // Center item
        if (diff === 0) {
            return {
                zIndex: 10,
                x: "0%",
                scale: 1,
                opacity: 1,
                display: "block"
            };
        }

        // Right item (next)
        if (diff === 1) {
            return {
                zIndex: 5,
                x: "60%", // Push to right
                scale: 0.85,
                opacity: 0.6,
                display: "block"
            };
        }

        // Left item (prev)
        if (diff === -1 || diff === total - 1) {
            return {
                zIndex: 5,
                x: "-60%", // Push to left
                scale: 0.85,
                opacity: 0.6,
                display: "block"
            };
        }

        // Others hidden
        return {
            zIndex: 0,
            x: "0%",
            scale: 0.5,
            opacity: 0,
            display: "none"
        };
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Featured This Week</h2>
                </div>

                <div className={styles.carouselWrapper}>
                    {posts.map((post, index) => {
                        const style = getCardStyle(index);
                        const imageUrl = post.images?.[0] || `https://picsum.photos/seed/${post.id}/600/800`;

                        return (
                            <motion.div
                                key={post.id}
                                className={styles.cardWrapper}
                                initial={false}
                                animate={style}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                <Link href={`/${post.type === 'event' ? 'events' : post.type}/${post.id}`} className={styles.cardLink}>
                                    <div className={styles.card}>
                                        <div className={styles.badge}>
                                            {post.tags?.[0] || (post.trending ? "TRENDING" : "FEATURED")}
                                        </div>
                                        <div className={styles.cardImage}>
                                            <Image
                                                src={imageUrl}
                                                alt={post.title}
                                                fill
                                                style={{ objectFit: "cover" }}
                                                sizes="(max-width: 768px) 100vw, 400px"
                                            />
                                        </div>
                                        <div className={styles.cardContent}>
                                            <div>
                                                <h3 className={styles.cardTitle}>{post.title}</h3>
                                                <div className={styles.cardLocation}>
                                                    <MapPin size={14} />
                                                    {post.location}
                                                </div>
                                            </div>
                                            <div className={styles.cardDate}>
                                                {post.event_date
                                                    ? new Date(post.event_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }).toUpperCase()
                                                    : (post.opening_hours || "OPEN DAILY")}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                <div className={styles.controls}>
                    <button className={styles.controlBtn} onClick={prevSlide} aria-label="Previous">
                        <ArrowLeft size={24} />
                    </button>
                    <div className={styles.dots}>
                        {posts.map((_, index) => (
                            <button
                                key={index}
                                className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
                                onClick={() => setActiveIndex(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                    <button className={styles.controlBtn} onClick={nextSlide} aria-label="Next">
                        <ArrowRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
}
