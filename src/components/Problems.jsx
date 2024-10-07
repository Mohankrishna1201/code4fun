import React, { useState } from 'react';
import axios from 'axios';
import apiUrl from '../context/apiConfig';

const ProblemStatementFetcher = () => {
    const [url, setUrl] = useState('');
    const [problemStatement, setProblemStatement] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [question, setQuestion] = useState('');
    const [customValue, setCustomValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [showCustomInput, setShowCustomInput] = useState(false);

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setQuestion(selectedValue);

        if (selectedValue === 'custom') {
            setShowCustomInput(true);
        } else {
            setShowCustomInput(false);
            setCustomValue(''); // Clear the custom value when a predefined option is selected
        }
    };

    const handleCustomChange = (e) => {
        const newValue = e.target.value;
        setCustomValue(newValue);
        setQuestion(newValue); // Update the select value to reflect the custom input
    };

    const handleFetchProblemStatement = async () => {
        setLoading(true);
        try {
            const lastFourDigits = getLastFourDigits(url);
            const response = await axios.get(`${apiUrl}/get-problem-statement`, {
                params: {
                    contestId: lastFourDigits,
                    question: question
                }
            });
            setProblemStatement(response.data);
            setErrorMessage('');
        } catch (error) {
            setProblemStatement('');
            setErrorMessage('Error fetching problem statement');
            console.error('Error fetching problem statement:', error.message);
        } finally {
            setLoading(false);
            if (showCustomInput) {
                setShowCustomInput(false);
            }
        }
    };

    const getLastFourDigits = (url) => {
        url = url.replace(/\/$/, '');
        const segments = url.split('/');
        const lastSegment = segments[segments.length - 1];
        return lastSegment.slice(-4);
    };

    return (
        <div className="p-6 w-full mx-auto bg-[#333333ff] text-gray-200 rounded-xl shadow-md space-y-4">
            <p>Enter Code Forces Url</p>
            <input
                className="w-full p-4 bg-[#262626ff] text-gray-200 rounded-md border border-[#333333ff]"
                type="text"
                placeholder="Enter Codeforces contest URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <p>Select the Question</p>
            <select
                className="w-1/3 p-2 bg-[#262626ff] text-gray-200 border border-[#333333ff] rounded-md"
                value={showCustomInput ? customValue : question}
                onChange={handleSelectChange}
            >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="custom">Enter Custom Value</option>
            </select>

            {showCustomInput && (
                <input
                    type="text"
                    className="w-1/3 p-2 mt-2 ml-3 bg-[#262626ff] text-gray-200 border border-[#333333ff] rounded-md"
                    placeholder="Enter custom value (e.g., E5, E6)"
                    value={customValue}
                    onChange={handleCustomChange}
                />
            )}

            <button
                className="ml-1 p-2 bg-[#2FB9B3] text-white rounded-md hover:bg-[#36a7a1] flex items-center"
                onClick={handleFetchProblemStatement}
            >
                Fetch Problem Statement
                {loading && <div className="spinner ml-2"></div>}
            </button>

            {errorMessage && <p>{errorMessage}</p>}

            {problemStatement && (
                <div className="iframe-container">
                    <iframe srcDoc={problemStatement}></iframe>
                    <div className="progress-bar"></div>
                </div>
            )}
        </div>
    );
};

export default ProblemStatementFetcher;
