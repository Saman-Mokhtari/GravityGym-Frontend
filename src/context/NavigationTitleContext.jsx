'use client'
import { createContext, useContext, useState } from 'react'

const NavigationTitleContext = createContext()

export const NavigationTitleProvider = ({ children }) => {
    const [title, setTitle] = useState('')
    return (
        <NavigationTitleContext.Provider value={{ title, setTitle }}>
            {children}
        </NavigationTitleContext.Provider>
    )
}

export const useNavigationTitle = () => useContext(NavigationTitleContext)
