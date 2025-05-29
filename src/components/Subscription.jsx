'use client'
import React, { useState } from 'react'
import SubscriptionCard from '@/components/SubscriptionCard'
import SubscriptionClassList from '@/components/SubscriptionClassList'

export default function Subscription() {
    const [selectedClass, setSelectedClass] = useState(null)

    return (
        <>
            <SubscriptionClassList
                setSelectedClass={setSelectedClass}
                selectedClass={selectedClass}
            />
            <div className="grid grid-cols-1 w-full desktop:grid-cols-3 place-items-center gap-8">
                {selectedClass ? (
                    <>
                        {selectedClass.subscriptions.map(sub => (
                            <SubscriptionCard key={sub.id} sub={sub} />
                        ))}
                    </>
                ) : null}
            </div>
        </>
    )
}
