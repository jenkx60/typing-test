"use client"
import React, { useEffect, useState } from 'react'

const ThemeToggle = () => {
    const [ theme, setTheme ] = useState('light');

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);
  return (
    <div>
        <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className='p-2 rounded border bg-gray-200 dark:bg-gray-700'
        >
            {theme === 'light' ? 'Dark Mode' : "Light Mode"}
        </button>
    </div>
  )
}

export default ThemeToggle