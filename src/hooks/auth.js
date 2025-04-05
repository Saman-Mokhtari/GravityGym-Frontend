'use client'
import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()

    const [loading, setLoading] = useState(true)

    const {
        data: user,
        error,
        mutate,
    } = useSWR(
        '/api/user',
        () =>
            axios
                .get('/api/user')
                .then(res => res.data)
                .catch(() => null), // Return `null` on error instead of `undefined`
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const login = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/login', props)
            .then((res) => {
                window.location.pathname = '/otp_verification'
                return mutate()
            })
            .catch(error => {
                if (error.response?.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    const otp = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/otp', props)
            .then(res => {
                Cookies.set('Authorization', `Bearer ${res.data.token}`, {
                    expires: 7,
                })
                window.location.pathname = '/dashboard'
                return mutate()
            })
            .catch(error => {
                if (error.response?.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }
        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (loading) return // Prevent running logic before authentication state is determined

        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.replace(redirectIfAuthenticated)
        } else if (middleware === 'auth' && !user) {
            router.replace('/login')
        } else if (middleware === 'auth' && error) {
            logout()
        }
    }, [user, error, loading])

    useEffect(() => {
        if (user !== undefined) setLoading(false) // Ensure loading state is updated only when user is resolved
    }, [user])

    return {
        user,
        otp,
        login,
        logout,
        loading,
    }
}

// Add a request interceptor to include the token in the headers of subsequent requests
axios.interceptors.request.use(
    config => {
        const token = Cookies.get('Authorization')
        if (token) {
            config.headers['Authorization'] = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    },
)
