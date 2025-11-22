import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, Clock, DollarSign, Utensils } from "lucide-react";
import { getPostById } from "@/lib/api/posts";
import { trackPostViewAction } from "@/app/actions/analytics";
import { parseFacilities, parsePaymentMethods } from "@/lib/mappers/postMapper";
import DetailPageWrapper from "@/components/shared/DetailPageWrapper";
import ContributorCard from "@/components/shared/ContributorCard";
import StatsDisplay from "@/components/shared/StatsDisplay";
import ShareButton from "@/components/shared/ShareButton";
import ImageGallery from "@/components/shared/ImageGallery";
import FacilityTags from "@/components/shared/FacilityTags";
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
                <DetailPageWrapper>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>{post.title}</h1>
                            <div className={styles.meta}>
                                <span>{post.cuisine_type?.toUpperCase() || 'CULINARY'}</span>
                                <span>•</span>
                                <span>{post.venue?.toUpperCase() || post.location.toUpperCase()}</span>
                            </div>
                        </div>

                        <ImageGallery
                            images={post.images.length > 0 ? post.images : ['https://picsum.photos/seed/food/1200/800']}
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

                                    <ShareButton label="Share Restaurant" />
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
