import '../App.css';
import { useState } from 'react';
import axios from 'axios';
import apiUrl from '../context/apiConfig';
import Loader from './Loader';
import MonacoEditor from '@monaco-editor/react';
import { FaPlay } from 'react-icons/fa';
function OnlineCompiler() {
    const [code, setCode] = useState('// Write your code here');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [language, setLanguage] = useState('cpp');
    const [loading, setLoading] = useState(false);
    const [advancedIDE, setAdvancedIDE] = useState(false); // State to toggle between IDE modes

    const handleSubmit = async () => {
        setLoading(true);
        const payload = {
            language,
            code,
            input,
        };
        try {
            const response = await axios.post(`${apiUrl}/run`, payload);
            setOutput(response.data.output);
            setError(''); // Clear previous error if any
        } catch (err) {
            const errorResponse = err.response?.data?.error || { error: 'Unknown error', stderr: '' };
            setError(`Error: ${errorResponse.error}\nStderr: ${errorResponse.stderr}`);
            setOutput(''); // Clear previous output if any
        } finally {
            setLoading(false);
        }
    };

    const handleEditorChange = (value) => {
        setCode(value);
    };

    const toggleIDE = () => {
        setAdvancedIDE(!advancedIDE);
    };

    return (
        <div className="p-6 w-full mx-auto bg-[#333333ff] text-gray-200 rounded-xl shadow-md space-y-4">
            <h1 className="text-2xl font-bold text-white">Mohan Online Code Compiler</h1>

            <div className="flex space-x-4 items-center">
                <select
                    className="w-1/3 p-2 bg-[#262626ff] text-gray-200 border border-[#333333ff] rounded-md"
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value='cpp'>C++</option>
                    <option value='c'>C</option>
                    <option value='java'>Java</option>
                    <option value='js'>JavaScript</option>
                    <option value='py'>Python</option>
                </select>
                <button
                    onClick={handleSubmit}
                    className="p-2 bg-[#2FB9B3] text-white rounded-md font-medium hover:bg-[#36a7a1] flex items-center"
                >
                    <FaPlay className="ml-1 mr-1" size={15} color="white" />
                    Run
                    {loading && <div className="spinner ml-2"></div>}
                </button>

                <button
                    onClick={toggleIDE}
                    className="p-2 text-xs font-medium bg-[#2FB9B3] text-white rounded-md hover:bg-[#36a7a1]"
                >
                    {advancedIDE ? 'Switch to Basic Editor' : 'Switch to Advanced IDE'}
                </button>
            </div>

            {/* Conditional rendering of Monaco Editor or basic textarea */}
            {advancedIDE ? (
                <div className="editor-container">
                    <MonacoEditor
                        height="500px"
                        theme="vs-dark"
                        language={language === 'js' ? 'javascript' : language === 'py' ? 'python' : language}
                        value={code}
                        onChange={handleEditorChange}
                        options={{
                            automaticLayout: true,
                            minimap: { enabled: false },
                            suggestOnTriggerCharacters: true,
                            wordBasedSuggestions: true,
                        }}
                    />
                </div>
            ) : (
                <textarea
                    rows="20"
                    className="w-full p-4 bg-[#262626ff] text-gray-200 rounded-md border border-[#333333ff]"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter your code here"
                    spellCheck="false"
                    autoCorrect="off"
                    autoCapitalize="off"
                    autoComplete="off"
                ></textarea>
            )}

            <textarea
                rows="5"
                className="w-full p-4 bg-[#262626ff] text-gray-200 rounded-md border border-[#333333ff]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your input here"
                spellCheck="false"
                autoCorrect="off"
                autoCapitalize="off"
                autoComplete="off"
            ></textarea>

            {output && (
                <div className="mt-4 p-4 bg-[#262626ff] text-gray-200 border border-[#333333ff] rounded-md">
                    <h3 className="text-lg font-semibold">Output:</h3>
                    <pre className="whitespace-pre-wrap">{output}</pre>
                </div>
            )}

            {error && (
                <div className="mt-4 p-4 bg-red-600 text-white border border-red-800 rounded-md">
                    <h3 className="text-lg font-semibold">Error:</h3>
                    <pre className="whitespace-pre-wrap">{error}</pre>
                </div>
            )}
        </div>
    );
}

export default OnlineCompiler;
