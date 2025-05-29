'use client'
import useSWR, { mutate } from 'swr'
import axios from '@/lib/axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

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

    const gymClass = sub_id => {
        return useSWR(sub_id ? `/api/class/${sub_id}` : null, () =>
            axios.get(`/api/class/${sub_id}`).then(res => res.data.data),
        )
    }

    const create = async ({ setisSucceeded, setErrors, ...props }) => {
        setLoading(true)
        await csrf()
        axios
            .post('/api/class/create', props)
            .then(() => {
                setLoading(false)
                setisSucceeded(true)
                mutate('/api/classes')
            })
            .catch(errors => {
                setLoading(false)
                setErrors(errors.response.data.errors)
            })
    }
    const deleteClass = async ({ setErrors, ...props }) => {
        setLoading(true)
        setErrors([])
        await csrf()

        axios
            .delete(`/api/class/${props?.cls?.id}/delete`, props)
            .then(() => {
                mutate('/api/classes')
                setLoading(false)
                toast.success('کلاس با موفقیت حذف شد!')
            })
            .catch(error => {
                const errors = error?.response?.data?.errors || {}
                setErrors(errors)
                setLoading(false)
            })
    }
    return {
        active,
        classes,
        gymClass,
        loading,
        create,
        deleteClass,
    }
}
