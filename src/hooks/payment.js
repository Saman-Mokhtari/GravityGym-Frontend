'use client'
import axios from '@/lib/axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const usePayment = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const pay = async ({ setErrors, ...props }) => {
        setLoading(true)
        await csrf()
        setErrors([])

        axios
            .post('/pay', props)
            .then(res => {
                const paymentData = JSON.parse(res.data.payment_url)
                router.replace(paymentData.action)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                if (error.response?.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    const verify = async ({ ...props }) => {
        setLoading(true)
        await csrf()
        axios
            .post('/verify', props)
            .then(res => {
                router.replace(
                    `/dashboard/classes/enroll/verify-payment/success?status=${res.data.status}&ref_id=${res.data.ref_id}&message=${res.data.message}`,
                )
            })
            .catch(error => {
                setLoading(false)
                if (error.response?.status !== 422) throw error
            })
    }

    return {
        pay,
        loading,
        verify,
    }
}
