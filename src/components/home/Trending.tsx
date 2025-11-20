"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import styles from "./Trending.module.css";

const TRENDING_EVENTS = [
    {
        id: 1,
        title: "Pasar Kangen Malang",
        category: "Festival",
        day: "12",
        month: "DEC",
        location: "Rampal",
        time: "15:00",
        price: "FREE",
        image: "https://picsum.photos/seed/market/400/300"
    },
    {
        id: 2,
        title: "Retro Music Night",
        category: "Music",
        day: "15",
        month: "DEC",
        location: "Houtenhand",
        time: "19:00",
        price: "50K",
        image: "https://picsum.photos/seed/concert/400/300"
    },
    {
        id: 3,
        title: "Sunday Morning Ride",
        category: "Community",
        day: "18",
        month: "DEC",
        location: "Ijen Blvd",
        time: "06:00",
        price: "FREE",
        image: "https://picsum.photos/seed/bike/400/300"
    },
    {
        id: 4,
        title: "Art Exhibition: Nostalgia",
        category: "Art",
        day: "20",
        month: "DEC",
        location: "DKM",
        time: "10:00",
        price: "25K",
        image: "https://picsum.photos/seed/art/400/300"
    },
    {
        id: 5,
        title: "Coffee Brewing Class",
        category: "Workshop",
        day: "22",
        month: "DEC",
        location: "Kayutangan",
        time: "13:00",
        price: "150K",
        image: "https://picsum.photos/seed/coffee/400/300"
    },
    {
        id: 6,
        title: "Vintage Market",
        category: "Shopping",
        day: "25",
        month: "DEC",
        location: "MOG",
        time: "10:00",
        price: "FREE",
        image: "https://picsum.photos/seed/vintage/400/300"
    }
];

export default function Trending() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Trending Events</h2>
                    <Link href="/events" className={styles.viewAll}>
                        View All Events <ArrowRight size={18} />
                    </Link>
                </div>

                <div className={styles.grid}>
                    {TRENDING_EVENTS.map((event) => (
                        <Link href={`/events/${event.id}`} key={event.id} className={styles.card}>
                            <div className={styles.imageContainer}>
                                <div className={styles.dateBadge}>
                                    <div className={styles.dateDay}>{event.day}</div>
                                    <div className={styles.dateMonth}>{event.month}</div>
                                </div>
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    sizes="(max-width: 768px) 100vw, 400px"
                                />
                            </div>

                            <div className={styles.content}>
                                <div className={styles.category}>{event.category}</div>
                                <h3 className={styles.cardTitle}>{event.title}</h3>

                                <div className={styles.info}>
                                    <div className={styles.infoItem}>
                                        <MapPin size={14} /> {event.location}
                                    </div>
                                    <div className={styles.infoItem}>
                                        <Clock size={14} /> {event.time}
                                    </div>
                                </div>

                                <div className={styles.price}>{event.price}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
