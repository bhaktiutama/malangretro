"use client";

import { useState, useEffect } from "react";
import { X, Upload, MapPin, Calendar, Clock, DollarSign, Tag, Plus, Utensils, Camera, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ContributionModal.module.css";
import { createPostAction, createPostImagesAction } from "@/app/actions/posts";
import type { CreatePostData } from "@/lib/api/posts";
import type { PostType } from "@/lib/feedData";

interface ContributionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContributionModal({ isOpen, onClose }: ContributionModalProps) {
    const [activeTab, setActiveTab] = useState<PostType>('event');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageUrls, setImageUrls] = useState<string>("");

    // Common fields
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [location, setLocation] = useState("");
    const [tags, setTags] = useState("");
    const [openingHours, setOpeningHours] = useState("");
    const [priceRange, setPriceRange] = useState("");

    // Event fields
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [organizer, setOrganizer] = useState("");

    // Food fields
    const [cuisineType, setCuisineType] = useState("");
    const [reservationInfo, setReservationInfo] = useState("");

    // Place fields
    const [entranceFee, setEntranceFee] = useState("");
    const [bestSeason, setBestSeason] = useState("");

    const resetAllFields = () => {
        setTitle("");
        setContent("");
        setLocation("");
        setTags("");
        setOpeningHours("");
        setPriceRange("");
        setEventDate("");
        setEventTime("");
        setOrganizer("");
        setCuisineType("");
        setReservationInfo("");
        setEntranceFee("");
        setBestSeason("");
        setImageUrls("");
        setError(null);
    };

    // Reset form when tab changes
    useEffect(() => {
        resetAllFields();
    }, [activeTab]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const postData: CreatePostData = {
                type: activeTab,
                title,
                content,
                location,
                tags: tags.split(',').map(t => t.trim()).filter(Boolean),
                opening_hours: openingHours,
                price_range: priceRange,

                // Event specific
                ...(activeTab === 'event' && {
                    event_date: eventDate,
                    event_start_time: eventTime,
                    organizer
                }),

                // Food specific
                ...(activeTab === 'food' && {
                    cuisine_type: cuisineType,
                    reservation_info: reservationInfo
                }),

                // Place specific
                ...(activeTab === 'place' && {
                    entrance_fee: entranceFee,
                    best_season: bestSeason
                })
            };

            const newPost = await createPostAction(postData);

            // Handle images if any
            if (imageUrls.trim()) {
                const urls = imageUrls.split(',').map(url => url.trim()).filter(Boolean);
                if (urls.length > 0) {
                    await createPostImagesAction(newPost.id, urls);
                }
            }

            resetAllFields();
            onClose();
        } catch (err: any) {
            console.error("Failed to create post:", err);
            setError(err.message || "Failed to create post. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.overlay}>
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    >
                        <div className={styles.header}>
                            <h2 className={styles.title}>Contribute to Malang Guide</h2>
                            <button onClick={onClose} className={styles.closeBtn}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className={styles.tabs}>
                            <button
                                className={`${styles.tab} ${activeTab === 'event' ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab('event')}
                            >
                                <Calendar size={18} /> Event
                            </button>
                            <button
                                className={`${styles.tab} ${activeTab === 'food' ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab('food')}
                            >
                                <Utensils size={18} /> Food
                            </button>
                            <button
                                className={`${styles.tab} ${activeTab === 'place' ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab('place')}
                            >
                                <MapPin size={18} /> Place
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            {error && <div className={styles.error}>{error}</div>}

                            <div className={styles.formGroup}>
                                <label>Title</label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., Malang Jazz Festival"
                                    required
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Description</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Tell us about this..."
                                    required
                                    className={styles.textarea}
                                />
                            </div>

                            <div className={styles.row}>
                                <div className={styles.formGroup}>
                                    <label>Location</label>
                                    <div className={styles.inputIconWrapper}>
                                        <MapPin size={16} className={styles.inputIcon} />
                                        <input
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder="Address or Area"
                                            required
                                            className={styles.inputWithIcon}
                                        />
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Tags</label>
                                    <div className={styles.inputIconWrapper}>
                                        <Tag size={16} className={styles.inputIcon} />
                                        <input
                                            value={tags}
                                            onChange={(e) => setTags(e.target.value)}
                                            placeholder="music, jazz, festival"
                                            className={styles.inputWithIcon}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Image URLs (comma separated)</label>
                                <div className={styles.inputIconWrapper}>
                                    <Camera size={16} className={styles.inputIcon} />
                                    <input
                                        value={imageUrls}
                                        onChange={(e) => setImageUrls(e.target.value)}
                                        placeholder="https://example.com/image1.jpg, https://..."
                                        className={styles.inputWithIcon}
                                    />
                                </div>
                            </div>

                            {/* Dynamic Fields based on Type */}
                            {activeTab === 'event' && (
                                <>
                                    <div className={styles.row}>
                                        <div className={styles.formGroup}>
                                            <label>Date</label>
                                            <input
                                                type="date"
                                                value={eventDate}
                                                onChange={(e) => setEventDate(e.target.value)}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Time</label>
                                            <input
                                                type="time"
                                                value={eventTime}
                                                onChange={(e) => setEventTime(e.target.value)}
                                                className={styles.input}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.formGroup}>
                                            <label>Organizer</label>
                                            <input
                                                value={organizer}
                                                onChange={(e) => setOrganizer(e.target.value)}
                                                placeholder="Event organizer"
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Price Range</label>
                                            <input
                                                value={priceRange}
                                                onChange={(e) => setPriceRange(e.target.value)}
                                                placeholder="Free, Rp 50.000, etc."
                                                className={styles.input}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {activeTab === 'food' && (
                                <>
                                    <div className={styles.row}>
                                        <div className={styles.formGroup}>
                                            <label>Cuisine Type</label>
                                            <input
                                                value={cuisineType}
                                                onChange={(e) => setCuisineType(e.target.value)}
                                                placeholder="Javanese, Chinese, etc."
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Price Range</label>
                                            <input
                                                value={priceRange}
                                                onChange={(e) => setPriceRange(e.target.value)}
                                                placeholder="$ - $$$"
                                                className={styles.input}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.formGroup}>
                                            <label>Opening Hours</label>
                                            <input
                                                value={openingHours}
                                                onChange={(e) => setOpeningHours(e.target.value)}
                                                placeholder="08:00 - 22:00"
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Reservation</label>
                                            <input
                                                value={reservationInfo}
                                                onChange={(e) => setReservationInfo(e.target.value)}
                                                placeholder="Required/Walk-in"
                                                className={styles.input}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {activeTab === 'place' && (
                                <>
                                    <div className={styles.row}>
                                        <div className={styles.formGroup}>
                                            <label>Entrance Fee</label>
                                            <input
                                                value={entranceFee}
                                                onChange={(e) => setEntranceFee(e.target.value)}
                                                placeholder="Free or amount"
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Best Season</label>
                                            <input
                                                value={bestSeason}
                                                onChange={(e) => setBestSeason(e.target.value)}
                                                placeholder="Dry season, etc."
                                                className={styles.input}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.formGroup}>
                                            <label>Opening Hours</label>
                                            <input
                                                value={openingHours}
                                                onChange={(e) => setOpeningHours(e.target.value)}
                                                placeholder="08:00 - 17:00"
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            {/* Empty cell for layout balance */}
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className={styles.footer}>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className={styles.cancelBtn}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={styles.submitBtn}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit Contribution"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
