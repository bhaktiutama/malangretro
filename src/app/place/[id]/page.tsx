import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, Clock, DollarSign, Camera } from "lucide-react";
import { getPostById } from "@/lib/api/posts";
import { trackPostViewAction } from "@/app/actions/analytics";
import { parseFacilities } from "@/lib/mappers/postMapper";
import DetailPageWrapper from "@/components/shared/DetailPageWrapper";
import ContributorCard from "@/components/shared/ContributorCard";
import StatsDisplay from "@/components/shared/StatsDisplay";
import ShareButton from "@/components/shared/ShareButton";
import ImageGallery from "@/components/shared/ImageGallery";
import FacilityTags from "@/components/shared/FacilityTags";
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
                <DetailPageWrapper>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>{post.title}</h1>
                            <div className={styles.meta}>
                                <span>{post.tags[0]?.toUpperCase() || 'TOURIST ATTRACTION'}</span>
                                <span>•</span>
                                <span>{post.venue?.toUpperCase() || post.location.toUpperCase()}</span>
                            </div>
                        </div>

                        <ImageGallery
                            images={post.images.length > 0 ? post.images : ['https://picsum.photos/seed/place/1200/800']}
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

                                    <FacilityTags
                                        facilities={facilities}
                                        containerClassName={styles.facilities}
                                        tagClassName={styles.facilityTag}
                                    />

                                    <StatsDisplay
                                        views={post.views}
                                        helpfulVotes={post.helpfulVotes}
                                        visitCount={post.visitCount}
                                    />

                                    <ShareButton label="Share Place" />
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
