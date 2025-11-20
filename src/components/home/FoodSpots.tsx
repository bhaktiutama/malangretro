"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import styles from "./FoodSpots.module.css";
import { cn } from "@/lib/utils";

const FOOD_SPOTS = [
    {
        id: 1,
        name: "Toko Oen",
        category: "Legendary",
        rating: 4.8,
        image: "https://picsum.photos/seed/tokooen/600/600",
        size: "large" // span 2x2
    },
    {
        id: 2,
        name: "Bakso President",
        category: "Street Food",
        rating: 4.7,
        image: "https://picsum.photos/seed/bakso/400/600",
        size: "tall" // span 1x2
    },
    {
        id: 3,
        name: "Rawon Nguling",
        category: "Traditional",
        rating: 4.6,
        image: "https://picsum.photos/seed/rawon/400/400",
        size: "normal"
    },
    {
        id: 4,
        name: "Pos Ketan Legenda",
        category: "Snack",
        rating: 4.5,
        image: "https://picsum.photos/seed/ketan/400/400",
        size: "normal"
    },
    {
        id: 5,
        name: "Depot Hok Lay",
        category: "Chinese-Javanese",
        rating: 4.6,
        image: "https://picsum.photos/seed/hoklay/600/400",
        size: "wide" // span 2x1
    },
    {
        id: 6,
        name: "Es Teler Dempo",
        category: "Dessert",
        rating: 4.7,
        image: "https://picsum.photos/seed/esteler/400/400",
        size: "normal"
    }
];

export default function FoodSpots() {
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
                    {FOOD_SPOTS.map((item) => (
                        <Link 
                            href={`/food/${item.id}`}
                            key={item.id}
                            className={cn(
                                styles.item,
                                item.size === "large" && styles.itemLarge,
                                item.size === "wide" && styles.itemWide,
                                item.size === "tall" && styles.itemTall
                            )}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div className={styles.rating}>
                                <Star size={14} fill="currentColor" /> {item.rating}
                            </div>

                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                style={{ objectFit: "cover" }}
                                className={styles.image}
                                sizes="(max-width: 768px) 100vw, 400px"
                            />

                            <div className={styles.overlay}>
                                <span className={styles.itemCategory}>{item.category}</span>
                                <h3 className={styles.itemName}>{item.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
