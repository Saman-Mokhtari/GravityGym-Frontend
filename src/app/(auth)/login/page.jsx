'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'
import Loading from '@/app/(auth)/Loading' // Import the Loading component

const Login = () => {
    const router = useRouter()

    const { login, loading } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [phone, setPhone] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router?.reset?.length > 0 && Object.keys(errors).length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    }, [router, errors]) // Ensure this effect runs properly

    const submitForm = async event => {
        event.preventDefault()

        try {
            await login({
                phone_number: phone,
                remember: shouldRemember,
                setErrors,
                setStatus,
            })
        } catch (error) {
            setErrors(prevErrors => ({
                ...prevErrors,
                phone:
                    error.response?.status === 401
                        ? ['Invalid credentials']
                        : ['An unexpected error occurred'],
            }))
        }
    }

    // **Show the loading indicator while authentication is being checked**
    if (loading) {
        return <Loading />
    }

    return (
        <>
            <AuthSessionStatus className="mb-4" status={status} />
            <form onSubmit={submitForm}>
                {/* Phone Number */}
                <div>
                    <Label htmlFor="phone">Phone</Label>

                    <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        className="flex mt-1 w-full p-2"
                        onChange={event => setPhone(event.target.value)}
                        autoFocus
                    />

                    <InputError
                        messages={errors?.phone_number}
                        className="mt-2"
                    />
                </div>

                {/* Remember Me */}
                <div className="block mt-4">
                    <label
                        htmlFor="remember_me"
                        className="inline-flex items-center">
                        <input
                            id="remember_me"
                            type="checkbox"
                            name="remember"
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={event =>
                                setShouldRemember(event.target.checked)
                            }
                        />

                        <span className="ml-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-3">Login</Button>
                </div>
            </form>
        </>
    )
}

export default Login
