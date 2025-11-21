'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface EventDetailClientProps {
    children: ReactNode;
}

export default function EventDetailClient({ children }: EventDetailClientProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
}
