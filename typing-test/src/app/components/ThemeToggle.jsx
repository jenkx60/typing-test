"use client"
import React, { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const ThemeToggle = () => {
    // The inital state of the theme is determined by the user's system preference
    const [ theme, setTheme ] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                return savedTheme;
            }
            const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return userPrefersDark ? 'dark' : 'light';
        }
        return 'light';
    })

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.getItem('theme', theme);
    }, [theme]);
  return (
    <div>
        <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            {theme === 'light' ? <MdDarkMode className='text-2xl transition'/> : <MdLightMode className='text-2xl transition'/>}
        </button>
    </div>
  )
}

export default ThemeToggle