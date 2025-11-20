export type PostType = 'event' | 'food' | 'place';

export interface Author {
    name: string;
    handle: string;
    avatar: string;
}

export interface Post {
    id: string;
    type: PostType;
    author: Author;
    content: string;
    images: string[];
    likes: number;
    comments: number;
    shares: number;
    timestamp: string;
    location?: string;
    tags: string[];
}

export const feedPosts: Post[] = [
    {
        id: '1',
        type: 'event',
        author: {
            name: 'Malang Jazz Festival',
            handle: '@malangjazzfest',
            avatar: 'https://picsum.photos/seed/jazz/100/100',
        },
        content: 'Get ready for the biggest jazz event in East Java! 🎷✨ Join us for a night of soulful melodies and unforgettable performances. Early bird tickets are selling out fast! #MalangJazz #MusicFestival',
        images: ['https://picsum.photos/seed/concert/800/600', 'https://picsum.photos/seed/crowd/800/600'],
        likes: 1240,
        comments: 85,
        shares: 430,
        timestamp: '2h ago',
        location: 'Lembah Dieng, Malang',
        tags: ['Music', 'Festival', 'Jazz'],
    },
    {
        id: '2',
        type: 'food',
        author: {
            name: 'Bakso President',
            handle: '@baksopresident',
            avatar: 'https://picsum.photos/seed/bakso/100/100',
        },
        content: 'Nothing beats a warm bowl of Bakso Malang on a rainy day. 🍜🌧️ Come visit our legendary spot right by the train tracks! Open daily 10AM - 9PM.',
        images: ['https://picsum.photos/seed/meatball/800/600'],
        likes: 892,
        comments: 120,
        shares: 56,
        timestamp: '4h ago',
        location: 'Jl. Batanghari, Malang',
        tags: ['Culinary', 'Legendary', 'StreetFood'],
    },
    {
        id: '3',
        type: 'place',
        author: {
            name: 'Kampung Warna Warni',
            handle: '@jodipan',
            avatar: 'https://picsum.photos/seed/jodipan/100/100',
        },
        content: 'Explore the vibrant colors of Jodipan! 🌈 A perfect spot for your Instagram feed. Don\'t forget to visit the glass bridge! 📸',
        images: ['https://picsum.photos/seed/colorful/800/600', 'https://picsum.photos/seed/bridge/800/600', 'https://picsum.photos/seed/village/800/600'],
        likes: 2100,
        comments: 340,
        shares: 890,
        timestamp: '6h ago',
        location: 'Jodipan, Malang',
        tags: ['Tourism', 'Photography', 'HiddenGem'],
    },
    {
        id: '4',
        type: 'event',
        author: {
            name: 'Malang Flower Carnival',
            handle: '@flowercarnival',
            avatar: 'https://picsum.photos/seed/flower/100/100',
        },
        content: 'Witness the spectacular display of floral costumes and creativity! 🌺🌸 Save the date: August 25th at Ijen Boulevard.',
        images: ['https://picsum.photos/seed/costume/800/600'],
        likes: 1500,
        comments: 200,
        shares: 600,
        timestamp: '1d ago',
        location: 'Ijen Boulevard',
        tags: ['Culture', 'Carnival', 'Art'],
    },
    {
        id: '5',
        type: 'food',
        author: {
            name: 'Toko Oen',
            handle: '@tokooen_malang',
            avatar: 'https://picsum.photos/seed/oen/100/100',
        },
        content: 'Step back in time and enjoy our classic ice cream. 🍦🕰️ Serving happiness since 1930. #Heritage #IceCream',
        images: ['https://picsum.photos/seed/icecream/800/600'],
        likes: 750,
        comments: 45,
        shares: 120,
        timestamp: '1d ago',
        location: 'Jl. Basuki Rahmat',
        tags: ['Heritage', 'Dessert', 'Vintage'],
    },
];
