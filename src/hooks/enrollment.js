'use client'
import axios from '@/lib/axios'
import useSWR from 'swr'

export const useEnrollments = () => {
    // const [loading, setLoading] = useState(false)
    // const router = useRouter()
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const { data: userEnrollments } = useSWR(
        '/api/userEnrollments',
        () =>
            axios
                .get('/api/userEnrollments')
                .then(res => res.data.data)
                .catch(() => null), // Return `null` on error instead of `undefined`
    )

    const userEnrollment = async ({ setErrors, setEnrollment, ...props }) => {
        setErrors([])

        axios
            .get('/api/userEnrollment', { params: props })
            .then(res => {
                const data = res.data.data[0]
                return setEnrollment(data)
            })
            .catch(error => {
                if (error.response?.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    const { data: userActiveEnrollments } = useSWR(
        '/api/userActiveEnrollments',
        () =>
            axios
                .get('/api/userActiveEnrollments')
                .then(res => res.data.data)
                .catch(() => null), // Return `null` on error instead of `undefined`
    )

    return {
        userEnrollments,
        userActiveEnrollments,
        userEnrollment,
    }
}
