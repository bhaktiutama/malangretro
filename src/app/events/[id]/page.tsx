import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, Calendar, Clock, Ticket, Share2 } from "lucide-react";
import { getPostById } from "@/lib/api/posts";
import { trackPostViewAction } from "@/app/actions/analytics";
import EventDetailClient from "./EventDetailClient";
import styles from "./EventDetail.module.css";

interface EventDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
    const resolvedParams = await params;
    // Fetch event data
    const post = await getPostById(resolvedParams.id);

    if (!post || post.type !== 'event') {
        notFound();
    }

    // Track view (server-side)
    try {
        await trackPostViewAction(resolvedParams.id);
    } catch (error) {
        console.error('Error tracking view:', error);
    }

    // Format date
    const eventDate = post.event_date
        ? new Date(post.event_date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
        : 'TBA';

    // Format time
    const eventTime = post.event_start_time && post.event_end_time
        ? `${post.event_start_time} - ${post.event_end_time} WIB`
        : 'TBA';

    return (
        <main>
            <Navbar />

            <div style={{ paddingTop: "var(--header-height)", minHeight: "100vh" }}>
                <EventDetailClient>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>{post.title}</h1>
                            <div className={styles.meta}>
                                <span>{post.tags[0]?.toUpperCase() || 'EVENT'}</span>
                                <span>•</span>
                                <span>{post.venue?.toUpperCase() || post.location.toUpperCase()}</span>
                            </div>
                        </div>

                        <div className={styles.gallery}>
                            <div className={styles.mainImage}>
                                <Image
                                    src={post.images[0] || 'https://picsum.photos/seed/event/1200/800'}
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
                                    <h3 className={styles.infoTitle}>Event Details</h3>

                                    <div className={styles.infoItem}>
                                        <Calendar size={20} className="text-primary" />
                                        <div>
                                            <div className={styles.infoLabel}>Date</div>
                                            <div>{eventDate}</div>
                                        </div>
                                    </div>

                                    <div className={styles.infoItem}>
                                        <Clock size={20} className="text-primary" />
                                        <div>
                                            <div className={styles.infoLabel}>Time</div>
                                            <div>{eventTime}</div>
                                        </div>
                                    </div>

                                    <div className={styles.infoItem}>
                                        <MapPin size={20} className="text-primary" />
                                        <div>
                                            <div className={styles.infoLabel}>Location</div>
                                            <div>{post.location}</div>
                                        </div>
                                    </div>

                                    {post.price_range && (
                                        <div className={styles.infoItem}>
                                            <Ticket size={20} className="text-primary" />
                                            <div>
                                                <div className={styles.infoLabel}>Price</div>
                                                <div>{post.price_range}</div>
                                            </div>
                                        </div>
                                    )}

                                    {post.capacity && (
                                        <div className={styles.infoItem}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                            <div>
                                                <div className={styles.infoLabel}>Capacity</div>
                                                <div>{post.capacity.toLocaleString()} People</div>
                                            </div>
                                        </div>
                                    )}

                                    {post.organizer && (
                                        <div className={styles.infoItem}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                            <div>
                                                <div className={styles.infoLabel}>Organizer</div>
                                                <div>{post.organizer}</div>
                                            </div>
                                        </div>
                                    )}

                                    {post.facilities && Array.isArray(post.facilities) && post.facilities.length > 0 && (
                                        <div className={styles.facilities}>
                                            <h4 style={{ fontFamily: "var(--font-bebas)", fontSize: "1.2rem", color: "var(--color-accent-brown)", marginBottom: "15px" }}>Facilities</h4>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                                {(post.facilities as string[]).map((facility: string, idx: number) => (
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
                                            <Share2 size={16} /> Share Event
                                        </button>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </EventDetailClient>
            </div>

            <Footer />
        </main>
    );
}
