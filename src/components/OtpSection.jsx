'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/auth'
import CodeInput from './CodeInput'
import FormLabel from '@/components/FormLabel'
import Icons from '@/components/Icons'
import ResendCode from '@/components/ResendCode'
import ErrorLabel from '@/components/ErrorLabel'
import { error } from 'next/dist/build/output/log'

export default function OtpSection({ codeExpired, phoneNumber }) {
    const router = useRouter()
    const { otp, loading } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const [part1, setPart1] = useState('')
    const [part2, setPart2] = useState('')
    const [part3, setPart3] = useState('')
    const [part4, setPart4] = useState('')
    const [part5, setPart5] = useState('')

    const inputRef1 = useRef(null)
    const inputRef2 = useRef(null)
    const inputRef3 = useRef(null)
    const inputRef4 = useRef(null)
    const inputRef5 = useRef(null)

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            console.log(errors)
            if (errors.status === 500) {
                return codeExpired()
            }
        }
    }, [errors])

    useEffect(() => {
        const timeout = setTimeout(() => {
            codeExpired()
        }, 120000)

        return () => clearTimeout(timeout)
    }, [])

    const submitForm = async event => {
        event.preventDefault()
        const fullCode = part1 + part2 + part3 + part4 + part5

        try {
            await otp({ code: fullCode, setErrors, setStatus })
        } catch (error) {
            setErrors(prevErrors => ({
                ...prevErrors,
                badRequest:
                    error.response?.status === 401
                        ? ['مجددا تلاش کنید']
                        : ['مجددا تلاش کنید'],
            }))
        }
    }

    const handleInputChange = (e, partSetter, nextRef, prevRef) => {
        const value = e.target.value
        partSetter(value)

        if (value.length === 1 && nextRef) {
            nextRef.current.focus()
        } else if (value.length === 0 && prevRef) {
            prevRef.current.focus()
        }
    }

    const handlePaste = (e, partSetter, nextRef) => {
        const pasted = e.clipboardData.getData('Text')
        if (pasted.length === 5) {
            const [a, b, c, d, e] = pasted
            setPart1(a)
            setPart2(b)
            setPart3(c)
            setPart4(d)
            setPart5(e)
            inputRef2.current.focus()
        } else {
            handleInputChange(e, partSetter, nextRef)
        }
    }

    return (
        <div dir="rtl" className="flex flex-col gap-4 w-full">
            <h2 className="font-semibold text-[18px]">کد تایید</h2>

            <FormLabel text={`کد تایید به شماره ${phoneNumber} ارسال شد`} />
            <form
                dir="ltr"
                className="flex w-full flex-col gap-4 items-end"
                onSubmit={submitForm}>
                <div className="flex w-full justify-between">
                    <CodeInput
                        value={part1}
                        onChange={e =>
                            handleInputChange(e, setPart1, inputRef2, null)
                        }
                        onPaste={e => handlePaste(e, setPart1, inputRef2)}
                        refProp={inputRef1}
                    />
                    <CodeInput
                        value={part2}
                        onChange={e =>
                            handleInputChange(e, setPart2, inputRef3, inputRef1)
                        }
                        onPaste={e => handlePaste(e, setPart2, inputRef3)}
                        refProp={inputRef2}
                    />
                    <CodeInput
                        value={part3}
                        onChange={e =>
                            handleInputChange(e, setPart3, inputRef4, inputRef2)
                        }
                        onPaste={e => handlePaste(e, setPart3, inputRef4)}
                        refProp={inputRef3}
                    />
                    <CodeInput
                        value={part4}
                        onChange={e =>
                            handleInputChange(e, setPart4, inputRef5, inputRef3)
                        }
                        onPaste={e => handlePaste(e, setPart4, inputRef5)}
                        refProp={inputRef4}
                    />
                    <CodeInput
                        value={part5}
                        onChange={e =>
                            handleInputChange(e, setPart5, null, inputRef4)
                        }
                        onPaste={e => handlePaste(e, setPart5, null)}
                        refProp={inputRef5}
                    />
                </div>
                {errors.status === 422 && <ErrorLabel text={errors?.code} />}
                {errors.status === 422 && <ErrorLabel text={errors?.error} />}
                <ResendCode phoneNumber={phoneNumber} />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 flex justify-center items-center text-textPrimary border border-textPrimary rounded-md h-16 bg-bgSecondary">
                    {!loading ? (
                        <p>ورود / ثبت‌نام</p>
                    ) : (
                        <div className="flex flex-row-reverse items-center gap-2">
                            <Icons
                                name="loadingSpinner"
                                className="animate-spin text-[30px]"
                            />
                            <p>لطفا منتظر بمانید</p>
                        </div>
                    )}
                </button>
            </form>
        </div>
    )
}
