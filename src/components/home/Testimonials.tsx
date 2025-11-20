"use client";

import Image from "next/image";
import styles from "./Testimonials.module.css";

const TESTIMONIALS = [
    {
        id: 1,
        name: "Budi Santoso",
        role: "Food Blogger",
        quote: "This guide brought back so many memories! The culinary recommendations are spot on. Toko Oen is a must-visit.",
        avatar: "https://picsum.photos/seed/avatar1/100/100"
    },
    {
        id: 2,
        name: "Siti Aminah",
        role: "Traveler",
        quote: "I love the retro vibe of the website. It matches the atmosphere of Malang perfectly. Found some hidden gems I never knew about!",
        avatar: "https://picsum.photos/seed/avatar2/100/100"
    },
    {
        id: 3,
        name: "Joko Anwar",
        role: "Local Guide",
        quote: "Finally, a curated list of events that actually matters. The 'Vintage Market' recommendation was the highlight of my weekend.",
        avatar: "https://picsum.photos/seed/avatar3/100/100"
    }
];

export default function Testimonials() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>What They Say</h2>
                </div>

                <div className={styles.grid}>
                    {TESTIMONIALS.map((item) => (
                        <div key={item.id} className={styles.card}>
                            <div className={styles.bubble}>
                                <p className={styles.quote}>&quot;{item.quote}&quot;</p>
                            </div>
                            <div className={styles.author}>
                                <div className={styles.avatar}>
                                    <Image
                                        src={item.avatar}
                                        alt={item.name}
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                                <div className={styles.authorInfo}>
                                    <span className={styles.name}>{item.name}</span>
                                    <span className={styles.role}>{item.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
