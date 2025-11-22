import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, Calendar, Clock, Ticket } from "lucide-react";
import { getPostById } from "@/lib/api/posts";
import { trackPostViewAction } from "@/app/actions/analytics";
import { formatEventDate, formatEventTime } from "@/lib/mappers/postMapper";
import DetailPageWrapper from "@/components/shared/DetailPageWrapper";
import ContributorCard from "@/components/shared/ContributorCard";
import StatsDisplay from "@/components/shared/StatsDisplay";
import ShareButton from "@/components/shared/ShareButton";
import ImageGallery from "@/components/shared/ImageGallery";
import FacilityTags from "@/components/shared/FacilityTags";
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

    // Format date and time using helpers
    const eventDate = formatEventDate(post.event_date);
    const eventTime = formatEventTime(post.event_start_time, post.event_end_time);

    return (
        <main>
            <Navbar />

            <div style={{ paddingTop: "var(--header-height)", minHeight: "100vh" }}>
                <DetailPageWrapper>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>{post.title}</h1>
                            <div className={styles.meta}>
                                <span>{post.tags[0]?.toUpperCase() || 'EVENT'}</span>
                                <span>•</span>
                                <span>{post.venue?.toUpperCase() || post.location.toUpperCase()}</span>
                            </div>
                        </div>

                        <ImageGallery
                            images={post.images.length > 0 ? post.images : ['https://picsum.photos/seed/event/1200/800']}
                            title={post.title}
                            galleryClassName={styles.gallery}
                            mainImageClassName={styles.mainImage}
                            sideImagesClassName={styles.sideImages}
                            sideImageClassName={styles.sideImage}
                        />

                        <div className={styles.contentGrid}>
                            <div className={styles.description}>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>

                                <ContributorCard
                                    contributor={post.contributor}
                                    isAnonymous={post.isAnonymous}
                                />
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

                                    {post.facilities && Array.isArray(post.facilities) && post.facilities.length > 0 ? (
                                        <FacilityTags
                                            facilities={post.facilities.filter((f): f is string => typeof f === 'string')}
                                            containerClassName={styles.facilities}
                                            tagClassName={styles.facilityTag}
                                        />
                                    ) : null}

                                    <StatsDisplay
                                        views={post.views}
                                        helpfulVotes={post.helpfulVotes}
                                        visitCount={post.visitCount}
                                    />

                                    <ShareButton label="Share Event" />
                                </div>
                            </aside>
                        </div>
                    </div>
                </DetailPageWrapper>
            </div>

            <Footer />
        </main>
    );
}
