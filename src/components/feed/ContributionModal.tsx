import React, { useState } from 'react';
import { PostType } from '@/lib/feedData';
import styles from './ContributionModal.module.css';

interface ContributionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContributionModal({ isOpen, onClose }: ContributionModalProps) {
    const [category, setCategory] = useState<PostType>('event');

    // Common fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [facilities, setFacilities] = useState('');

    // Event-specific fields
    const [eventType, setEventType] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTimeStart, setEventTimeStart] = useState('');
    const [eventTimeEnd, setEventTimeEnd] = useState('');
    const [eventPrice, setEventPrice] = useState('');
    const [eventCapacity, setEventCapacity] = useState('');
    const [eventOrganizer, setEventOrganizer] = useState('');

    // Food-specific fields
    const [venueName, setVenueName] = useState('');
    const [cuisineType, setCuisineType] = useState('');
    const [openingHours, setOpeningHours] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [reservationRequired, setReservationRequired] = useState(false);
    const [parkingAvailable, setParkingAvailable] = useState(false);
    const [paymentCash, setPaymentCash] = useState(false);
    const [paymentCard, setPaymentCard] = useState(false);
    const [paymentEWallet, setPaymentEWallet] = useState(false);

    // Place-specific fields
    const [placeName, setPlaceName] = useState('');
    const [placeCategory, setPlaceCategory] = useState('');
    const [placeOpeningHours, setPlaceOpeningHours] = useState('');
    const [entranceFee, setEntranceFee] = useState('');
    const [bestTimeToVisit, setBestTimeToVisit] = useState('');
    const [instagramWorthy, setInstagramWorthy] = useState(false);
    const [accessibility, setAccessibility] = useState('');

    const handleCategoryChange = (newCategory: PostType) => {
        setCategory(newCategory);
        // Reset all fields when category changes
        resetAllFields();
    };

    const resetAllFields = () => {
        setTitle('');
        setDescription('');
        setLocation('');
        setFacilities('');
        // Event
        setEventType('');
        setEventDate('');
        setEventTimeStart('');
        setEventTimeEnd('');
        setEventPrice('');
        setEventCapacity('');
        setEventOrganizer('');
        // Food
        setVenueName('');
        setCuisineType('');
        setOpeningHours('');
        setPriceRange('');
        setReservationRequired(false);
        setParkingAvailable(false);
        setPaymentCash(false);
        setPaymentCard(false);
        setPaymentEWallet(false);
        // Place
        setPlaceName('');
        setPlaceCategory('');
        setPlaceOpeningHours('');
        setEntranceFee('');
        setBestTimeToVisit('');
        setInstagramWorthy(false);
        setAccessibility('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const baseData = {
            category,
            description,
            location,
            facilities: facilities.split(',').map(f => f.trim()).filter(Boolean),
        };

        let submissionData;

        if (category === 'event') {
            submissionData = {
                ...baseData,
                title,
                eventType,
                date: eventDate,
                timeStart: eventTimeStart,
                timeEnd: eventTimeEnd,
                price: eventPrice,
                capacity: eventCapacity,
                organizer: eventOrganizer,
            };
        } else if (category === 'food') {
            const paymentMethods = [];
            if (paymentCash) paymentMethods.push('Cash');
            if (paymentCard) paymentMethods.push('Card');
            if (paymentEWallet) paymentMethods.push('E-Wallet');

            submissionData = {
                ...baseData,
                venueName,
                cuisineType,
                openingHours,
                priceRange,
                reservationRequired,
                parkingAvailable,
                paymentMethods,
            };
        } else { // place
            submissionData = {
                ...baseData,
                placeName,
                placeCategory,
                openingHours: placeOpeningHours,
                entranceFee,
                bestTimeToVisit,
                instagramWorthy,
                accessibility,
            };
        }

        console.log('Contribution submitted:', submissionData);
        alert('Thank you for your contribution! It will be reviewed before publishing.');

        resetAllFields();
        onClose();
    };

    if (!isOpen) return null;

    const renderEventFields = () => (
        <>
            <div className={styles.formGroup}>
                <label htmlFor="title">Event Title *</label>
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

            <div className={styles.formGroup}>
                <label htmlFor="eventType">Event Type *</label>
                <select
                    id="eventType"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    required
                    className={styles.input}
                >
                    <option value="">Select type...</option>
                    <option value="Music">Music</option>
                    <option value="Art">Art</option>
                    <option value="Sports">Sports</option>
                    <option value="Festival">Festival</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Exhibition">Exhibition</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="eventDate">Date *</label>
                    <input
                        id="eventDate"
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="eventTimeStart">Start Time *</label>
                    <input
                        id="eventTimeStart"
                        type="time"
                        value={eventTimeStart}
                        onChange={(e) => setEventTimeStart(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="eventTimeEnd">End Time</label>
                    <input
                        id="eventTimeEnd"
                        type="time"
                        value={eventTimeEnd}
                        onChange={(e) => setEventTimeEnd(e.target.value)}
                        className={styles.input}
                    />
                </div>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="location">Location *</label>
                <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Lembah Dieng, Malang"
                    required
                    className={styles.input}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="eventPrice">Price *</label>
                <input
                    id="eventPrice"
                    type="text"
                    value={eventPrice}
                    onChange={(e) => setEventPrice(e.target.value)}
                    placeholder="e.g., IDR 150K - 300K or Free"
                    required
                    className={styles.input}
                />
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="eventCapacity">Expected Capacity</label>
                    <input
                        id="eventCapacity"
                        type="text"
                        value={eventCapacity}
                        onChange={(e) => setEventCapacity(e.target.value)}
                        placeholder="e.g., 5,000 People"
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="eventOrganizer">Organizer</label>
                    <input
                        id="eventOrganizer"
                        type="text"
                        value={eventOrganizer}
                        onChange={(e) => setEventOrganizer(e.target.value)}
                        placeholder="e.g., Malang Creative"
                        className={styles.input}
                    />
                </div>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="description">Description *</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the event..."
                    required
                    rows={4}
                    className={styles.textarea}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="facilities">Facilities (comma-separated)</label>
                <input
                    id="facilities"
                    type="text"
                    value={facilities}
                    onChange={(e) => setFacilities(e.target.value)}
                    placeholder="e.g., Parking, Food Court, WiFi, Restrooms"
                    className={styles.input}
                />
            </div>
        </>
    );

    const renderFoodFields = () => (
        <>
            <div className={styles.formGroup}>
                <label htmlFor="venueName">Venue Name *</label>
                <input
                    id="venueName"
                    type="text"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="e.g., Toko Oen"
                    required
                    className={styles.input}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="cuisineType">Cuisine Type *</label>
                <select
                    id="cuisineType"
                    value={cuisineType}
                    onChange={(e) => setCuisineType(e.target.value)}
                    required
                    className={styles.input}
                >
                    <option value="">Select cuisine...</option>
                    <option value="Indonesian">Indonesian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Western">Western</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Dutch-Indonesian">Dutch-Indonesian</option>
                    <option value="Street Food">Street Food</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Cafe">Cafe</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="description">Description *</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the restaurant, menu highlights, ambiance..."
                    required
                    rows={4}
                    className={styles.textarea}
                />
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="openingHours">Opening Hours *</label>
                    <input
                        id="openingHours"
                        type="text"
                        value={openingHours}
                        onChange={(e) => setOpeningHours(e.target.value)}
                        placeholder="e.g., 09:00 - 21:00 WIB"
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="priceRange">Price Range *</label>
                    <select
                        id="priceRange"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        required
                        className={styles.input}
                    >
                        <option value="">Select range...</option>
                        <option value="IDR 10K - 30K">$ (IDR 10K - 30K)</option>
                        <option value="IDR 30K - 100K">$$ (IDR 30K - 100K)</option>
                        <option value="IDR 100K - 300K">$$$ (IDR 100K - 300K)</option>
                        <option value="IDR 300K+">$$$$ (IDR 300K+)</option>
                    </select>
                </div>
            </div>

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

            <div className={styles.formGroup}>
                <label>Payment Methods</label>
                <div className={styles.checkboxGroup}>
                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={paymentCash}
                            onChange={(e) => setPaymentCash(e.target.checked)}
                        />
                        <span>Cash</span>
                    </label>
                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={paymentCard}
                            onChange={(e) => setPaymentCard(e.target.checked)}
                        />
                        <span>Card</span>
                    </label>
                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={paymentEWallet}
                            onChange={(e) => setPaymentEWallet(e.target.checked)}
                        />
                        <span>E-Wallet</span>
                    </label>
                </div>
            </div>

            <div className={styles.formGroup}>
                <label>Additional Info</label>
                <div className={styles.checkboxGroup}>
                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={reservationRequired}
                            onChange={(e) => setReservationRequired(e.target.checked)}
                        />
                        <span>Reservation Recommended</span>
                    </label>
                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={parkingAvailable}
                            onChange={(e) => setParkingAvailable(e.target.checked)}
                        />
                        <span>Parking Available</span>
                    </label>
                </div>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="facilities">Facilities (comma-separated)</label>
                <input
                    id="facilities"
                    type="text"
                    value={facilities}
                    onChange={(e) => setFacilities(e.target.value)}
                    placeholder="e.g., AC, WiFi, Outdoor Seating, Family Room"
                    className={styles.input}
                />
            </div>
        </>
    );

    const renderPlaceFields = () => (
        <>
            <div className={styles.formGroup}>
                <label htmlFor="placeName">Place Name *</label>
                <input
                    id="placeName"
                    type="text"
                    value={placeName}
                    onChange={(e) => setPlaceName(e.target.value)}
                    placeholder="e.g., Kampung Warna Warni"
                    required
                    className={styles.input}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="placeCategory">Category *</label>
                <select
                    id="placeCategory"
                    value={placeCategory}
                    onChange={(e) => setPlaceCategory(e.target.value)}
                    required
                    className={styles.input}
                >
                    <option value="">Select category...</option>
                    <option value="Museum">Museum</option>
                    <option value="Park">Park</option>
                    <option value="Heritage Site">Heritage Site</option>
                    <option value="Tourist Spot">Tourist Spot</option>
                    <option value="Theme Park">Theme Park</option>
                    <option value="City Square">City Square</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="description">Description *</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the place, main attractions, best features..."
                    required
                    rows={4}
                    className={styles.textarea}
                />
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="placeOpeningHours">Opening Hours *</label>
                    <input
                        id="placeOpeningHours"
                        type="text"
                        value={placeOpeningHours}
                        onChange={(e) => setPlaceOpeningHours(e.target.value)}
                        placeholder="e.g., 07:00 - 18:00 WIB"
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="entranceFee">Entrance Fee *</label>
                    <input
                        id="entranceFee"
                        type="text"
                        value={entranceFee}
                        onChange={(e) => setEntranceFee(e.target.value)}
                        placeholder="e.g., IDR 5K - 10K or Free"
                        required
                        className={styles.input}
                    />
                </div>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="location">Location *</label>
                <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Jodipan, Malang"
                    required
                    className={styles.input}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="accessibility">Accessibility *</label>
                <select
                    id="accessibility"
                    value={accessibility}
                    onChange={(e) => setAccessibility(e.target.value)}
                    required
                    className={styles.input}
                >
                    <option value="">Select accessibility...</option>
                    <option value="Family Friendly">Family Friendly</option>
                    <option value="Wheelchair Accessible">Wheelchair Accessible</option>
                    <option value="Senior Friendly">Senior Friendly</option>
                    <option value="All Ages">All Ages</option>
                    <option value="Adults Only">Adults Only</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="bestTimeToVisit">Best Time to Visit</label>
                <input
                    id="bestTimeToVisit"
                    type="text"
                    value={bestTimeToVisit}
                    onChange={(e) => setBestTimeToVisit(e.target.value)}
                    placeholder="e.g., Morning (8-10 AM) for best lighting"
                    className={styles.input}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.checkbox}>
                    <input
                        type="checkbox"
                        checked={instagramWorthy}
                        onChange={(e) => setInstagramWorthy(e.target.checked)}
                    />
                    <span>Instagram-Worthy Photo Spot</span>
                </label>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="facilities">Facilities (comma-separated)</label>
                <input
                    id="facilities"
                    type="text"
                    value={facilities}
                    onChange={(e) => setFacilities(e.target.value)}
                    placeholder="e.g., Parking, Cafe, WiFi"
                    className={styles.input}
                />
            </div>
        </>
    );

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
                                onClick={() => handleCategoryChange('event')}
                            >
                                🎉 Event
                            </button>
                            <button
                                type="button"
                                className={`${styles.categoryBtn} ${category === 'food' ? styles.active : ''}`}
                                onClick={() => handleCategoryChange('food')}
                            >
                                🍜 Food
                            </button>
                            <button
                                type="button"
                                className={`${styles.categoryBtn} ${category === 'place' ? styles.active : ''}`}
                                onClick={() => handleCategoryChange('place')}
                            >
                                📍 Place
                            </button>
                        </div>
                    </div>

                    {/* Dynamic Fields Based on Category */}
                    {category === 'event' && renderEventFields()}
                    {category === 'food' && renderFoodFields()}
                    {category === 'place' && renderPlaceFields()}

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
