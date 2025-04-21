'use client'
import axios from '@/lib/axios'
import useSWR from 'swr'

export const useEnrollments = () => {
    // const [loading, setLoading] = useState(false)
    // const router = useRouter()
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const { data: enrollments } = useSWR(
        '/api/enrollments',
        () =>
            axios
                .get('/api/enrollments')
                .then(res => res.data.data)
                .catch(() => null), // Return `null` on error instead of `undefined`
    )

    const enrollment = async ({ setErrors, setEnrollment, ...props }) => {
        setErrors([])

        axios
            .get('/api/enrollment', { params: props })
            .then(res => {
                const data = res.data.data[0]
                return setEnrollment(data)
            })
            .catch(error => {
                if (error.response?.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    const { data: active } = useSWR(
        '/api/enrollments/active',
        () =>
            axios
                .get('/api/enrollments/active')
                .then(res => res.data.data)
                .catch(() => null), // Return `null` on error instead of `undefined`
    )

    return {
        enrollments,
        active,
        enrollment,
    }
}
