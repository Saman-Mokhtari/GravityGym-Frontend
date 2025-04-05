'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'

const OtpVerificaion = () => {
    const router = useRouter()

    const { otp } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [code, setCode] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        try {
            await otp({
                code,
                setErrors,
                setStatus,
            })
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrors({ code: ['Invalid credentials'] })
            } else {
                setErrors({ code: ['An unexpected error occurred'] })
            }
        }
    }

    return (
        <>
            <AuthSessionStatus className="mb-4" status={status} />
            <form onSubmit={submitForm}>
                {/* Email Address */}
                <div>
                    <Label htmlFor="code">code</Label>

                    <Input
                        id="code"
                        type="code"
                        value={code}
                        className="flex mt-1 w-full p-2"
                        onChange={event => setCode(event.target.value)}
                        autoFocus
                    />

                    <InputError messages={errors.code} className="mt-2" />
                </div>

                {/* Remember Me */}

                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-3">Login</Button>
                </div>
            </form>
        </>
    )
}

export default OtpVerificaion
