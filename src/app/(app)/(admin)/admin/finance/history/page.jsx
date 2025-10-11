'use client'
import FormLabel from '@/components/FormLabel'
import Icons from '@/components/Icons'
import PageTitle from '@/components/PageTitle'
import TransactionCard from '@/components/TransactionCard'
import { useNavigationTitle } from '@/context/NavigationTitleContext'
import { usePayment } from '@/hooks/payment'
import { useEffect, useMemo, useState } from 'react'

export default function Main() {
  const { setTitle } = useNavigationTitle()

  // فیلترهای API: حالت کورسور
  const [filters, setFilters] = useState({
    paging: 'cursor',
    sort: 'desc',
    per_page: 10,
    cursor: null, // null یعنی ابتدای لیست
  })

  const [searchText, setSearchText] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  // گرفتن داده‌ها با فیلترها
  const { payments } = usePayment(filters)

  // فقط با payments?.data کار می‌کنیم
  const data = Array.isArray(payments?.data) ? payments.data : []

  // لینک‌های کورسور (Laravel cursorPaginate)
  const links = payments?.links ?? {
    next: payments?.next_page_url ?? null,
    prev: payments?.prev_page_url ?? null,
  }

  // عنوان صفحه
  useEffect(() => {
    setTitle('تاریخچه تراکنش‌ها')
  }, [setTitle])

  // دیباونس جستجو
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchText.trim()), 400)
    return () => clearTimeout(t)
  }, [searchText])

  // هر بار جستجو عوض شد، برگرد اول لیست
  useEffect(() => {
    setFilters(f => ({ ...f, cursor: null }))
  }, [debouncedSearch])

  // کمک‌کننده: استخراج پارامتر cursor از URL
  const getParamFromUrl = (url, param) => {
    if (!url) return null
    try {
      const u = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost')
      return u.searchParams.get(param)
    } catch {
      const re = new RegExp(`[?&]${param}=([^&#]+)`)
      const m = url.match(re)
      return m ? decodeURIComponent(m[1]) : null
    }
  }

  // رفتن به قبلی/بعدی با کورسور
  const goPrev = () => {
    if (!links?.prev) return
    const cursor = getParamFromUrl(links.prev, 'cursor')
    if (cursor) setFilters(f => ({ ...f, cursor }))
  }

  const goNext = () => {
    if (!links?.next) return
    const cursor = getParamFromUrl(links.next, 'cursor')
    if (cursor) setFilters(f => ({ ...f, cursor }))
  }

  // فیلتر جستجو روی نام کاربر
  const filtered = useMemo(() => {
    if (!debouncedSearch) return data
    const q = debouncedSearch.toLowerCase()
    return data.filter(p => (p?.user?.name || '').toLowerCase().includes(q))
  }, [data, debouncedSearch])

  // گروهبندی بر اساس تاریخ جلالی روز (فرض: p.created_at.date مثل "1404/04/31")
  const groupedByDate = useMemo(() => {
    return filtered.reduce((acc, p) => {
      const day = p?.created_at?.date
      if (!day) return acc
      ;(acc[day] = acc[day] || []).push(p)
      return acc
    }, /** @type {Record<string, any[]>} */ ({}))
  }, [filtered])

  // مرتب‌سازی روزها؛ چون فرمت YYYY/MM/DD است، مقایسه رشته‌ای کافیه
  const sortedDays = useMemo(() => {
    const days = Object.keys(groupedByDate)
    return days.sort((a, b) =>
      filters.sort === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
    )
  }, [groupedByDate, filters.sort])

  // مرتب‌سازی آیتم‌های هر روز بر اساس ساعت (فرض: p.created_at.clock مثل "12:34")
  const getDayItems = (day) => {
    const items = groupedByDate[day] ?? []
    return [...items].sort((a, b) =>
      filters.sort === 'asc'
        ? (a?.created_at?.clock || '').localeCompare(b?.created_at?.clock || '')
        : (b?.created_at?.clock || '').localeCompare(a?.created_at?.clock || '')
    )
  }

  // نمایش خوش‌فرم تاریخ (داخل فرانت؛ اختیاری)
  const prettyJalali = (ymd) => {
    if (!ymd) return ''
    const [y, m, d] = ymd.split('/').map(Number)
    const months = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند']
    return `${d} ${months[(m || 1) - 1]} ${y}`
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <PageTitle firstLine="تاریخچه" secondLine="تراکنش‌ها" />

      {/* جستجو */}
      <form onSubmit={(e) => {e.preventDefault()}} className="flex flex-col w-full gap-4">
        <div className="relative flex w-full">
          <input
            className="rounded-md w-full border border-border placeholder-textSecondary py-5"
            type="text"
            placeholder="به دنبال تراکنش چه شخصی هستید؟"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <Icons
            name="search"
            className="text-textSecondary text-[20px] absolute left-4 top-1/2 -translate-y-1/2"
          />
        </div>
      </form>

      {/* گروه‌بندی‌شده بر اساس تاریخ */}
      <div className="w-full flex flex-col gap-7 mt-3">
        {sortedDays.map(day => (
          <div key={day} className="w-full flex flex-col gap-6">
            <FormLabel text={prettyJalali(day)} />
            {getDayItems(day).map(p => (
              <TransactionCard
                key={p.id}
                name={p?.user?.name ?? '—'}
                sub={p?.subscription}
                datetime={{ clock: p?.created_at?.clock ?? '' }}
                price={p?.amount ?? 0}
              />
            ))}
          </div>
        ))}

        {/* حالت خالی */}
        {sortedDays.length === 0 && (
          <div className="text-center text-textSecondary">
            {debouncedSearch ? 'تراکنشی مطابق جستجوی شما یافت نشد.' : 'تراکنشی یافت نشد.'}
          </div>
        )}

        {/* کنترل‌های کورسور */}
        <div className="w-full flex items-center justify-between mt-4 flex-row-reverse">
          <button
            type="button"
            onClick={goPrev}
            disabled={!links?.prev}
            className={`px-4 py-2 flex flex-row-reverse items-center gap-2 rounded-xl border transition ${
              links?.prev ? 'hover:bg-gray-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <Icons name="arrowLeft" />
            <p>قبلی</p>
          </button>


          <button
            type="button"
            onClick={goNext}
            disabled={!links?.next}
            className={`px-4 py-2 flex flex-row-reverse items-center gap-2 rounded-xl border transition ${
              links?.next ? 'hover:bg-gray-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <p>بعدی</p>
            <Icons name="arrowRight" />
          </button>
        </div>
      </div>
    </div>
  )
}
