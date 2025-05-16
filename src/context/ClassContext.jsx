'use client'

import { createContext, useContext, useState } from 'react'

const ClassContext = createContext(null)

export function ClassProvider({ children }) {
    const [selectedClass, setSelectedClass] = useState(null)
    const [selectedSub, setSelectedSub] = useState(null)
    return (
        <ClassContext.Provider
            value={{
                selectedClass,
                setSelectedClass,
                selectedSub,
                setSelectedSub,
            }}>
            {children}
        </ClassContext.Provider>
    )
}

export function useClassContext() {
    return useContext(ClassContext)
}
