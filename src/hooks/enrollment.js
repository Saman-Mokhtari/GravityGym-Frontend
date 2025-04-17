'use client'
import axios from '@/lib/axios'
import useSWR from 'swr'

export const useEnrollments = () => {
    // const [loading, setLoading] = useState(false)
    // const router = useRouter()
    // const csrf = () => axios.get('/sanctum/csrf-cookie')

    const { data: userEnrollments } = useSWR(
        '/api/userEnrollments',
        () =>
            axios
                .get('/api/userEnrollments')
                .then(res => res.data.data)
                .catch(() => null), // Return `null` on error instead of `undefined`
    )

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
    }
}
