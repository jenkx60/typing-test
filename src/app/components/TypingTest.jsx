"use client"
import React, { useState, useEffect, useRef } from 'react';
import Audio from 'react-loading-icons/dist/esm/components/audio';
import Bars from 'react-loading-icons/dist/esm/components/bars';
import Oval from 'react-loading-icons/dist/esm/components/oval';
import SpinningCircles from 'react-loading-icons/dist/esm/components/spinning-circles';

const TypingTest = () => {
    // const wordList = ["nextjs", "typing", "test", "speed", "challenge", "accuracy", "practice", "keyboard", "react", "javascript", "programming", "development", "frontend", "backend", "fullstack", "software", "engineer", "developer", "code", "debug", "algorithm", "data", "structure", "performance", "optimization", "design", "pattern", "component", "state", "props", ".", ","];
    
    // const getRandomWords = (num) => {
    //     const shuffled = wordList.sort(() => 0.5 - Math.random());
    //     return shuffled.slice(0, num);
    // };

    const [words, setWords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);
    const [currentInput, setCurrentInput] = useState("");
    const [correctWords, setCorrectWords] = useState(0);
    const [incorrectWords, setIncorrectWords] = useState(0);
    const [timer, setTimer] = useState(120);
    const [isRunning, setIsRunning] = useState(false);
    const inputRef = useRef(null);

    const fetchText = async () => {
        setIsLoading(true);
        try { 
            const response = await fetch("https://poetrydb.org/title/Ozymandias/lines.json");
            const data = await response.json();
            setIsLoading(true);
            console.log('first data', data);

            if (data.error) {
                setWords(["Error fetching data"]);
            } else {
                const lines = data[0].lines.join(" ");
                setWords(lines.split(" ").slice(0, 35));
            }
            
        } catch (error) {
            setWords(["Error fetching data"]);
            } finally {
                setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchText();
    }, []);



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
        setTimer(120);
        setIsRunning(true);
        setCurrentInput("");
        fetchText();
        inputRef.current.focus();
    };

    const resetTest = () => {
        setWordIndex(0);
        setCorrectWords(0);
        setIncorrectWords(0);
        setTimer(120);
        setIsRunning(false);
        setCurrentInput("");
    };

    const endTest = () => {
        setIsRunning(false);
    };

    const calculateWPM = () => {
        const minutes = (120 - timer) / 120;
        return Math.round(correctWords / minutes);
    };

    const calculateAccuracy = () => {
        return ((correctWords / (correctWords + incorrectWords || 1)) * 100).toFixed(2);
    };

    const calculateProgress = () => {
        return ((120 - timer) / 120) * 100;
    };

    return (
        <div className='max-w-2xl mx-auto p-6 text-center mt-9 bg-gradient-to-bl from-blue-500 to-purple-500 rounded-lg'>
            <h1 className='text-2xl font-bold'>Typing Speed Test</h1>
            <p className='mt-2 text-gray-800'>Type the words below as fast as you can!</p>

            {isLoading ? (
                <div className='mt-4 p-4 border rounded bg-gray-100 dark:bg-gray-800'>
                    <p className='text-sm flex justify-center text-center'><SpinningCircles /></p>
                </div>
            ) : (
                <div className='mt-4 p-4 border rounded bg-gray-100 text-black dark:bg-gray-800 dark:text-white'>
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
            )}

            <input
                ref={inputRef}
                type='text'
                className='mt-4 w-full p-2 rounded-xl text-black'
                value={currentInput}
                onChange={handleInputChange}
                placeholder='Start typing...'
                autoFocus 
                disabled={!isRunning}
            />

            <div className='flex justify-center gap-4 my-5'>
                <button onClick={startTest} className='mt-4 px-4 py-2 bg-green-700 hover:bg-green-500 text-white rounded'>
                    Start Test
                </button>
                <button onClick={resetTest} className='mt-4 px-4 py-2 bg-blue-700 hover:bg-blue-500 text-white rounded'> 
                    Restart Test
                </button>
                <button onClick={endTest} className='mt-4 px-4 py-2 bg-red-700 hover:bg-red-500 text-white rounded'> 
                    End Test
                </button>
            </div>

            <div className='my-4 h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full'>
                <div
                    className='h-full bg-green-500 rounded-full'
                    style={{ width: `${calculateProgress()}%` }}
                ></div>
            </div>

            <div className='my-10 flex flex-col gap-4'>
                <p>Time Left: <span className='font-bold'>{timer}s</span></p>
                <p>Words Per Minutes (WPM): <span className='font-bold'>{calculateWPM()}</span></p>
                <p>Accuracy: <span className='font-bold'>{calculateAccuracy()}%</span></p>
            </div>
        </div>
    );
};

export default TypingTest;
