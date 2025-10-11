'use client'
import axios from '@/lib/axios'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

// fetcher تابع مشترک برای swr
const fetcher = url => axios.get(url).then(res => res.data)

export const usePayment = (filters = {}) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    // ✅ ساخت query string از روی filters
    const queryString = useMemo(() => {
        const params = new URLSearchParams()
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params.append(key, value)
            }
        })
        return params.toString() ? `?${params.toString()}` : ''
    }, [filters])

    // ✅ فچ دیتا با فیلترها
    const { data: payments, error, isLoading, mutate,  } = useSWR(
        `/api/payments${queryString}`,
        fetcher
    )

    // ✅ پرداخت جدید
    const pay = async ({ setErrors, ...props }) => {
        setLoading(true)
        await csrf()
        setErrors([])

        try {
            const res = await axios.post('/api/payments/pay', props)
            const paymentData = JSON.parse(res.data.payment_url)
            router.replace(paymentData.action)
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            } else {
                throw error
            }
        } finally {
            setLoading(false)
        }
    }

    // ✅ تأیید پرداخت
    const verify = async props => {
        setLoading(true)
        await csrf()

        try {
            const res = await axios.post('/api/payments/verify', props)
            router.replace(
                `/dashboard/classes/enroll/verify-payment/success?status=${res.data.status}&ref_id=${res.data.ref_id}&message=${res.data.message}`,
            )
        } finally {
            setLoading(false)
        }
    }

    return {
        payments,
        loading,
        isLoading,
        error,
        mutate,
        pay,
        verify,
    }
}
