"use client"
import React, { useEffect, useRef, useState } from 'react';

const wordsList = "nextjs typing test speed challenge accuracy practice keyboard".split(' ');

const TypingTest = () => {
    const [ words, setWords ] = useState([]);
    const [ currentInput, setCurrentInput ] = useState("");
    const [ wordIndex, setWordIndex ] = useState(0);
    const [ correctWords, setCorrectWords ] = useState(0);
    const [ incorrectWords, setIncorrectWords ] = useState(0);
    const [ timer, setTimer ] = useState(60);
    const [ isRunning, setIsRunning ] = useState(true);
    const inputRef = useRef(null);

    useEffect(() => {
        setWords(generateWords());
    }, []);

    useEffect(() => {
        if (isRunning && timer > 0) {
            const interval = setInterval(() => {
                if (timer > 0) {
                    setTimer((prev) => prev - 1);
                } else {
                    setIsRunning(false);
                    setCurrentInput("");
                    inputRef.current.blur(setInterval);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isRunning, timer]);

    useEffect(() => {
        if (isRunning) {
            inputRef.current.focus(setInterval);
        }
    }, [isRunning]);

    const generateWords = () => {
        return new Array(30).fill(null).map(() => wordsList[Math.floor(Math.random() * wordsList.length)]);
    }

    const handleInputChange = (e) => {
        if (!isRunning)
            setIsRunning(true);

        const value = e.target.value;
        setCurrentInput(value);

        if (value.endsWith(" ")) {
            if (value.trim() === words[wordIndex]) {
                setCorrectWords(correctWords + 1);
            } else {
                setIncorrectWords(incorrectWords + 1);
            }
            setWordIndex(wordIndex + 1);
            setCurrentInput("");
        }
    }

    const resetTest = () => {
        setWords(generateWords());
        setCurrentInput("");
        setWordIndex(0);
        setCorrectWords(0);
        setIncorrectWords(0);
        setTimer(60);
        setIsRunning(false);
    }

    
  return (
    <div className='max-w-2xl mx-auto p-6 text-center'>
        <h1 className='text-2xl font-bold'>Typing Speed Test</h1>
        <p className='mt-2 text-gray-500'>Type the words below as fast as you can!</p>

        <div className='mt-4 p-4 border rounded bg-gray-100 dark:bg-gray-800'>
            <p className='text-xl'>
                {words.map((word, index) => (
                    <span key={index} className={index === wordIndex ? "text-blue-500 font-bold" : ""}>
                        {word}{' '}
                    </span>
                ))}
            </p>
        </div>

        <input
            ref={inputRef}
            type='text'
            className='mt-4 w-full p-2 border rounded'
            value={currentInput}
            onChange={handleInputChange}
            autoFocus 
            disabled={!isRunning}
        />

        <div className='mt-4'>
            <p>Time Left: <span className='font-bold'>{timer}s</span></p>
            <p>WPM: <span className='font-bold'>{correctWords * 2}</span></p>
            <p>Accuracy: <span className='font-bold'>{((correctWords / (correctWords + incorrectWords || 1)) * 100).toFixed(2)}%</span></p>
        </div>

        <button onClick={resetTest} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'> 
            Restart Test
        </button>
    </div>
  )
}

export default TypingTest