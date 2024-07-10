import React, { useState, useEffect } from 'react';
import apiUrl from '../context/apiConfig';
import format from 'date-fns/format';
import { useFirebase } from '../context/firebase';
import axios from 'axios'
import NotificationPanel from '../components/NotificationPanel';
import TokenDisplay from '../components/TokenDisplay';
export default function Contests({ notifications, setNotifications }) {
    const [host, setHost] = useState('');
    const [time, setTime] = useState('');
    const [display, setDisplay] = useState('');
    const [contests, setContests] = useState([]);
    const [response, setResponse] = useState();
    const [token, setToken] = useState('');
    const firebase = useFirebase();

    // const handleHostChange = (e) => {
    //     setHost(e.target.value);
    // };

    // const handleTimeChange = (e) => {
    //     setTime(e.target.value);
    // };

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return format(date, "yyyy-MM-dd HH:mm:ss");
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
    useEffect(() => {
        if (response) {
            setNotifications((prevNotifications) => [...prevNotifications, response]);
        }
    }, [response, setNotifications]);



    const triggerNotification = async (event) => {
        event.preventDefault();
        const userDetails = await firebase.getUserDetails();

        if (!userDetails) {
            setDisplay('Failed to get user details.');
            return;
        }

        const { userToken } = userDetails;
        const timeInSeconds = time * 60; // Convert minutes to seconds

        if (host && timeInSeconds) {
            try {

                const res = await axios.post(`${apiUrl}/reminder`, { time: timeInSeconds, host, token: userToken });
                setResponse(res.data);

                if (res.data) {
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
        <div className="h-full bg-[#1c1c1c]">
            <div className="bg-[#1c1c1c] flex flex-col justify-center items-center pt-20">
                <h1 className="pt-10 font-bold text-2xl sm:text-3xl md:text-4xl text-[#fefefe] text-center">
                    <span className="text-[#2FB9B3]">Contest</span> Notification Reminder
                </h1>
                <p className="pt-5 text-lg sm:text-xl md:text-2xl text-[#fefefe] text-center font-semibold">
                    Enter <span className="text-[#2FB9B3]">Platform URL</span> and the <span className="text-[#2FB9B3]">time in minutes</span> before you want a reminder about the contest
                </p>

            </div>
            <TokenDisplay token={token} setToken={setToken} />
            <NotificationPanel notifications={notifications} />
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
