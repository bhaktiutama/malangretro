"use client";

import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, Calendar, Clock, Ticket, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./EventDetail.module.css";

export default function EventDetail({ params: _params }: { params: { id: string } }) {
    return (
        <main>
            <Navbar />

            <div style={{ paddingTop: "var(--header-height)", minHeight: "100vh" }}>
                <motion.div
                    className={styles.container}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={styles.header}>
                        <h1 className={styles.title}>Malang Jazz Festival 2025</h1>
                        <div className={styles.meta}>
                            <span>MUSIC FESTIVAL</span>
                            <span>•</span>
                            <span>LEMBAH DIENG</span>
                        </div>
                    </div>

                    <div className={styles.gallery}>
                        <div className={styles.mainImage}>
                            <Image
                                src="https://picsum.photos/seed/jazzmain/1200/800"
                                alt="Main Event Photo"
                                fill
                                style={{ objectFit: "cover" }}
                                priority
                            />
                        </div>
                        <div className={styles.sideImages}>
                            <div className={styles.sideImage} style={{ position: "relative" }}>
                                <Image
                                    src="https://picsum.photos/seed/jazzside1/600/400"
                                    alt="Side Event Photo 1"
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                            <div className={styles.sideImage} style={{ position: "relative" }}>
                                <Image
                                    src="https://picsum.photos/seed/jazzside2/600/400"
                                    alt="Side Event Photo 2"
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.contentGrid}>
                        <div className={styles.description}>
                            <p>
                                Get ready for the biggest jazz celebration in East Java! The Malang Jazz Festival returns in 2025 with a spectacular lineup of local and international artists. Set against the beautiful backdrop of Lembah Dieng, this event promises an unforgettable atmosphere of music, culture, and nature.
                            </p>
                            <p>
                                Experience the magic of jazz under the stars. From smooth jazz to fusion and experimental sounds, there&apos;s something for every music lover. Don&apos;t miss out on the culinary bazaar featuring Malang&apos;s legendary street food and modern bites.
                            </p>
                            <h3 style={{ fontFamily: "var(--font-bebas)", fontSize: "2rem", color: "var(--color-accent-brown)", marginTop: "40px", marginBottom: "20px" }}>
                                Lineup Highlights
                            </h3>
                            <ul style={{ listStyle: "disc", paddingLeft: "20px", marginBottom: "20px" }}>
                                <li>Indra Lesmana Project</li>
                                <li>Tulus</li>
                                <li>Maliq & D&apos;Essentials</li>
                                <li>And many more!</li>
                            </ul>
                        </div>

                        <aside>
                            <div className={styles.infoCard}>
                                <h3 className={styles.infoTitle}>Event Details</h3>

                                <div className={styles.infoItem}>
                                    <Calendar size={20} className="text-primary" />
                                    <div>
                                        <div className={styles.infoLabel}>Date</div>
                                        <div>24 November 2025</div>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <Clock size={20} className="text-primary" />
                                    <div>
                                        <div className={styles.infoLabel}>Time</div>
                                        <div>15:00 - 23:00 WIB</div>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <MapPin size={20} className="text-primary" />
                                    <div>
                                        <div className={styles.infoLabel}>Location</div>
                                        <div>Lembah Dieng, Malang</div>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <Ticket size={20} className="text-primary" />
                                    <div>
                                        <div className={styles.infoLabel}>Price</div>
                                        <div>Start from IDR 150K</div>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                    <div>
                                        <div className={styles.infoLabel}>Capacity</div>
                                        <div>5,000 People</div>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                    <div>
                                        <div className={styles.infoLabel}>Organizer</div>
                                        <div>Malang Creative</div>
                                    </div>
                                </div>

                                <div className={styles.facilities}>
                                    <h4 style={{ fontFamily: "var(--font-bebas)", fontSize: "1.2rem", color: "var(--color-accent-brown)", marginBottom: "15px" }}>Facilities</h4>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                        <div className={styles.facilityTag}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                                            Parking
                                        </div>
                                        <div className={styles.facilityTag}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                                            Food Court
                                        </div>
                                        <div className={styles.facilityTag}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></svg>
                                            Restrooms
                                        </div>
                                        <div className={styles.facilityTag}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                                            WiFi
                                        </div>
                                    </div>
                                </div>

                                <button className={styles.bookButton}>
                                    Get Tickets Now
                                </button>

                                <div style={{ marginTop: "20px", textAlign: "center" }}>
                                    <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", margin: "0 auto", fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                                        <Share2 size={16} /> Share Event
                                    </button>
                                </div>
                            </div>
                        </aside>
                    </div>

                    {/* Reviews Section */}
                    <section style={{ marginTop: "80px", borderTop: "2px dashed var(--color-accent-brown)", paddingTop: "60px" }}>
                        <h2 className={styles.title} style={{ fontSize: "2.5rem", marginBottom: "40px" }}>Reviews</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
                            {[1, 2, 3].map((i) => (
                                <div key={i} style={{ background: "#fff", padding: "20px", border: "1px solid var(--color-accent-brown)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                        <span style={{ fontFamily: "var(--font-bebas)", fontSize: "1.2rem", color: "var(--color-accent-brown)" }}>User {i}</span>
                                        <span style={{ color: "var(--color-accent-mustard)" }}>★★★★★</span>
                                    </div>
                                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: "1.6" }}>
                                        &quot;Absolutely amazing event! The atmosphere was incredible and the lineup was top notch. Can&apos;t wait for next year!&quot;
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Related Events */}
                    <section style={{ marginTop: "80px" }}>
                        <h2 className={styles.title} style={{ fontSize: "2.5rem", marginBottom: "40px" }}>You Might Also Like</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} style={{ background: "#fff", border: "2px solid var(--color-accent-brown)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
                                    <div style={{ height: "150px", background: "#eee", position: "relative" }}>
                                        <Image
                                            src={`https://picsum.photos/seed/related${i}/400/300`}
                                            alt={`Related Event ${i}`}
                                            fill
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <div style={{ padding: "15px" }}>
                                        <h4 style={{ fontFamily: "var(--font-bebas)", fontSize: "1.2rem", color: "var(--color-accent-brown)" }}>Related Event {i}</h4>
                                        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "var(--color-text-muted)" }}>Location • Date</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
