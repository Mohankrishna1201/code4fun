import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RandomComponent = () => {
    const [host, setHost] = useState('');
    const [time, setTime] = useState('');
    const [token, setToken] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5001/trigger-notification', { host, time, token });
            setResponse(res.data);
        } catch (error) {
            console.error('Error triggering notification:', error);
        }
    };
    const [notifications, setNotifications] = useState(null);


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Contest Notification</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="host" className="block text-sm font-medium text-gray-700">Host</label>
                        <input
                            type="text"
                            id="host"
                            value={host}
                            onChange={(e) => setHost(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time (in seconds)</label>
                        <input
                            type="number"
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="token" className="block text-sm font-medium text-gray-700">Token</label>
                        <input
                            type="text"
                            id="token"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                        Trigger Notification
                    </button>
                </form>
                {response && (
                    <div className="mt-6">
                        <h2 className="text-lg font-bold">Response:</h2>
                        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(response, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RandomComponent;
