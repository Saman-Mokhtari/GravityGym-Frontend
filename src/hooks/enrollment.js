'use client'
import axios from '@/lib/axios'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const useEnrollments = () => {
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const { data: enrollments } = useSWR(
        '/api/enrollments',
        () =>
            axios
                .get('/api/enrollments')
                .then(res => res.data.data)
                .catch(() => null), // Return `null` on error instead of `undefined`
    )

    const enrollment = async ({ setErrors, setEnrollment, ...props }) => {
        setErrors([])
        const { enrollment_id } = props

        axios
            .get(`/api/enrollments/${enrollment_id}`, { params: props })
            .then(res => {
                const data = res.data.data
                return setEnrollment(data)
            })
            .catch(error => {
                if (error.response?.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    const update = async ({
        setIsSucceeded,
        setLoading,
        setErrors,
        ...props
    }) => {
        const fetchedProps = await props
        setErrors([])
        setLoading(true)
        await csrf()
        axios
            .post(
                `/api/enrollments/${fetchedProps?.enrollment_id}/update`,
                props,
            )
            .then(() => {
                setLoading(false)
                return setIsSucceeded(true)
            })
            .catch(e => setErrors(e))
    }

    const { data: active } = useSWR(
        '/api/enrollments/active',
        () =>
            axios
                .get('/api/enrollments/active')
                .then(res => res.data.data)
                .catch(() => null), // Return `null` on error instead of `undefined`
    )

    const cancel = async ({ setErrors, ...props }) => {
        setErrors([])
        await csrf()
        const { enroll_id } = props
        axios
            .post(`/api/enrollment/${enroll_id}/cancel`)
            .then()
            .catch(error => setErrors(error))
    }

    const blkCancel = async ({ userDeletionToast, setErrors, ...props }) => {
        setLoading(true)
        setErrors([])
        await csrf()
        axios
            .post(`/api/enrollments/bulk-cancel`, props)
            .then(res => {
                userDeletionToast()
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                setErrors(error)
            })
    }

    const create = async ({ userAddedToast, setErrors, ...props }) => {
        setErrors([])
        setLoading(true)
        await csrf()

        axios
            .post('/api/enrollment/create', props)
            .then(res => {
                setLoading(false)
                userAddedToast()
            })
            .catch(error => {
                setLoading(false)
                setErrors(error)
            })
    }

    return {
        enrollments,
        active,
        enrollment,
        update,
        cancel,
        blkCancel,
        create,
    }
}
