import React, { useState } from 'react';
import { PostType } from '@/lib/feedData';
import styles from './ContributionModal.module.css';

interface ContributionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContributionModal({ isOpen, onClose }: ContributionModalProps) {
    const [category, setCategory] = useState<PostType>('food');
    const [title, setTitle] = useState('');
    const [venue, setVenue] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement submission logic with anti-spam measures
        console.log('Contribution submitted:', {
            category,
            title,
            venue,
            description,
            location,
            tags: tags.split(',').map(t => t.trim()),
        });
        
        // Show success message
        alert('Thank you for your contribution! It will be reviewed before publishing.');
        
        // Reset form
        setTitle('');
        setVenue('');
        setDescription('');
        setLocation('');
        setTags('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2>Contribute to Malang Retro Guide</h2>
                    <button className={styles.closeBtn} onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Category Selection */}
                    <div className={styles.formGroup}>
                        <label>Category *</label>
                        <div className={styles.categoryButtons}>
                            <button
                                type="button"
                                className={`${styles.categoryBtn} ${category === 'event' ? styles.active : ''}`}
                                onClick={() => setCategory('event')}
                            >
                                🎉 Event
                            </button>
                            <button
                                type="button"
                                className={`${styles.categoryBtn} ${category === 'food' ? styles.active : ''}`}
                                onClick={() => setCategory('food')}
                            >
                                🍜 Food
                            </button>
                            <button
                                type="button"
                                className={`${styles.categoryBtn} ${category === 'place' ? styles.active : ''}`}
                                onClick={() => setCategory('place')}
                            >
                                📍 Place
                            </button>
                        </div>
                    </div>

                    {/* Title */}
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Title *</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Malang Jazz Festival 2025"
                            required
                            className={styles.input}
                        />
                    </div>

                    {/* Venue (for food/place) */}
                    {(category === 'food' || category === 'place') && (
                        <div className={styles.formGroup}>
                            <label htmlFor="venue">Venue Name *</label>
                            <input
                                id="venue"
                                type="text"
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}
                                placeholder="e.g., Toko Oen"
                                required
                                className={styles.input}
                            />
                        </div>
                    )}

                    {/* Description */}
                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Tell us about this place, event, or food..."
                            required
                            rows={4}
                            className={styles.textarea}
                        />
                    </div>

                    {/* Location */}
                    <div className={styles.formGroup}>
                        <label htmlFor="location">Location *</label>
                        <input
                            id="location"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g., Jl. Basuki Rahmat, Malang"
                            required
                            className={styles.input}
                        />
                    </div>

                    {/* Tags */}
                    <div className={styles.formGroup}>
                        <label htmlFor="tags">Tags (comma-separated)</label>
                        <input
                            id="tags"
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="e.g., Heritage, Dessert, Vintage"
                            className={styles.input}
                        />
                    </div>

                    {/* Info Box */}
                    <div className={styles.infoBox}>
                        <p>📝 <strong>Anonymous Contribution</strong></p>
                        <p>Your contribution will be reviewed before publishing. After 5 approved contributions, you'll be eligible to create an account for auto-publish privileges!</p>
                    </div>

                    {/* Submit Button */}
                    <div className={styles.actions}>
                        <button type="button" onClick={onClose} className={styles.cancelBtn}>
                            Cancel
                        </button>
                        <button type="submit" className={styles.submitBtn}>
                            Submit Contribution
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
