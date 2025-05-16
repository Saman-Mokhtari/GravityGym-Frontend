'use client'
import axios from '@/lib/axios'
import useSWR from 'swr'
import { useClassContext } from '@/context/ClassContext'
import { useState } from 'react'

export const useSubscription = () => {
    const [loading, setLoading] = useState(false)
    // const router = useRouter()
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const { data: active } = useSWR(
        '/api/subscriptions/active',
        () =>
            axios
                .get('/api/subscriptions/active')
                .then(res => res.data.data)
                .catch(() => null), // Return `null` on error instead of `undefined`
    )

    const subscription = async ({ setSelectedSub, setErrors, ...props }) => {
        setErrors([])
        const fetchedProps = await props
        axios
            .get(`/api/subscription/${fetchedProps?.sub_id}`)
            .then(res => {
                setSelectedSub(res.data.data)
            })
            .catch(error => setErrors(error))
    }

    const create = async ({ setErrors, sub_id, setSuccess, ...props }) => {
        setErrors([])
        setLoading(true)
        setSuccess(false)
        await csrf()
        axios
            .post('/api/subscription/create', props)
            .then(() => {
                setSuccess(true)
                setLoading(false)
                return mutate('/api/classes')
            })
            .catch(errors => {
                setSuccess(false)
                setErrors(errors?.response?.data?.errors)
                setLoading(false)
            })
    }

    const update = async ({ setSuccess, setErrors, ...props }) => {
        setLoading(true)
        setErrors([])
        await csrf()
        const fetchedProps = await props
        axios
            .patch(`/api/subscription/${fetchedProps?.sub_id}`, props)
            .then(res => {
                setLoading(false)
                setSuccess(true)
            })
            .catch(errors => {
                setLoading(false)
                setSuccess(false)
                setErrors(errors?.response?.data?.errors)
            })
    }

    return { active, loading, subscription, create, update }
}
