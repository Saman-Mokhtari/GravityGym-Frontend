'use client'

export const useTranslator = () => {
    const persianDays = {
        0: 'یک‌شنبه',
        1: 'دوشنبه',
        2: 'سه‌شنبه',
        3: 'چهارشنبه',
        4: 'پنج‌شنبه',
        5: 'جمعه',
        6: 'شنبه',
    }
    const subscriptionStatus = {
        1: 'فعال',
        2: 'غیرفعال',
    }
    const persianStatuses = {
        expired: 'منقضی شده',
        reserved: 'رزرو شده',
        cancelled: 'کنسل شده',
        active: 'فعال',
    }
    const persianRoles = {
        athlete: 'ورزشکار',
        instructor: 'مربی',
        admin: 'ادمین',
        superUser: 'سوپر ادمین',
    }
    return {
        persianDays,
        persianRoles,
        persianStatuses,
        subscriptionStatus,
    }
}
