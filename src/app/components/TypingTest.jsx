"use client"
import React, { useState, useEffect, useRef } from 'react';

const TypingTest = () => {
    const wordList = ["nextjs", "typing", "test", "speed", "challenge", "accuracy", "practice", "keyboard", "react", "javascript", "programming", "development", "frontend", "backend", "fullstack", "software", "engineer", "developer", "code", "debug", "algorithm", "data", "structure", "performance", "optimization", "design", "pattern", "component", "state", "props"];
    
    const getRandomWords = (num) => {
        const shuffled = wordList.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    };

    const [words, setWords] = useState(getRandomWords(50));
    const [wordIndex, setWordIndex] = useState(0);
    const [currentInput, setCurrentInput] = useState("");
    const [correctWords, setCorrectWords] = useState(0);
    const [incorrectWords, setIncorrectWords] = useState(0);
    const [timer, setTimer] = useState(60);
    const [isRunning, setIsRunning] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isRunning && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else if (timer === 0) {
            setIsRunning(false);
        }
    }, [isRunning, timer]);

    const handleInputChange = (e) => {
        setCurrentInput(e.target.value);
        if (e.target.value.trim() === words[wordIndex]) {
            setCorrectWords(correctWords + 1);
            setWordIndex(wordIndex + 1);
            setCurrentInput("");
        } else if (e.target.value.endsWith(" ")) {
            setIncorrectWords(incorrectWords + 1);
            setWordIndex(wordIndex + 1);
            setCurrentInput("");
        }
    };

    const startTest = () => {
        setWordIndex(0);
        setCorrectWords(0);
        setIncorrectWords(0);
        setTimer(60);
        setIsRunning(true);
        setCurrentInput("");
        inputRef.current.focus();
    };

    const resetTest = () => {
        setWordIndex(0);
        setCorrectWords(0);
        setIncorrectWords(0);
        setTimer(60);
        setIsRunning(false);
        setCurrentInput("");
    };

    const endTest = () => {
        setIsRunning(false);
    };

    const calculateWPM = () => {
        const minutes = (60 - timer) / 60;
        return Math.round(correctWords / minutes);
    };

    const calculateAccuracy = () => {
        return ((correctWords / (correctWords + incorrectWords || 1)) * 100).toFixed(2);
    };

    return (
        <div className='max-w-2xl mx-auto p-6 text-center'>
            <h1 className='text-2xl font-bold'>Typing Speed Test</h1>
            <p className='mt-2 text-gray-500'>Type the words below as fast as you can!</p>

            <div className='mt-4 p-4 border rounded bg-gray-100 dark:bg-gray-800'>
                <p className='text-xl'>
                    {words.map((word, index) => (
                        <span key={index} className={index === wordIndex ? "text-blue-500 font-bold" : ""}>
                            {index === wordIndex ? 
                                <span>
                                    {word.substring(0, currentInput.length)}
                                    <span className='text-red-500'>{word.substring(currentInput.length)}</span>
                                </span>
                                : word}{" "}
                        </span>
                    ))}
                </p>
            </div>

            <input
                ref={inputRef}
                type='text'
                className='mt-4 w-full p-2 border rounded text-black'
                value={currentInput}
                onChange={handleInputChange}
                autoFocus 
                disabled={!isRunning}
            />

            <div className='mt-4'>
                <p>Time Left: <span className='font-bold'>{timer}s</span></p>
                <p>WPM: <span className='font-bold'>{calculateWPM()}</span></p>
                <p>Accuracy: <span className='font-bold'>{calculateAccuracy()}%</span></p>
            </div>

            <div className='flex justify-center gap-4'>
                <button onClick={startTest} className='mt-4 p-2 bg-blue-500 text-white rounded'>
                    Start Test
                </button>
                <button onClick={resetTest} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'> 
                    Restart Test
                </button>
                <button onClick={endTest} className='mt-4 px-4 py-2 bg-red-500 text-white rounded'> 
                    End Test
                </button>
            </div>
        </div>
    );
};

export default TypingTest;