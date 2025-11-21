import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, Clock, DollarSign, Utensils, Share2 } from "lucide-react";
import { getPostById } from "@/lib/api/posts";
import { trackPostViewAction } from "@/app/actions/analytics";
import { parseFacilities, parsePaymentMethods } from "@/lib/mappers/postMapper";
import FoodDetailClient from "./FoodDetailClient";
import styles from "./FoodDetail.module.css";

interface FoodDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function FoodDetailPage({ params }: FoodDetailPageProps) {
    const resolvedParams = await params;
    // Fetch food data
    const post = await getPostById(resolvedParams.id);

    if (!post || post.type !== 'food') {
        notFound();
    }

    // Track view (server-side)
    try {
        await trackPostViewAction(resolvedParams.id);
    } catch (error) {
        console.error('Error tracking view:', error);
    }

    // Parse JSON fields
    const facilities = parseFacilities(post.facilities);
    const paymentMethods = parsePaymentMethods(post.payment_methods);

    return (
        <main>
            <Navbar />

            <div style={{ paddingTop: "var(--header-height)", minHeight: "100vh" }}>
                <FoodDetailClient>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>{post.title}</h1>
                            <div className={styles.meta}>
                                <span>{post.cuisine_type?.toUpperCase() || 'CULINARY'}</span>
                                <span>•</span>
                                <span>{post.venue?.toUpperCase() || post.location.toUpperCase()}</span>
                            </div>
                        </div>

                        <div className={styles.gallery}>
                            <div className={styles.mainImage}>
                                <Image
                                    src={post.images[0] || 'https://picsum.photos/seed/food/1200/800'}
                                    alt={post.title}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    priority
                                />
                            </div>
                            {post.images.length > 1 && (
                                <div className={styles.sideImages}>
                                    {post.images.slice(1, 3).map((img, idx) => (
                                        <div key={idx} className={styles.sideImage} style={{ position: "relative" }}>
                                            <Image
                                                src={img}
                                                alt={`${post.title} - Image ${idx + 2}`}
                                                fill
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className={styles.contentGrid}>
                            <div className={styles.description}>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>

                                {post.contributor && !post.isAnonymous && (
                                    <div style={{
                                        marginTop: '40px',
                                        padding: '20px',
                                        background: '#f9f9f9',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-accent-brown)'
                                    }}>
                                        <h4 style={{
                                            fontFamily: 'var(--font-bebas)',
                                            fontSize: '1.2rem',
                                            color: 'var(--color-accent-brown)',
                                            marginBottom: '10px'
                                        }}>
                                            Contributed by
                                        </h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span>Contributor #{post.contributor.id.slice(0, 8)}</span>
                                            {post.contributor.badge && (
                                                <span style={{
                                                    background: 'var(--color-accent-mustard)',
                                                    color: '#fff',
                                                    padding: '2px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '0.8rem',
                                                    textTransform: 'uppercase'
                                                }}>
                                                    {post.contributor.badge}
                                                </span>
                                            )}
                                            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                                                {post.contributor.contributionCount} contributions
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <aside>
                                <div className={styles.infoCard}>
                                    <h3 className={styles.infoTitle}>Restaurant Info</h3>

                                    {post.opening_hours && (
                                        <div className={styles.infoItem}>
                                            <Clock size={20} className="text-primary" />
                                            <div>
                                                <div className={styles.infoLabel}>Opening Hours</div>
                                                <div>{post.opening_hours}</div>
                                            </div>
                                        </div>
                                    )}

                                    <div className={styles.infoItem}>
                                        <MapPin size={20} className="text-primary" />
                                        <div>
                                            <div className={styles.infoLabel}>Location</div>
                                            <div>{post.location}</div>
                                        </div>
                                    </div>

                                    {post.price_range && (
                                        <div className={styles.infoItem}>
                                            <DollarSign size={20} className="text-primary" />
                                            <div>
                                                <div className={styles.infoLabel}>Price Range</div>
                                                <div>{post.price_range}</div>
                                            </div>
                                        </div>
                                    )}

                                    {post.cuisine_type && (
                                        <div className={styles.infoItem}>
                                            <Utensils size={20} className="text-primary" />
                                            <div>
                                                <div className={styles.infoLabel}>Cuisine Type</div>
                                                <div>{post.cuisine_type}</div>
                                            </div>
                                        </div>
                                    )}

                                    {post.reservation_info && (
                                        <div className={styles.infoItem}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                            <div>
                                                <div className={styles.infoLabel}>Reservation</div>
                                                <div>{post.reservation_info}</div>
                                            </div>
                                        </div>
                                    )}

                                    {paymentMethods.length > 0 && (
                                        <div className={styles.infoItem}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
                                            <div>
                                                <div className={styles.infoLabel}>Payment</div>
                                                <div>{paymentMethods.join(', ')}</div>
                                            </div>
                                        </div>
                                    )}

                                    {facilities.length > 0 && (
                                        <div className={styles.facilities}>
                                            <h4 style={{ fontFamily: "var(--font-bebas)", fontSize: "1.2rem", color: "var(--color-accent-brown)", marginBottom: "15px" }}>Facilities</h4>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                                {facilities.map((facility: string, idx: number) => (
                                                    <div key={idx} className={styles.facilityTag}>
                                                        {facility}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-around", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                                            <div style={{ textAlign: "center" }}>
                                                <div style={{ fontWeight: "bold", color: "var(--color-accent-brown)" }}>{post.views}</div>
                                                <div>Views</div>
                                            </div>
                                            <div style={{ textAlign: "center" }}>
                                                <div style={{ fontWeight: "bold", color: "var(--color-accent-brown)" }}>{post.helpfulVotes}</div>
                                                <div>Helpful</div>
                                            </div>
                                            {post.visitCount !== undefined && (
                                                <div style={{ textAlign: "center" }}>
                                                    <div style={{ fontWeight: "bold", color: "var(--color-accent-brown)" }}>{post.visitCount}</div>
                                                    <div>Visits</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                                        <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", margin: "0 auto", fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                                            <Share2 size={16} /> Share Restaurant
                                        </button>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </FoodDetailClient>
            </div>

            <Footer />
        </main>
    );
}
