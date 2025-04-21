'use client'
import axios from '@/lib/axios'
import useSWR from 'swr'

export const useSubscription = () => {
    // const [loading, setLoading] = useState(false)
    // const router = useRouter()
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const { data: active } = useSWR(
        '/api/subscriptions/active',
        () =>
            axios
                .get('/api/subscriptions/active')
                .then(res => res.data.data)
                .catch(() => null), // Return `null` on error instead of `undefined`
    )

    return { active }
}
