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
                setLoading(false)
                router.replace(paymentData.action)
            })
            .catch(error => {
                setLoading(false)
                if (error.response?.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    const verify = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true)
        await csrf()
        setErrors([])

        axios
            .post('/verify', props)
            .then(res => {
                setStatus(res.data)
                return setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                if (error.response?.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    return {
        pay,
        loading,
        verify,
    }
}
