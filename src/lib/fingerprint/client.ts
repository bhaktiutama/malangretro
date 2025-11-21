'use client'

import { useEffect, useState } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

let fpPromise: Promise<any> | null = null

export async function getBrowserFingerprint(): Promise<string> {
    // Check session storage first for performance
    if (typeof window !== 'undefined') {
        const cached = sessionStorage.getItem('fp_visitor_id')
        if (cached) return cached
    }

    if (!fpPromise) {
        fpPromise = FingerprintJS.load()
    }

    const fp = await fpPromise
    const result = await fp.get()

    // Cache for session
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('fp_visitor_id', result.visitorId)
    }

    return result.visitorId
}

// React Hook for components
export function useBrowserFingerprint() {
    const [fingerprint, setFingerprint] = useState<string | null>(null)

    useEffect(() => {
        getBrowserFingerprint().then(setFingerprint)
    }, [])

    return fingerprint
}
