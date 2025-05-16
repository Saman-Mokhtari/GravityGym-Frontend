'use client'
import useSWR from 'swr'
import axios from '@/lib/axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, Toaster } from 'react-hot-toast'

export const useUser = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
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
        axios.get('/api/users/{user_id}', { params: props }).then(res => {
            const data = res.data.data
            return setUserData(data)
        })
    }

    const createUser = async ({ setSuccessful, setErrors, ...props }) => {
        setLoading(true)
        setErrors([])
        await csrf()
        axios
            .post('/api/user/create', props)
            .then(res => {
                setLoading(false)
                setSuccessful(true)
                // router.replace('/admin/users')
            })
            .catch(error => {
                const errors = error?.response?.data?.errors || {}
                setErrors(errors)
            })
    }
    return {
        users,
        user,
        instructors,
        createUser,
    }
}
