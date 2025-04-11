'use client'
import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export const useClass = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()

    const [loading, setLoading] = useState(true)

    const {
        data: gymClassesToAttend,
        error,
        mutate,
    } = useSWR(
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
