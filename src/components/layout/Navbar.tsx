"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, Bell } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./Navbar.module.css";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            className={cn(styles.navbar, isScrolled && styles.scrolled)}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    Malang<span style={{ color: "var(--color-secondary)" }}>Guide</span>
                </Link>

                <div className={styles.navLinks}>
                    <Link href="/events" className={styles.link}>Events</Link>
                    <Link href="/culinary" className={styles.link}>Culinary</Link>
                    <Link href="/places" className={styles.link}>Places</Link>
                    <Link href="/about" className={styles.link}>About</Link>
                </div>

                <div className={styles.actions}>
                    <button className={styles.iconButton} aria-label="Search">
                        <Search size={20} strokeWidth={2.5} />
                    </button>
                    <button className={styles.iconButton} aria-label="Notifications">
                        <Bell size={20} strokeWidth={2.5} />
                    </button>
                    <button className={cn(styles.iconButton, styles.mobileMenuBtn)} aria-label="Menu">
                        <Menu size={20} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </motion.nav>
    );
}
