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

    const login = async ({
        setErrors,
        setStatus,
        validationSuccess,
        ...props
    }) => {
        setLoading(true)
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => {
                validationSuccess()
                setLoading(false)
                return mutate()
            })
            .catch(error => {
                if (error.response?.status !== 422) throw error
                setErrors(error.response.data.errors)
                setLoading(false)
            })
    }

    const otp = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true)
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
                const status = error.response?.status
                const errors = error.response?.data?.errors || {}

                if (status === 422) {
                    setErrors({
                        ...errors,
                        status: 422,
                    })
                } else {
                    setErrors({
                        ...errors,
                        status: 500,
                    })
                }

                setLoading(false)
            })
    }

    const resendCode = async ({ setCodeSent, ...props }) => {
        setLoading(true)
        await csrf()

        axios
            .post('/resendCode', props)
            .then(res => {
                setCodeSent(true)
                setLoading(false)
                return mutate()
            })
            .catch(error => {
                if (error.response?.status !== 422) throw error
            })
    }

    const loginExpired = async ({ ...props }) => {
        await csrf()

        axios
            .post('/loginExpired', props)
            .then(res => {
                return mutate()
            })
            .catch(error => {
                if (error.response?.status !== 422) throw error
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
        } else if (middleware === 'auth' && !user.name) {
            router.replace('/complete-signup')
        } else if (
            middleware === 'informationCheck' &&
            redirectIfAuthenticated &&
            user.name
        ) {
            router.replace(redirectIfAuthenticated)
        }
    }, [user, error, loading])

    useEffect(() => {
        if (user !== undefined) setLoading(false) // Ensure loading state is updated only when user is resolved
    }, [user])

    return {
        user,
        otp,
        loginExpired,
        resendCode,
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
