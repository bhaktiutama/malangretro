// @ts-nocheck
/**
 * Seed script to populate Supabase database with sample data
 * Run with: npx tsx supabase/seed.ts
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from '../src/lib/supabase/database.types'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing environment variables!')
    console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set')
    process.exit(1)
}

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey)

// Sample data
const samplePosts = [
    {
        type: 'event' as const,
        title: 'Malang Jazz Festival 2025',
        venue: 'Lembah Dieng',
        content: 'Get ready for the biggest jazz event in East Java! 🎷✨ Join us for a night of soulful melodies and unforgettable performances. Early bird tickets are selling out fast!\n\nExperience world-class jazz performances under the stars with stunning mountain views. This year\'s lineup features both international and local jazz legends.',
        location: 'Lembah Dieng, Malang',
        coordinates: { lat: -7.9666, lng: 112.6326 },
        tags: ['Music', 'Festival', 'Jazz'],
        event_date: '2025-11-24',
        event_start_time: '15:00',
        event_end_time: '23:00',
        capacity: 5000,
        organizer: 'Malang Creative',
        price_range: 'Start from IDR 150K',
        facilities: ['Parking', 'Food Court', 'Restrooms', 'WiFi'],
        verified: true,
        is_official: true,
        trending: true,
        is_anonymous: false
    },
    {
        type: 'food' as const,
        title: 'Bakso President - Legendary Meatball Soup',
        venue: 'Bakso President',
        content: 'Nothing beats a warm bowl of Bakso Malang on a rainy day. 🍜🌧️ Come visit our legendary spot right by the train tracks! Open daily 10AM - 9PM.\n\nServing authentic Bakso Malang since 1975. Our secret recipe has been passed down through three generations.',
        location: 'Jl. Batanghari, Malang',
        coordinates: { lat: -7.9797, lng: 112.6304 },
        tags: ['Culinary', 'Legendary', 'StreetFood'],
        cuisine_type: 'Indonesian',
        opening_hours: '10:00 - 21:00',
        price_range: 'IDR 15K - 35K',
        payment_methods: ['Cash', 'QRIS', 'GoPay'],
        reservation_info: 'Walk-in only',
        verified: true,
        is_official: false,
        trending: false,
        is_anonymous: true
    },
    {
        type: 'place' as const,
        title: 'Kampung Warna Warni Jodipan',
        venue: 'Jodipan Village',
        content: 'Explore the vibrant colors of Jodipan! 🌈 A perfect spot for your Instagram feed. Don\'t forget to visit the glass bridge! 📸\n\nThis colorful village was transformed from a slum area into a beautiful tourist destination through community art projects.',
        location: 'Jodipan, Malang',
        coordinates: { lat: -7.9826, lng: 112.6416 },
        tags: ['Tourism', 'Photography', 'HiddenGem'],
        entrance_fee: 'IDR 5K',
        photo_spots_count: '20+',
        best_season: 'All year round',
        accessibility: 'Wheelchair accessible',
        opening_hours: '08:00 - 17:00',
        facilities: ['Parking', 'Restrooms', 'Photo Spots', 'Souvenir Shop'],
        verified: true,
        is_official: false,
        trending: true,
        is_anonymous: false
    },
    {
        type: 'event' as const,
        title: 'Malang Flower Carnival 2025',
        venue: 'Ijen Boulevard',
        content: 'Witness the spectacular display of floral costumes and creativity! 🌺🌸 Save the date: August 25th at Ijen Boulevard.\n\nAn annual tradition showcasing elaborate flower-decorated costumes and floats. A celebration of Malang\'s rich cultural heritage.',
        location: 'Ijen Boulevard, Malang',
        coordinates: { lat: -7.9778, lng: 112.6333 },
        tags: ['Culture', 'Carnival', 'Art'],
        event_date: '2025-08-25',
        event_start_time: '09:00',
        event_end_time: '17:00',
        capacity: 10000,
        organizer: 'Malang City Government',
        price_range: 'Free',
        facilities: ['Parking', 'Food Stalls', 'Medical Post'],
        verified: true,
        is_official: true,
        trending: false,
        is_anonymous: false
    },
    {
        type: 'food' as const,
        title: 'Toko Oen - Heritage Ice Cream Since 1930',
        venue: 'Toko Oen',
        content: 'Step back in time and enjoy our classic ice cream. 🍦🕰️ Serving happiness since 1930.\n\nA historic restaurant and ice cream parlor that has been a Malang landmark for nearly a century. Try our famous Oen Special ice cream!',
        location: 'Jl. Basuki Rahmat, Malang',
        coordinates: { lat: -7.9826, lng: 112.6296 },
        tags: ['Heritage', 'Dessert', 'Vintage'],
        cuisine_type: 'Dutch-Indonesian',
        opening_hours: '09:00 - 21:00',
        price_range: 'IDR 25K - 75K',
        payment_methods: ['Cash', 'Debit Card', 'Credit Card'],
        reservation_info: 'Recommended for groups',
        verified: true,
        is_official: false,
        trending: false,
        is_anonymous: true
    },
    {
        type: 'place' as const,
        title: 'Coban Rondo Waterfall',
        venue: 'Coban Rondo',
        content: 'Experience the majestic 84-meter waterfall surrounded by lush forest! 🌊🌲 Perfect for nature lovers and adventure seekers.\n\nLocated at the foot of Mount Panderman, this waterfall offers stunning natural beauty and cool mountain air.',
        location: 'Pandesari, Pujon, Malang',
        coordinates: { lat: -7.8333, lng: 112.5167 },
        tags: ['Nature', 'Waterfall', 'Adventure'],
        entrance_fee: 'IDR 25K',
        photo_spots_count: '15+',
        best_season: 'Dry season (Apr-Oct)',
        accessibility: 'Moderate hiking required',
        opening_hours: '07:00 - 17:00',
        price_range: 'IDR 25K - 50K',
        facilities: ['Parking', 'Restrooms', 'Food Stalls', 'Camping Area'],
        verified: true,
        is_official: false,
        trending: true,
        is_anonymous: false
    },
    {
        type: 'event' as const,
        title: 'Malang Night Paradise',
        venue: 'Hawai Waterpark',
        content: 'Magical light festival featuring millions of LED lights! ✨🌟 Perfect for family outings and romantic dates.\n\nExplore themed zones with stunning light installations, from underwater worlds to enchanted forests.',
        location: 'Jl. Graha Kencana, Malang',
        coordinates: { lat: -7.9445, lng: 112.6089 },
        tags: ['Festival', 'Lights', 'Family'],
        event_date: '2025-12-01',
        event_start_time: '18:00',
        event_end_time: '22:00',
        capacity: 3000,
        organizer: 'Hawai Waterpark',
        price_range: 'IDR 50K - 75K',
        facilities: ['Parking', 'Food Court', 'Photo Spots', 'Restrooms'],
        verified: true,
        is_official: true,
        trending: true,
        is_anonymous: false
    },
    {
        type: 'food' as const,
        title: 'Depot Rawon Nguling',
        venue: 'Rawon Nguling',
        content: 'Authentic East Java black soup (rawon) that will blow your mind! 🍲🔥 A must-try for food enthusiasts.\n\nRich, aromatic beef soup with a unique black color from kluwek nuts. Served with rice, bean sprouts, and salted egg.',
        location: 'Jl. Panglima Sudirman, Malang',
        coordinates: { lat: -7.9797, lng: 112.6304 },
        tags: ['Culinary', 'Traditional', 'Authentic'],
        cuisine_type: 'Indonesian',
        opening_hours: '06:00 - 14:00',
        price_range: 'IDR 20K - 40K',
        payment_methods: ['Cash', 'QRIS'],
        reservation_info: 'Walk-in only, expect queues',
        verified: true,
        is_official: false,
        trending: true,
        is_anonymous: true
    }
]

const sampleImages = [
    { postIndex: 0, urls: ['https://picsum.photos/seed/jazz1/1200/800', 'https://picsum.photos/seed/jazz2/1200/800', 'https://picsum.photos/seed/jazz3/1200/800'] },
    { postIndex: 1, urls: ['https://picsum.photos/seed/bakso1/1200/800'] },
    { postIndex: 2, urls: ['https://picsum.photos/seed/jodipan1/1200/800', 'https://picsum.photos/seed/jodipan2/1200/800', 'https://picsum.photos/seed/jodipan3/1200/800'] },
    { postIndex: 3, urls: ['https://picsum.photos/seed/carnival1/1200/800', 'https://picsum.photos/seed/carnival2/1200/800'] },
    { postIndex: 4, urls: ['https://picsum.photos/seed/oen1/1200/800'] },
    { postIndex: 5, urls: ['https://picsum.photos/seed/coban1/1200/800', 'https://picsum.photos/seed/coban2/1200/800'] },
    { postIndex: 6, urls: ['https://picsum.photos/seed/lights1/1200/800', 'https://picsum.photos/seed/lights2/1200/800', 'https://picsum.photos/seed/lights3/1200/800'] },
    { postIndex: 7, urls: ['https://picsum.photos/seed/rawon1/1200/800'] }
]

async function seed() {
    console.log('🌱 Starting database seeding...\n')

    try {
        // Insert posts
        console.log('📝 Inserting posts...')
        const { data: posts, error: postsError } = await supabase
            .from('posts')
            .insert(samplePosts)
            .select('id')

        if (postsError) {
            throw new Error(`Failed to insert posts: ${postsError.message}`)
        }

        console.log(`✅ Inserted ${posts.length} posts\n`)

        // Insert images for each post
        console.log('🖼️  Inserting images...')
        let totalImages = 0

        for (const imageSet of sampleImages) {
            const postId = posts[imageSet.postIndex].id
            const images = imageSet.urls.map((url, index) => ({
                post_id: postId,
                image_url: url,
                storage_path: url,
                display_order: index
            }))

            const { error: imagesError } = await supabase
                .from('post_images')
                .insert(images)

            if (imagesError) {
                console.warn(`⚠️  Warning: Failed to insert images for post ${postId}: ${imagesError.message}`)
            } else {
                totalImages += images.length
            }
        }

        console.log(`✅ Inserted ${totalImages} images\n`)

        // Add some sample views and votes
        console.log('👁️  Adding sample views and votes...')

        for (const post of posts) {
            // Add random views (5-50)
            const viewCount = Math.floor(Math.random() * 45) + 5
            for (let i = 0; i < viewCount; i++) {
                await supabase
                    .from('post_views')
                    .insert({
                        post_id: post.id,
                        browser_fingerprint: `seed_fingerprint_${post.id}_${i}`
                    })
            }

            // Add random helpful votes (2-20)
            const voteCount = Math.floor(Math.random() * 18) + 2
            for (let i = 0; i < voteCount; i++) {
                await supabase
                    .from('helpful_votes')
                    .insert({
                        post_id: post.id,
                        browser_fingerprint: `seed_vote_${post.id}_${i}`
                    })
            }
        }

        console.log(`✅ Added sample views and votes\n`)

        console.log('🎉 Seeding completed successfully!')
        console.log('\n📊 Summary:')
        console.log(`   - Posts: ${posts.length}`)
        console.log(`   - Images: ${totalImages}`)
        console.log(`   - Views: Added to all posts`)
        console.log(`   - Votes: Added to all posts`)
        console.log('\n✨ Your database is now populated with sample data!')
        console.log('🚀 Run `npm run dev` to see the data in action!')

    } catch (error) {
        console.error('\n❌ Seeding failed:', error)
        process.exit(1)
    }
}

// Run the seed function
seed()
