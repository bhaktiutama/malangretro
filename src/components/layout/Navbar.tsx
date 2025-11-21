"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, Bell, User as UserIcon, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import styles from "./Navbar.module.css";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        // Check initial session
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            subscription.unsubscribe();
        };
    }, [supabase.auth]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

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
                    <Link href="/feed?filter=event" className={styles.link}>Events</Link>
                    <Link href="/feed?filter=food" className={styles.link}>Culinary</Link>
                    <Link href="/feed?filter=place" className={styles.link}>Places</Link>
                    <Link href="/about" className={styles.link}>About</Link>
                </div>

                <div className={styles.actions}>
                    <button className={styles.iconButton} aria-label="Search">
                        <Search size={20} strokeWidth={2.5} />
                    </button>

                    {user ? (
                        <>
                            <button className={styles.iconButton} aria-label="Notifications">
                                <Bell size={20} strokeWidth={2.5} />
                            </button>
                            <Link href="/profile" className={styles.iconButton} aria-label="Profile">
                                <UserIcon size={20} strokeWidth={2.5} />
                            </Link>
                            <button
                                className={styles.iconButton}
                                onClick={handleSignOut}
                                aria-label="Sign Out"
                                title="Sign Out"
                            >
                                <LogOut size={20} strokeWidth={2.5} />
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className={styles.loginBtn}>
                            Sign In
                        </Link>
                    )}

                    <button
                        className={cn(styles.iconButton, styles.mobileMenuBtn)}
                        aria-label="Menu"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu size={20} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </motion.nav>
    );
}
