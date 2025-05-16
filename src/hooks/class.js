'use client'
import useSWR from 'swr'
import axios from '@/lib/axios'
import { useState } from 'react'
import { mutate } from 'swr'

export const useClass = () => {
    const [loading, setLoading] = useState(false)
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const { data: active } = useSWR('/api/classes/active', () =>
        axios
            .get('/api/classes/active')
            .then(res => res.data.data)
            .catch(() => null),
    )

    const { data: classes } = useSWR('/api/classes', () =>
        axios
            .get('/api/classes')
            .then(res => res.data.data)
            .catch(() => null),
    )

    const gymClass = async ({ setSelectedClass, setErrors, ...props }) => {
        setLoading(true)
        const fetchedProps = await props
        axios
            .get(`/api/class/${fetchedProps?.sub_id}`)
            .then(res => {
                setLoading(false)
                setSelectedClass(res.data.data)
            })
            .catch(error => setErrors(error))
    }

    const create = async ({ setisSucceeded, setErrors, ...props }) => {
        setLoading(true)
        await csrf()
        axios
            .post('/api/class/create', props)
            .then(res => {
                setLoading(false)
                setisSucceeded(true)
                mutate('/api/classes')
            })
            .catch(errors => {
                setLoading(false)
                setErrors(errors.response.data.errors)
            })
    }

    return {
        active,
        classes,
        gymClass,
        loading,
        create,
    }
}
