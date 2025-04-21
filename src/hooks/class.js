'use client'
import useSWR from 'swr'
import axios from '@/lib/axios'

export const useClass = () => {
    const { data: active } = useSWR(
        '/api/classes/active',
        () =>
            axios
                .get('/api/classes/active')
                .then(res => res.data.data)
                .catch(() => null), // Return `null` on error instead of `undefined`
    )

    const { data: classes } = useSWR(
        '/api/classes',
        () =>
            axios
                .get('/api/classes')
                .then(res => res.data.data)
                .catch(() => null), // Return `null` on error instead of `undefined`
    )
    return {
        active,
        classes,
    }
}
