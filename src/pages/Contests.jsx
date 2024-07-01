import React, { useState, useEffect } from 'react';
import apiUrl from '../context/apiConfig';
import format from 'date-fns/format';
export default function Contests() {
    const [host, setHost] = useState('');
    const [time, setTime] = useState('');
    const [display, setDisplay] = useState('');
    const [contests, setContests] = useState([]);
    const handleHostChange = (e) => {
        setHost(e.target.value);
    };
    useEffect(() => {
        const fetchContests = async () => {
            try {
                const response = await fetch('https://clist.by:443/api/v4/contest/?upcoming=true', {
                    headers: {
                        'Authorization': 'ApiKey Mohan1201:2baff9da29bd30815321478c5578135082f69b67'
                    }
                });
                const data = await response.json();
                const sortedContests = data.objects.sort((a, b) => new Date(a.start) - new Date(b.start));
                setContests(sortedContests);
            } catch (error) {
                console.error('Error fetching contests:', error);
            }
        };

        fetchContests();
    }, []);
    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };
    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return format(date, "yyyy-MM-dd HH:mm:ss");
    };
    const triggerNotification = async (event) => {
        event.preventDefault();
        const timeInSeconds = time * 60;

        if (host && timeInSeconds) {
            try {
                const response = await fetch(`${apiUrl}/trigger-notification`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ time: timeInSeconds, host }),
                });
if(response === `[]`){
    setDisplay("No contests are there or please check the URL");
}
                if (response.ok) {
                    setDisplay('Reminder set successfully!');
                    
                } else {
                    setDisplay('Failed to set reminder.');
                }
            } catch (error) {
                console.error('Error sending reminder', error);
                setDisplay('Error sending reminder.');
            }
        }
    };

    return (
        <div className="h-[100%] bg-[#1c1c1c] ">
            <div className="bg-[#1c1c1c] flex flex-col justify-center items-center pt-20">
                <h1 className="pt-10 font-bold text-2xl sm:text-3xl md:text-4xl text-[#fefefe] text-center">
                    <span className="text-[#2FB9B3]">Contest</span> Notification Reminder
                </h1>
                <p className="pt-5 text-lg sm:text-xl md:text-2xl text-[#fefefe] text-center font-semibold">
                    Enter <span className="text-[#2FB9B3]">Platform URL</span> and the <span className="text-[#2FB9B3]">time in minutes</span> before you want a reminder about the contest
                </p>

                <div className="sm:mx-auto sm:w-full sm:max-w-md pt-10">
                    <form className="flex flex-col space-y-6" onSubmit={triggerNotification}>
                        <div>
                            <label htmlFor="platform-url" className="block text-sm font-medium leading-6 text-[#fefefe]">
                                Platform URL
                            </label>
                            <div className="mt-2">
                                <input
                                    required
                                    className="pl-2 h-10 block w-full rounded-md border-0 py-1.5 text-[#fefefe] ring-inset bg-[#252525] placeholder-gray-50 focus:ring-2 focus:ring-inset focus:ring-[#2FB9B3] sm:text-sm sm:leading-6"
                                    value={host}
                                    onChange={handleHostChange}
                                    placeholder="Enter your Platform"
                                    id="platform-url"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="time" className="block text-sm font-medium leading-6 text-[#fefefe]">
                                Time (in minutes)
                            </label>
                            <div className="mt-2">
                                <input
                                    required
                                    className="pl-2 h-10 block w-full rounded-md border-0 py-1.5 text-[#fefefe] ring-inset bg-[#252525] placeholder-gray-50 focus:ring-2 focus:ring-inset focus:ring-[#2FB9B3] sm:text-sm sm:leading-6"
                                    placeholder="Enter time"
                                    value={time}
                                    onChange={handleTimeChange}
                                    id="time"
                                    type="number"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="justify-center rounded-md bg-[#2FB9B3] hover:bg-[#46e6de] py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Submit
                        </button>
                    </form>

                    <p className="text-center text-[#fefefe] pt-4">
                        {display}
                    </p>


                </div>
            </div>
            <div className="container mx-auto p-4 text-[#fefefe]">
                <h1 className="text-2xl font-bold mb-4 text-[#2FB9B3]">Upcoming Contests</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Duration (s)</th>
                                <th className="px-4 py-2 border">Start Date & Time</th>

                                <th className="px-4 py-2 border">Event</th>
                                <th className="px-4 py-2 border">Host</th>
                                <th className="px-4 py-2 border">URL</th>
                                <th className="px-4 py-2 border">ID</th>
                                <th className="px-4 py-2 border">End Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contests.map(contest => (
                                <tr key={contest.id}>
                                    <td className="px-4 py-2 border">{contest.duration}</td>
                                    <td className="px-4 py-2 border">{formatDate(contest.start)}</td>

                                    <td className="px-4 py-2 border">{contest.event}</td>
                                    <td className="px-4 py-2 border">{contest.host}</td>
                                    <td className="px-4 py-2 border">
                                        <a href={contest.href} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                            Link
                                        </a>
                                    </td>
                                    <td className="px-4 py-2 border">{contest.id}</td>
                                    <td className="px-4 py-2 border">{formatDate(contest.end)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
