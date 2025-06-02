'use client'
import axios from '@/lib/axios'
import useSWR, { mutate } from 'swr'
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

    const subscription = sub_id => {
        return useSWR(sub_id ? `/api/subscription/${sub_id}` : null, () =>
            axios.get(`/api/subscription/${sub_id}`).then(res => res.data.data),
        )
    }

    const InstructorSubscription = () => {
        return useSWR('/api/subscriptions/instructor', () =>
            axios
                .get('/api/subscriptions/instructor')
                .then(res => res?.data?.data),
        )
    }

    const create = async ({ setErrors, setSuccess, ...props }) => {
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
            .then(() => {
                setLoading(false)
                setSuccess(true)
            })
            .catch(errors => {
                setLoading(false)
                setSuccess(false)
                setErrors(errors?.response?.data?.errors)
            })
    }

    const deleteSub = async ({ setSubDeleted, setErrors, ...props }) => {
        setLoading(true)
        setErrors([])
        await csrf()

        axios
            .delete(`/api/subscription/${props?.sub_id}/delete`, props)
            .then(() => {
                mutate(`/api/subscription/${props?.sub_id}`)
                setSubDeleted(true)
                setLoading(false)
            })
            .catch(error => {
                const errors = error?.response?.data?.errors || {}
                setErrors(errors)
                setLoading(false)
            })
    }

    return {
        active,
        loading,
        subscription,
        create,
        update,
        deleteSub,
        InstructorSubscription,
    }
}
