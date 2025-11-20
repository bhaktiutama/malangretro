"use client";

import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, Clock, DollarSign, Camera, Share2, Star, Wifi, ParkingCircle, Coffee } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./PlaceDetail.module.css";

export default function PlaceDetail({ params: _params }: { params: { id: string } }) {
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
                        <h1 className={styles.title}>Kampung Warna Warni</h1>
                        <div className={styles.meta}>
                            <span>TOURIST ATTRACTION</span>
                            <span>•</span>
                            <span>INSTAGRAM SPOT</span>
                        </div>
                    </div>

                    <div className={styles.gallery}>
                        <div className={styles.mainImage}>
                            <Image
                                src="https://picsum.photos/seed/jodipan-main/1200/800"
                                alt="Main Place Photo"
                                fill
                                style={{ objectFit: "cover" }}
                                priority
                            />
                        </div>
                        <div className={styles.sideImages}>
                            <div className={styles.sideImage} style={{ position: "relative" }}>
                                <Image
                                    src="https://picsum.photos/seed/jodipan-side1/600/400"
                                    alt="Side Place Photo 1"
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                            <div className={styles.sideImage} style={{ position: "relative" }}>
                                <Image
                                    src="https://picsum.photos/seed/jodipan-side2/600/400"
                                    alt="Side Place Photo 2"
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.contentGrid}>
                        <div className={styles.description}>
                            <p>
                                Kampung Warna Warni Jodipan is a vibrant village transformed into a colorful tourist destination. What was once a slum area has been revitalized with rainbow-colored houses, creating a stunning backdrop for photography and cultural exploration.
                            </p>
                            <p>
                                Walk through the narrow alleys painted in every color imaginable, cross the famous glass bridge, and experience the warmth of the local community. This place represents the perfect blend of art, culture, and urban renewal.
                            </p>
                            <h3 style={{ fontFamily: "var(--font-bebas)", fontSize: "2rem", color: "var(--color-accent-brown)", marginTop: "40px", marginBottom: "20px" }}>
                                Main Attractions
                            </h3>
                            <ul style={{ listStyle: "disc", paddingLeft: "20px", marginBottom: "20px" }}>
                                <li>Rainbow-colored houses and murals</li>
                                <li>Glass bridge with river views</li>
                                <li>3D street art installations</li>
                                <li>Local craft shops</li>
                                <li>Traditional food stalls</li>
                            </ul>
                            <h3 style={{ fontFamily: "var(--font-bebas)", fontSize: "2rem", color: "var(--color-accent-brown)", marginTop: "40px", marginBottom: "20px" }}>
                                Best Time to Visit
                            </h3>
                            <p>
                                Visit in the morning (8-10 AM) or late afternoon (3-5 PM) for the best lighting for photos. Weekdays are less crowded than weekends. The village is especially beautiful after rain when the colors appear more vibrant.
                            </p>
                            <h3 style={{ fontFamily: "var(--font-bebas)", fontSize: "2rem", color: "var(--color-accent-brown)", marginTop: "40px", marginBottom: "20px" }}>
                                Tips for Visitors
                            </h3>
                            <ul style={{ listStyle: "disc", paddingLeft: "20px", marginBottom: "20px" }}>
                                <li>Wear comfortable shoes for walking on uneven paths</li>
                                <li>Bring a camera or smartphone for photos</li>
                                <li>Respect the local residents and their privacy</li>
                                <li>Try local snacks from the street vendors</li>
                            </ul>
                        </div>

                        <aside>
                            <div className={styles.infoCard}>
                                <h3 className={styles.infoTitle}>Visitor Info</h3>

                                <div className={styles.infoItem}>
                                    <Clock size={20} className="text-primary" />
                                    <div>
                                        <div className={styles.infoLabel}>Opening Hours</div>
                                        <div>07:00 - 18:00 WIB</div>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <MapPin size={20} className="text-primary" />
                                    <div>
                                        <div className={styles.infoLabel}>Location</div>
                                        <div>Jodipan, Malang</div>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <DollarSign size={20} className="text-primary" />
                                    <div>
                                        <div className={styles.infoLabel}>Entrance Fee</div>
                                        <div>IDR 5K - 10K</div>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <Camera size={20} className="text-primary" />
                                    <div>
                                        <div className={styles.infoLabel}>Photo Spots</div>
                                        <div>20+ Locations</div>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 2v10"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 6 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/></svg>
                                    <div>
                                        <div className={styles.infoLabel}>Best Season</div>
                                        <div>All Year Round</div>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                                    <div>
                                        <div className={styles.infoLabel}>Accessibility</div>
                                        <div>Family Friendly</div>
                                    </div>
                                </div>

                                <div className={styles.facilities}>
                                    <h4 style={{ fontFamily: "var(--font-bebas)", fontSize: "1.2rem", color: "var(--color-accent-brown)", marginBottom: "15px" }}>Facilities</h4>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                        <div className={styles.facilityTag}>
                                            <ParkingCircle size={16} /> Parking
                                        </div>
                                        <div className={styles.facilityTag}>
                                            <Coffee size={16} /> Cafe
                                        </div>
                                        <div className={styles.facilityTag}>
                                            <Wifi size={16} /> WiFi
                                        </div>
                                    </div>
                                </div>

                                <button className={styles.bookButton}>
                                    Get Directions
                                </button>

                                <div style={{ marginTop: "20px", textAlign: "center" }}>
                                    <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", margin: "0 auto", fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                                        <Share2 size={16} /> Share Place
                                    </button>
                                </div>
                            </div>
                        </aside>
                    </div>

                    {/* Reviews Section */}
                    <section style={{ marginTop: "80px", borderTop: "2px dashed var(--color-accent-brown)", paddingTop: "60px" }}>
                        <h2 className={styles.title} style={{ fontSize: "2.5rem", marginBottom: "40px" }}>Visitor Reviews</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
                            {[
                                { name: "Sarah Johnson", rating: 5, review: "Absolutely stunning! Every corner is Instagram-worthy. The local community is so friendly and welcoming." },
                                { name: "Ahmad Rizki", rating: 5, review: "A must-visit in Malang! The transformation of this village is incredible. Great for family photos." },
                                { name: "Maria Santos", rating: 4, review: "Beautiful place with vibrant colors everywhere. Can get crowded on weekends, but still worth the visit!" }
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

                    {/* Related Places */}
                    <section style={{ marginTop: "80px" }}>
                        <h2 className={styles.title} style={{ fontSize: "2.5rem", marginBottom: "40px" }}>Similar Places</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
                            {[
                                { name: "Museum Angkut", type: "Museum", rating: 4.8 },
                                { name: "Kayutangan Heritage", type: "Heritage Site", rating: 4.6 },
                                { name: "Alun-Alun Malang", type: "City Square", rating: 4.5 },
                                { name: "Jatim Park 2", type: "Theme Park", rating: 4.7 }
                            ].map((place, i) => (
                                <div key={i} style={{ background: "#fff", border: "2px solid var(--color-accent-brown)", borderRadius: "var(--radius-md)", overflow: "hidden", cursor: "pointer" }}>
                                    <div style={{ height: "150px", background: "#eee", position: "relative" }}>
                                        <Image
                                            src={`https://picsum.photos/seed/place${i}/400/300`}
                                            alt={place.name}
                                            fill
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <div style={{ padding: "15px" }}>
                                        <h4 style={{ fontFamily: "var(--font-bebas)", fontSize: "1.2rem", color: "var(--color-accent-brown)", marginBottom: "5px" }}>{place.name}</h4>
                                        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "8px" }}>{place.type}</p>
                                        <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--color-accent-mustard)" }}>
                                            <Star size={14} fill="currentColor" />
                                            <span style={{ fontSize: "0.9rem", fontWeight: "600" }}>{place.rating}</span>
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
