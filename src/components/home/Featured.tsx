"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import styles from "./Featured.module.css";

const FEATURED_ITEMS = [
    {
        id: 1,
        title: "Malang Jazz Festival",
        date: "24 NOV 2025",
        location: "Lembah Dieng",
        image: "https://picsum.photos/seed/jazz/600/800",
        tag: "HOT!"
    },
    {
        id: 2,
        title: "Kampung Warna Warni",
        date: "OPEN DAILY",
        location: "Jodipan",
        image: "https://picsum.photos/seed/colors/600/800",
        tag: "POPULAR"
    },
    {
        id: 3,
        title: "Museum Angkut Night",
        date: "EVERY WEEKEND",
        location: "Batu City",
        image: "https://picsum.photos/seed/cars/600/800",
        tag: "MUST VISIT"
    },
    {
        id: 4,
        title: "Bromo Sunrise Tour",
        date: "DAILY TRIP",
        location: "TNBTS",
        image: "https://picsum.photos/seed/mountain/600/800",
        tag: "ADVENTURE"
    },
    {
        id: 5,
        title: "Kayutangan Heritage",
        date: "OPEN 24H",
        location: "Jl. Basuki Rahmat",
        image: "https://picsum.photos/seed/street/600/800",
        tag: "HERITAGE"
    }
];

export default function Featured() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % FEATURED_ITEMS.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + FEATURED_ITEMS.length) % FEATURED_ITEMS.length);
    };

    const getCardStyle = (index: number) => {
        const total = FEATURED_ITEMS.length;
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
                    {FEATURED_ITEMS.map((item, index) => {
                        const style = getCardStyle(index);
                        return (
                            <motion.div
                                key={item.id}
                                className={styles.cardWrapper}
                                initial={false}
                                animate={style}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                <Link href="/feed?filter=event" className={styles.cardLink}>
                                    <div className={styles.card}>
                                        <div className={styles.badge}>{item.tag}</div>
                                        <div className={styles.cardImage}>
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                style={{ objectFit: "cover" }}
                                                sizes="(max-width: 768px) 100vw, 400px"
                                            />
                                        </div>
                                        <div className={styles.cardContent}>
                                            <div>
                                                <h3 className={styles.cardTitle}>{item.title}</h3>
                                                <div className={styles.cardLocation}>
                                                    <MapPin size={14} />
                                                    {item.location}
                                                </div>
                                            </div>
                                            <div className={styles.cardDate}>{item.date}</div>
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
                        {FEATURED_ITEMS.map((_, index) => (
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
