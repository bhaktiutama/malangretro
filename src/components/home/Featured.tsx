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
        const diff = (index - activeIndex + FEATURED_ITEMS.length) % FEATURED_ITEMS.length;

        // Center item
        if (diff === 0) {
            return {
                zIndex: 10,
                x: 0,
                scale: 1,
                opacity: 1,
                rotateY: 0
            };
        }

        // Right item
        if (diff === 1 || diff === - (FEATURED_ITEMS.length - 1)) {
            return {
                zIndex: 5,
                x: 150,
                scale: 0.85,
                opacity: 0.7,
                rotateY: -15
            };
        }

        // Left item
        if (diff === FEATURED_ITEMS.length - 1 || diff === -1) {
            return {
                zIndex: 5,
                x: -150,
                scale: 0.85,
                opacity: 0.7,
                rotateY: 15
            };
        }

        // Others hidden
        return {
            zIndex: 0,
            x: 0,
            scale: 0.5,
            opacity: 0,
            rotateY: 0
        };
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Featured This Week</h2>
                </div>

                <div className={styles.carouselContainer}>
                    <AnimatePresence initial={false}>
                        {FEATURED_ITEMS.map((item, index) => {
                            const style = getCardStyle(index);
                            // Only render visible items (center, left, right)
                            const isVisible = style.opacity > 0;

                            if (!isVisible) return null;

                            return (
                                <Link href="/feed?filter=event" key={item.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <motion.div
                                        className={styles.card}
                                        initial={false}
                                        animate={style}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        whileHover={{ y: -10 }}
                                    >
                                        <div className={styles.badge}>{item.tag}</div>
                                        <div className={styles.cardImage}>
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                style={{ objectFit: "cover" }}
                                                sizes="(max-width: 768px) 100vw, 350px"
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
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </AnimatePresence>
                </div>

                <div className={styles.controls}>
                    <button className={styles.controlBtn} onClick={prevSlide} aria-label="Previous">
                        <ArrowLeft size={24} />
                    </button>
                    <button className={styles.controlBtn} onClick={nextSlide} aria-label="Next">
                        <ArrowRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
}
