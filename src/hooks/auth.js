'use client'
import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const {
        data: user,
        error,
        mutate,
    } = useSWR(
        '/api/[id]',
        () =>
            axios
                .get('/api/user')
                .then(res => res.data.data)
                .catch(() => null), // Return `null` on error instead of `undefined`
    )
    const swrLoading = user === undefined && error === undefined

    const { data: users } = useSWR(
        '/api/users',
        () =>
            axios
                .get('/api/users')
                .then(res => res.data.data)
                .catch(() => null), // Return `null` on error instead of `undefined`
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const login = async ({ setErrors, validationSuccess, ...props }) => {
        setLoading(true)
        await csrf()

        setErrors([])

        axios
            .post('/login', props)
            .then(() => {
                setLoading(false)
                validationSuccess()
                return mutate()
            })
            .catch(error => {
                setLoading(false)
                if (error.response?.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    const otp = async ({ setErrors, ...props }) => {
        setLoading(true)
        await csrf()

        setErrors([])

        axios
            .post('/otp', props)
            .then(res => {
                Cookies.set('Authorization', `Bearer ${res.data.token}`, {
                    expires: 30,
                })
                const user = res?.data?.user
                if (user?.role === 'superUser') {
                    window.location.href = 'http://192.168.254.9:3000/admin'
                } else if (user?.role === 'instructor') {
                    window.location.href =
                        'http://192.168.254.9:3000/instructor'
                } else if (!user?.name) {
                    window.location.href =
                        'http://192.168.254.9:3000/complete-signup'
                } else {
                    window.location.href =
                        'http://192.168.254.9:3000/dashboard/classes'
                }
                setLoading(false)
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

    const completeSignup = async ({ setErrors, ...props }) => {
        setLoading(true)
        await csrf()

        setErrors([])

        axios
            .post('/complete-signup', props)
            .then(() => {
                setLoading(false)
                window.location.href =
                    'http://192.168.254.9:3000/dashboard/classes'
                mutate()
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
            .then(() => {
                setCodeSent(true)
                setLoading(false)
                return mutate()
            })
            .catch(error => {
                if (error.response?.status !== 422) throw error
                setLoading(false)
            })
    }

    const loginExpired = async ({ ...props }) => {
        await csrf()

        axios
            .post('/loginExpired', props)
            .then(() => {
                return mutate()
            })
            .catch(error => {
                if (error.response?.status !== 422) throw error
            })
    }

    const logout = async () => {
        await csrf()
        if (!error) {
            await axios.post('/logout').then(() => {
                window.location.href = 'http://192.168.254.9:3000/'
                mutate()
            })
        }
        router.replace('/')
    }

    useEffect(() => {
        if (loading || swrLoading || !user) return

        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.replace(redirectIfAuthenticated)
        } else if (middleware === 'auth' && error) {
            logout()
        } else if (middleware === 'auth' && !user?.name) {
            router.replace('/complete-signup')
        }
    }, [user, error, loading])

    useEffect(() => {
        if (user !== undefined) setLoading(false) // Ensure loading state is updated only when [id] is resolved
    }, [user])

    return {
        user,
        users,
        otp,
        completeSignup,
        loginExpired,
        resendCode,
        login,
        logout,
        loading,
        swrLoading,
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
