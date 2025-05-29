'use client'
import useSWR, { mutate } from 'swr'
import axios from '@/lib/axios'
import { useState } from 'react'

export const useUser = () => {
    const [loading, setLoading] = useState(false)
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const { data: users } = useSWR('/api/users', () =>
        axios
            .get('/api/users')
            .then(res => res.data.data)
            .catch(() => null),
    )

    const { data: instructors } = useSWR('/api/instructors', () =>
        axios
            .get('/api/instructors')
            .then(res => res.data.data)
            .catch(() => null),
    )

    const user = async ({ setUserData, ...props }) => {
        axios.get(`/api/users/${props?.user_id}`).then(res => {
            const data = res.data.data
            return setUserData(data)
        })
    }

    const create = async ({ setSuccessful, setErrors, ...props }) => {
        setLoading(true)
        setErrors([])
        await csrf()
        axios
            .post('/api/user/create', props)
            .then(() => {
                setLoading(false)
                setSuccessful(true)
            })
            .catch(error => {
                const errors = error?.response?.data?.errors || {}
                setErrors(errors)
                setLoading(false)
            })
    }

    const update = async ({ setSuccessful, setErrors, ...props }) => {
        setLoading(true)
        setErrors([])
        await csrf()
        const fetchedProps = await props
        const url = fetchedProps?.user_id
            ? `/api/users/${fetchedProps?.user_id}/update`
            : `/api/user/update`
        axios
            .patch(url, props)
            .then(() => {
                setLoading(false)
                setSuccessful(true)
            })
            .catch(error => {
                const errors = error?.response?.data?.errors || {}
                setErrors(errors)
                setLoading(false)
            })
    }

    const deleteUser = async ({ setUserDeleted, setErrors, ...props }) => {
        setLoading(true)
        setErrors([])
        await csrf()

        axios
            .delete(`/api/users/${props?.userId}/delete`, props)
            .then(() => {
                mutate('/api/users')
                setUserDeleted(true)
                setLoading(false)
            })
            .catch(error => {
                const errors = error?.response?.data?.errors || {}
                setErrors(errors)
                setLoading(false)
            })
    }

    return {
        users,
        user,
        instructors,
        create,
        update,
        loading,
        deleteUser,
    }
}
