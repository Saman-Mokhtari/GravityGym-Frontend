'use client'
import useSWR from 'swr'
import axios from '@/lib/axios'

export const useClass = () => {
    const { data: gymClassesToAttend } = useSWR(
        '/api/gymClassesToAttend',
        () =>
            axios
                .get('/api/gymClassesToAttend')
                .then(res => res.data.data)
                .catch(() => null), // Return `null` on error instead of `undefined`
    )
    return {
        gymClassesToAttend,
    }
}
