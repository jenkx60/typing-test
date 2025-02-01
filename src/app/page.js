import React from 'react'
import ThemeToggle from './components/ThemeToggle'
import TypingTest from './components/TypingTest'

const page = () => {
  return (
    <div className='p-6'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>Typing Test</h1>
        {ThemeToggle && <ThemeToggle />}
      </div>
      <TypingTest />
    </div>
  )
}

export default page