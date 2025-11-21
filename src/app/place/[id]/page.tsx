import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, Clock, DollarSign, Camera, Share2 } from "lucide-react";
import { getPostById } from "@/lib/api/posts";
import { trackPostViewAction } from "@/app/actions/analytics";
import { parseFacilities } from "@/lib/mappers/postMapper";
import PlaceDetailClient from "./PlaceDetailClient";
import styles from "./PlaceDetail.module.css";

interface PlaceDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function PlaceDetailPage({ params }: PlaceDetailPageProps) {
    const resolvedParams = await params;
    // Fetch place data
    const post = await getPostById(resolvedParams.id);

    if (!post || post.type !== 'place') {
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

    return (
        <main>
            <Navbar />

            <div style={{ paddingTop: "var(--header-height)", minHeight: "100vh" }}>
                <PlaceDetailClient>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>{post.title}</h1>
                            <div className={styles.meta}>
                                <span>{post.tags[0]?.toUpperCase() || 'TOURIST ATTRACTION'}</span>
                                <span>•</span>
                                <span>{post.venue?.toUpperCase() || post.location.toUpperCase()}</span>
                            </div>
                        </div>

                        <div className={styles.gallery}>
                            <div className={styles.mainImage}>
                                <Image
                                    src={post.images[0] || 'https://picsum.photos/seed/place/1200/800'}
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
                                    <h3 className={styles.infoTitle}>Visitor Info</h3>

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

                                    {post.entrance_fee && (
                                        <div className={styles.infoItem}>
                                            <DollarSign size={20} className="text-primary" />
                                            <div>
                                                <div className={styles.infoLabel}>Entrance Fee</div>
                                                <div>{post.entrance_fee}</div>
                                            </div>
                                        </div>
                                    )}

                                    {post.photo_spots_count && (
                                        <div className={styles.infoItem}>
                                            <Camera size={20} className="text-primary" />
                                            <div>
                                                <div className={styles.infoLabel}>Photo Spots</div>
                                                <div>{post.photo_spots_count}</div>
                                            </div>
                                        </div>
                                    )}

                                    {post.best_season && (
                                        <div className={styles.infoItem}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 2v10" /><path d="m4.93 10.93 1.41 1.41" /><path d="M2 18h2" /><path d="M20 18h2" /><path d="m19.07 10.93-1.41 1.41" /><path d="M22 22H2" /><path d="m8 6 4-4 4 4" /><path d="M16 18a4 4 0 0 0-8 0" /></svg>
                                            <div>
                                                <div className={styles.infoLabel}>Best Season</div>
                                                <div>{post.best_season}</div>
                                            </div>
                                        </div>
                                    )}

                                    {post.accessibility && (
                                        <div className={styles.infoItem}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                                            <div>
                                                <div className={styles.infoLabel}>Accessibility</div>
                                                <div>{post.accessibility}</div>
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
                                            <Share2 size={16} /> Share Place
                                        </button>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </PlaceDetailClient>
            </div>

            <Footer />
        </main>
    );
}
