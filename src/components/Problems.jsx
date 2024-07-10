import React, { useState } from 'react';
import axios from 'axios';
import apiUrl from '../context/apiConfig';

const ProblemStatementFetcher = () => {
    const [url, setUrl] = useState('');
    const [problemStatement, setProblemStatement] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [question, setQuestion] = useState('A'); // Default to 'A' or any initial value
    const [loading, setLoading] = useState(false); // Loading state

    const handleSelectChange = (e) => {
        setQuestion(e.target.value); // Update state with the selected option value
    };

    const handleFetchProblemStatement = async () => {
        setLoading(true); // Set loading to true
        try {
            // Extract last 4 digits from the URL
            const lastFourDigits = getLastFourDigits(url);

            // Make GET request to your server endpoint using Axios
            const response = await axios.get(`${apiUrl}/get-problem-statement`, {
                params: {
                    contestId: lastFourDigits,
                    question: question
                }
            });

            // Assuming your server returns HTML content in response
            setProblemStatement(response.data); // Assuming response.data contains the HTML content
            setErrorMessage('');
        } catch (error) {
            setProblemStatement('');
            setErrorMessage('Error fetching problem statement');
            console.error('Error fetching problem statement:', error.message);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const getLastFourDigits = (url) => {
        // Remove any trailing slashes from the URL
        url = url.replace(/\/$/, '');

        // Get the last segment of the URL after the last slash
        const segments = url.split('/');
        const lastSegment = segments[segments.length - 1];

        // Extract the last 4 digits from the last segment
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
                value={question}
                onChange={handleSelectChange} // Handle change on select
            >
                <option value='A'>A</option>
                <option value='B'>B</option>
                <option value='C'>C</option>
                <option value='D'>D</option>
                <option value='E'>E</option>
            </select>
            <button className="ml-1 p-2 bg-[#2FB9B3] text-white rounded-md hover:bg-[#36a7a1] flex items-center" onClick={handleFetchProblemStatement}>
                Fetch Problem Statement
                {loading && <div className="spinner ml-2"></div>}
            </button>

            {errorMessage && <p>{errorMessage}</p>}

            {problemStatement && (
                <div className="iframe-container">
                    <iframe srcDoc={problemStatement}></iframe>
                    {/* Use srcDoc instead of src for HTML content */}
                    <div className="progress-bar"></div>
                </div>
            )}
        </div>
    );
};

export default ProblemStatementFetcher;
