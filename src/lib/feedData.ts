export type PostType = 'event' | 'food' | 'place';

export interface Contributor {
    id: string;
    badge?: 'verified' | 'expert';
    contributionCount: number;
}

export interface Post {
    id: string;
    type: PostType;
    title: string;
    venue?: string; // For food/place posts
    content: string;
    images: string[];
    location: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    tags: string[];
    
    // Community metrics (replacing social metrics)
    views: number;
    helpfulVotes: number;
    visitCount?: number;
    
    // Verification & quality
    verified: boolean;
    isOfficial: boolean;
    trending: boolean;
    
    // Contributor info (Option B)
    contributor?: Contributor;
    isAnonymous: boolean;
    
    // Metadata
    timestamp: string;
    lastUpdated?: string;
    status?: 'active' | 'closed' | 'upcoming';
}

export const feedPosts: Post[] = [
    {
        id: '1',
        type: 'event',
        title: 'Malang Jazz Festival 2025',
        venue: 'Lembah Dieng',
        content: 'Get ready for the biggest jazz event in East Java! 🎷✨ Join us for a night of soulful melodies and unforgettable performances. Early bird tickets are selling out fast!',
        images: ['https://picsum.photos/seed/concert/800/600', 'https://picsum.photos/seed/crowd/800/600'],
        location: 'Lembah Dieng, Malang',
        coordinates: { lat: -7.9666, lng: 112.6326 },
        tags: ['Music', 'Festival', 'Jazz'],
        views: 3420,
        helpfulVotes: 1240,
        visitCount: 430,
        verified: true,
        isOfficial: true,
        trending: true,
        isAnonymous: false,
        contributor: {
            id: 'contrib_001',
            badge: 'verified',
            contributionCount: 12
        },
        timestamp: '2h ago',
        status: 'upcoming',
    },
    {
        id: '2',
        type: 'food',
        title: 'Bakso President - Legendary Meatball Soup',
        venue: 'Bakso President',
        content: 'Nothing beats a warm bowl of Bakso Malang on a rainy day. 🍜🌧️ Come visit our legendary spot right by the train tracks! Open daily 10AM - 9PM.',
        images: ['https://picsum.photos/seed/meatball/800/600'],
        location: 'Jl. Batanghari, Malang',
        coordinates: { lat: -7.9797, lng: 112.6304 },
        tags: ['Culinary', 'Legendary', 'StreetFood'],
        views: 2150,
        helpfulVotes: 892,
        visitCount: 456,
        verified: true,
        isOfficial: false,
        trending: false,
        isAnonymous: true,
        timestamp: '4h ago',
        status: 'active',
    },
    {
        id: '3',
        type: 'place',
        title: 'Kampung Warna Warni Jodipan',
        venue: 'Jodipan Village',
        content: 'Explore the vibrant colors of Jodipan! 🌈 A perfect spot for your Instagram feed. Don\'t forget to visit the glass bridge! 📸',
        images: ['https://picsum.photos/seed/colorful/800/600', 'https://picsum.photos/seed/bridge/800/600', 'https://picsum.photos/seed/village/800/600'],
        location: 'Jodipan, Malang',
        coordinates: { lat: -7.9826, lng: 112.6416 },
        tags: ['Tourism', 'Photography', 'HiddenGem'],
        views: 5230,
        helpfulVotes: 2100,
        visitCount: 890,
        verified: true,
        isOfficial: false,
        trending: true,
        isAnonymous: false,
        contributor: {
            id: 'contrib_002',
            badge: 'expert',
            contributionCount: 47
        },
        timestamp: '6h ago',
        status: 'active',
    },
    {
        id: '4',
        type: 'event',
        title: 'Malang Flower Carnival 2025',
        venue: 'Ijen Boulevard',
        content: 'Witness the spectacular display of floral costumes and creativity! 🌺🌸 Save the date: August 25th at Ijen Boulevard.',
        images: ['https://picsum.photos/seed/costume/800/600'],
        location: 'Ijen Boulevard, Malang',
        coordinates: { lat: -7.9778, lng: 112.6333 },
        tags: ['Culture', 'Carnival', 'Art'],
        views: 4100,
        helpfulVotes: 1500,
        visitCount: 600,
        verified: true,
        isOfficial: true,
        trending: false,
        isAnonymous: false,
        contributor: {
            id: 'contrib_003',
            badge: 'verified',
            contributionCount: 8
        },
        timestamp: '1d ago',
        status: 'upcoming',
    },
    {
        id: '5',
        type: 'food',
        title: 'Toko Oen - Heritage Ice Cream Since 1930',
        venue: 'Toko Oen',
        content: 'Step back in time and enjoy our classic ice cream. 🍦🕰️ Serving happiness since 1930.',
        images: ['https://picsum.photos/seed/icecream/800/600'],
        location: 'Jl. Basuki Rahmat, Malang',
        coordinates: { lat: -7.9826, lng: 112.6296 },
        tags: ['Heritage', 'Dessert', 'Vintage'],
        views: 1820,
        helpfulVotes: 750,
        visitCount: 320,
        verified: true,
        isOfficial: false,
        trending: false,
        isAnonymous: true,
        timestamp: '1d ago',
        status: 'active',
    },
];

