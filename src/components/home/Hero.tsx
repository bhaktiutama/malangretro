"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const yMountains = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section ref={ref} className={styles.hero}>
            <div className={styles.sunburst} />

            {/* Parallax Content */}
            <motion.div style={{ y: yText }} className={styles.content}>
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 50, rotate: -5 }}
                    animate={{ opacity: 1, y: 0, rotate: -2 }}
                    transition={{ duration: 0.8, ease: "backOut" }}
                >
                    MALANG<br />RETRO GUIDE
                </motion.h1>

                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    Taste the Past, Live the Present
                </motion.p>

                <motion.div
                    className={styles.searchContainer}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                >
                    <div className={styles.searchBar}>
                        <input
                            type="text"
                            placeholder="Search events, food, or places..."
                            className={styles.searchInput}
                        />
                        <button className={styles.searchButton}>
                            <Search size={24} />
                        </button>
                    </div>

                    <div className={styles.toggles}>
                        <label className={styles.toggleLabel}>
                            <input type="checkbox" defaultChecked className={styles.toggleCheckbox} />
                            Events
                        </label>
                        <label className={styles.toggleLabel}>
                            <input type="checkbox" defaultChecked className={styles.toggleCheckbox} />
                            Culinary
                        </label>
                        <label className={styles.toggleLabel}>
                            <input type="checkbox" defaultChecked className={styles.toggleCheckbox} />
                            Places
                        </label>
                    </div>
                </motion.div>
            </motion.div>

            {/* Parallax Mountains (SVG Placeholder) */}
            <motion.div style={{ y: yMountains }} className={styles.mountainShape}>
                <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: 'auto', display: 'block' }}>
                    <path fill="#5D4037" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    <path fill="#8D6E63" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </motion.div>
        </section>
    );
}
