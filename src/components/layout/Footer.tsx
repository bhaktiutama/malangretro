import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <h3 className={styles.heading}>Malang Guide</h3>
                        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", lineHeight: "1.6" }}>
                            Your ultimate retro-styled guide to exploring the beautiful city of Malang.
                            Discover events, culinary delights, and hidden gems.
                        </p>
                        <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
                            <Link href="#" className={styles.link}><Instagram size={20} /></Link>
                            <Link href="#" className={styles.link}><Twitter size={20} /></Link>
                            <Link href="#" className={styles.link}><Facebook size={20} /></Link>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h3 className={styles.heading}>Quick Links</h3>
                        <ul className={styles.linkList}>
                            <li className={styles.linkItem}><Link href="/about" className={styles.link}>About Us</Link></li>
                            <li className={styles.linkItem}><Link href="/contact" className={styles.link}>Contact</Link></li>
                            <li className={styles.linkItem}><Link href="/advertise" className={styles.link}>Advertise</Link></li>
                            <li className={styles.linkItem}><Link href="/privacy" className={styles.link}>Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3 className={styles.heading}>Categories</h3>
                        <ul className={styles.linkList}>
                            <li className={styles.linkItem}><Link href="/events" className={styles.link}>Upcoming Events</Link></li>
                            <li className={styles.linkItem}><Link href="/culinary" className={styles.link}>Culinary Spots</Link></li>
                            <li className={styles.linkItem}><Link href="/places" className={styles.link}>Tourist Attractions</Link></li>
                            <li className={styles.linkItem}><Link href="/hidden-gems" className={styles.link}>Hidden Gems</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <div className={styles.newsletter}>
                            <h3 className={styles.heading} style={{ border: "none", marginBottom: "10px" }}>Join the Club!</h3>
                            <p style={{ fontSize: "0.8rem", marginBottom: "10px" }}>Get the latest updates delivered to your inbox.</p>
                            <div className={styles.inputGroup}>
                                <input type="email" placeholder="Your email..." className={styles.input} />
                                <button className={styles.button}><Mail size={16} /></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.copyright}>
                    &copy; {new Date().getFullYear()} Malang Event & Culinary Guide. Made with <span style={{ color: "var(--color-primary)" }}>♥</span> in Malang.
                </div>
            </div>
        </footer>
    );
}
