import React, { useState, useEffect } from 'react';
import apiUrl from '../context/apiConfig';
import format from 'date-fns/format';
import { useFirebase } from '../context/firebase';
import axios from 'axios';
import NotificationPanel from '../components/NotificationPanel';
import TokenDisplay from '../components/TokenDisplay';
import TimeModal from '../components/modal';


export default function NewContests({ notifications, setNotifications }) {
    const [contests, setContests] = useState([]);
    const [response, setResponse] = useState(null);
    const [token, setToken] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContest, setSelectedContest] = useState(null);

    const firebase = useFirebase();

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

    const triggerNotification = async ({ hours, minutes, seconds }) => {
        const userDetails = await firebase.getUserDetails();

        if (!userDetails || !selectedContest) {
            setResponse({ success: false, message: 'Failed to get user details or no contest selected.' });
            return;
        }

        const { userToken } = userDetails;
        const timeInSeconds = (hours * 3600) + (minutes * 60) + seconds;

        try {
            const res = await axios.post(`${apiUrl}/set-app-reminder`, {
                hours,
                minutes,
                seconds,
                host: selectedContest.host,
                token: userToken,
                contestId: selectedContest.id,
                email: userDetails.userEmail
            });

            if (res.data.success) {
                setResponse({ success: true, message: res.data.message });
            } else {
                setResponse({ success: false, message: res.data.message });
            }

            console.log(res.data.message);
        } catch (error) {
            console.error('Error sending reminder', error);
            setResponse({ success: false, message: 'Error sending reminder.' });
        }
    };

    const handleOpenModal = (contest) => {
        setSelectedContest(contest);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setResponse(null);
    };

    return (
        <div className="h-full bg-[#1c1c1c]">
            <div className="bg-[#1c1c1c] flex flex-col justify-center items-center pt-20">
                <h1 className="pt-10 font-bold text-2xl sm:text-3xl md:text-4xl text-[#fefefe] text-center">
                    <span className="text-[#2FB9B3]">Contest</span> Notification Reminder
                </h1>
                <p className="pl-2 pr-2 pt-5 text-lg sm:text-xl md:text-2xl text-[#fefefe] text-center font-semibold">
                    Click on <span className="text-[#2FB9B3]">Set Reminder</span> and enter <span className="text-[#2FB9B3]">time</span> before you want a reminder about the contest
                </p>
            </div>

            {/* <TokenDisplay token={token} setToken={setToken} /> */}
            <p className="pl-2 pr-2 pt-5 text-lg sm:text-xl md:text-2xl text-[#fefefe] text-center font-semibold">
                Our Bot <span className="text-[#2FB9B3]">Timely</span> is here to solve your queries using <span className="text-[#2FB9B3]">Gemini</span> You can check this on the bottom right corner of our website.
            </p>
            <p className="pl-2 pr-2 pt-5 text-lg sm:text-xl md:text-2xl text-[#fefefe] text-center font-semibold">
                After setting your reminder, you will receive<span className="text-[#2FB9B3]"> a notification and an email regarding the contest</span>
            </p>




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
                                <th className="px-4 py-2 border">Actions</th>
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
                                    <td className="px-4 py-2 border">
                                        <button
                                            onClick={() => handleOpenModal(contest)}
                                            className="bg-[#2FB9B3] text-white px-4 py-1 rounded-md"
                                        >
                                            Set Reminder
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <TimeModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={triggerNotification}
                apiResponse={response}
            />
        </div>
    );
}
