"use client";

import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, Clock, DollarSign, Utensils, Share2, Star } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./FoodDetail.module.css";

export default function FoodDetail({ params: _params }: { params: { id: string } }) {
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
                        <h1 className={styles.title}>Toko Oen</h1>
                        <div className={styles.meta}>
                            <span>LEGENDARY RESTAURANT</span>
                            <span>•</span>
                            <span>COLONIAL ERA</span>
                        </div>
                    </div>

                    <div className={styles.gallery}>
                        <div className={styles.mainImage}>
                            <Image
                                src="https://picsum.photos/seed/tokooen-main/1200/800"
                                alt="Main Food Photo"
                                fill
                                style={{ objectFit: "cover" }}
                                priority
                            />
                        </div>
                        <div className={styles.sideImages}>
                            <div className={styles.sideImage} style={{ position: "relative" }}>
                                <Image
                                    src="https://picsum.photos/seed/tokooen-side1/600/400"
                                    alt="Side Food Photo 1"
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                            <div className={styles.sideImage} style={{ position: "relative" }}>
                                <Image
                                    src="https://picsum.photos/seed/tokooen-side2/600/400"
                                    alt="Side Food Photo 2"
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.contentGrid}>
                        <div className={styles.description}>
                            <p>
                                Step back in time at Toko Oen, a legendary restaurant that has been serving Malang since 1930. This colonial-era establishment is famous for its authentic Dutch-Indonesian cuisine and classic ice cream that has delighted generations of visitors.
                            </p>
                            <p>
                                The vintage interior, complete with original furniture and decor, creates a nostalgic atmosphere that perfectly complements the timeless menu. Don&apos;t miss their signature ice cream sundaes and traditional Dutch pastries.
                            </p>
                            <h3 style={{ fontFamily: "var(--font-bebas)", fontSize: "2rem", color: "var(--color-accent-brown)", marginTop: "40px", marginBottom: "20px" }}>
                                Menu Highlights
                            </h3>
                            <ul style={{ listStyle: "disc", paddingLeft: "20px", marginBottom: "20px" }}>
                                <li>Classic Ice Cream Sundae</li>
                                <li>Nasi Rames Toko Oen</li>
                                <li>Dutch Pastries</li>
                                <li>Iced Coffee</li>
                                <li>Bistik Jawa</li>
                            </ul>
                            <h3 style={{ fontFamily: "var(--font-bebas)", fontSize: "2rem", color: "var(--color-accent-brown)", marginTop: "40px", marginBottom: "20px" }}>
                                Ambiance
                            </h3>
                            <p>
                                The restaurant maintains its original 1930s charm with vintage furniture, classic checkered floors, and warm lighting. Perfect for family gatherings, romantic dinners, or solo trips down memory lane.
                            </p>
                        </div>

                        <aside>
                            <div className={styles.infoCard}>
                                <h3 className={styles.infoTitle}>Restaurant Info</h3>

                                <div className={styles.infoItem}>
                                    <Clock size={20} className="text-primary" />
                                    <div>
                                        <div className={styles.infoLabel}>Opening Hours</div>
                                        <div>09:00 - 21:00 WIB</div>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <MapPin size={20} className="text-primary" />
                                    <div>
                                        <div className={styles.infoLabel}>Location</div>
                                        <div>Jl. Basuki Rahmat, Malang</div>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <DollarSign size={20} className="text-primary" />
                                    <div>
                                        <div className={styles.infoLabel}>Price Range</div>
                                        <div>IDR 30K - 100K</div>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <Utensils size={20} className="text-primary" />
                                    <div>
                                        <div className={styles.infoLabel}>Cuisine Type</div>
                                        <div>Dutch-Indonesian</div>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                    <div>
                                        <div className={styles.infoLabel}>Reservation</div>
                                        <div>Recommended</div>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                                    <div>
                                        <div className={styles.infoLabel}>Parking</div>
                                        <div>Available</div>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                                    <div>
                                        <div className={styles.infoLabel}>Payment</div>
                                        <div>Cash, Card, E-Wallet</div>
                                    </div>
                                </div>

                                <div className={styles.facilities}>
                                    <h4 style={{ fontFamily: "var(--font-bebas)", fontSize: "1.2rem", color: "var(--color-accent-brown)", marginBottom: "15px" }}>Facilities</h4>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                        <div className={styles.facilityTag}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                                            AC
                                        </div>
                                        <div className={styles.facilityTag}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                                            WiFi
                                        </div>
                                        <div className={styles.facilityTag}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" x2="6" y1="1" y2="4"/><line x1="10" x2="10" y1="1" y2="4"/><line x1="14" x2="14" y1="1" y2="4"/></svg>
                                            Outdoor Seating
                                        </div>
                                        <div className={styles.facilityTag}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                            Family Room
                                        </div>
                                    </div>
                                </div>

                                <button className={styles.bookButton}>
                                    Reserve Table
                                </button>

                                <div style={{ marginTop: "20px", textAlign: "center" }}>
                                    <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", margin: "0 auto", fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                                        <Share2 size={16} /> Share Restaurant
                                    </button>
                                </div>
                            </div>
                        </aside>
                    </div>

                    {/* Reviews Section */}
                    <section style={{ marginTop: "80px", borderTop: "2px dashed var(--color-accent-brown)", paddingTop: "60px" }}>
                        <h2 className={styles.title} style={{ fontSize: "2.5rem", marginBottom: "40px" }}>Customer Reviews</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
                            {[
                                { name: "Budi Santoso", rating: 5, review: "The ice cream here is legendary! Tastes exactly like it did 30 years ago. A must-visit for anyone in Malang." },
                                { name: "Siti Aminah", rating: 5, review: "Beautiful vintage atmosphere and delicious food. The Bistik Jawa is my favorite!" },
                                { name: "Joko Anwar", rating: 4, review: "Great place for a nostalgic dining experience. Can get crowded on weekends, so come early!" }
                            ].map((review, i) => (
                                <div key={i} style={{ background: "#fff", padding: "20px", border: "1px solid var(--color-accent-brown)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                        <span style={{ fontFamily: "var(--font-bebas)", fontSize: "1.2rem", color: "var(--color-accent-brown)" }}>{review.name}</span>
                                        <span style={{ color: "var(--color-accent-mustard)" }}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                                    </div>
                                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: "1.6" }}>
                                        &quot;{review.review}&quot;
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Related Food Spots */}
                    <section style={{ marginTop: "80px" }}>
                        <h2 className={styles.title} style={{ fontSize: "2.5rem", marginBottom: "40px" }}>Similar Restaurants</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
                            {[
                                { name: "Depot Hok Lay", cuisine: "Chinese-Javanese", rating: 4.6 },
                                { name: "Rumah Makan Inggil", cuisine: "Traditional", rating: 4.5 },
                                { name: "Pia Cap Mangkok", cuisine: "Bakery", rating: 4.7 },
                                { name: "Warung Soto Arema", cuisine: "Street Food", rating: 4.8 }
                            ].map((spot, i) => (
                                <div key={i} style={{ background: "#fff", border: "2px solid var(--color-accent-brown)", borderRadius: "var(--radius-md)", overflow: "hidden", cursor: "pointer" }}>
                                    <div style={{ height: "150px", background: "#eee", position: "relative" }}>
                                        <Image
                                            src={`https://picsum.photos/seed/food${i}/400/300`}
                                            alt={spot.name}
                                            fill
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <div style={{ padding: "15px" }}>
                                        <h4 style={{ fontFamily: "var(--font-bebas)", fontSize: "1.2rem", color: "var(--color-accent-brown)", marginBottom: "5px" }}>{spot.name}</h4>
                                        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "8px" }}>{spot.cuisine}</p>
                                        <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--color-accent-mustard)" }}>
                                            <Star size={14} fill="currentColor" />
                                            <span style={{ fontSize: "0.9rem", fontWeight: "600" }}>{spot.rating}</span>
                                        </div>
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
