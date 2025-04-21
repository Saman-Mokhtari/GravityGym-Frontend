'use client'
import React, { useEffect, useState } from 'react'
import SubscriptionCard from '@/components/SubscriptionCard'
import SubscriptionClassList from '@/components/SubscriptionClassList'

export default function Subscription() {
    const [selectedClass, setSelectedClass] = useState(null)

    useEffect(() => {
        console.log(selectedClass)
    }, [selectedClass])

    return (
        <>
            <SubscriptionClassList
                setSelectedClass={setSelectedClass}
                selectedClass={selectedClass}
            />
            <div className="grid grid-cols-1 w-full desktop:grid-cols-3 place-items-center gap-8">
                {selectedClass ? (
                    <>
                        {selectedClass.subscriptions.map(item => (
                            <SubscriptionCard
                                key={item.id}
                                sessions={item.session_count}
                                period="ماهانه"
                                price={item.price}
                            />
                        ))}
                    </>
                ) : null}
            </div>
        </>
    )
}
