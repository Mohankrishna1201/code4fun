import React, { useState, useEffect } from 'react';
import apiUrl from '../context/apiConfig';
import format from 'date-fns/format';
import { useFirebase } from '../context/firebase';
import axios from 'axios';
import TimeModal from '../components/modal';

function FilterBar({ onFilterByPlatform, onFilterByStartDate, onFilterByDuration, onResetFilters }) {
    return (
        <div className="bg-[#1c1c1c] p-4 flex flex-col md:flex-row gap-4 md:gap-6 justify-between items-center mt-4">
            {/* Platform Filter Input */}
            <input
                type="text"
                placeholder="Filter by platform (e.g., Codeforces)"
                className="bg-[#333333] text-white px-4 py-2 rounded-md w-full md:w-1/4 focus:outline-none focus:ring focus:ring-blue-500"
                onChange={(e) => onFilterByPlatform(e.target.value)}
            />

            {/* Filter by Start Date Button */}
            <button
                onClick={onFilterByStartDate}
                className="bg-[#2FB9B3] transition text-white px-4 py-2 rounded-md w-full md:w-auto text-center "
            >
                Today's Contests
            </button>

            {/* Duration Filter Dropdown */}
            <select
                className="bg-[#333333] text-white px-4 py-2 rounded-md w-full md:w-1/4 focus:outline-none focus:ring focus:ring-[#2FB9B3]"
                onChange={(e) => onFilterByDuration(Number(e.target.value))}
            >
                <option value="">Filter by Duration</option>
                <option value="7200">Less than 2 hours</option>
                <option value="14400">Less than 4 hours</option>
                <option value="28800">Less than 8 hours</option>
            </select>

            {/* Reset Filters Button */}
            <button
                onClick={onResetFilters}
                className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-md w-full md:w-auto text-center"
            >
                Reset Filters
            </button>
        </div>
    );
}



export default function NewContests({ notifications, setNotifications }) {
    const [contests, setContests] = useState([]);
    const [response, setResponse] = useState(null);  // Response for API requests
    const [token, setToken] = useState(null);        // User token for notifications
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContest, setSelectedContest] = useState(null);
    const [filteredContests, setFilteredContests] = useState(contests);
    const [testApiResponse, setTestApiResponse] = useState(null);

    const firebase = useFirebase();

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return format(date, "yyyy-MM-dd HH:mm:ss");
    };
    const filterByPlatform = (platform) => {
        setFilteredContests(
            contests.filter((contest) => contest.host.toLowerCase().includes(platform.toLowerCase()))
        );
    };

    // Filter contests that start from today
    const filterByStartDate = () => {
        const today = new Date();
        setFilteredContests(
            contests.filter((contest) => {
                const contestDate = new Date(contest.start);
                return contestDate.toDateString() === today.toDateString();
            })
        );
    };

    // Filter contests by duration (e.g., less than 2 hours)
    const filterByDuration = (maxDurationInSeconds) => {
        setFilteredContests(
            contests.filter((contest) => contest.duration <= maxDurationInSeconds)
        );
    };

    // Reset filters to show all contests
    const resetFilters = () => {
        setFilteredContests(contests);
    };
    // Fetch upcoming contests
    useEffect(() => {
        const fetchContests = async () => {
            try {
                const response = await fetch('https://clist.by:443/api/v4/contest/?limit=300&upcoming=true', {
                    headers: {
                        'Authorization': 'ApiKey Mohan1201:2baff9da29bd30815321478c5578135082f69b67'
                    }
                });
                const data = await response.json();
                const sortedContests = data.objects.sort((a, b) => new Date(a.start) - new Date(b.start));
                setFilteredContests(sortedContests);
                setContests(sortedContests);
            } catch (error) {
                console.error('Error fetching contests:', error);
            }
        };

        fetchContests();


    }, []);

    // Update notifications when response changes
    useEffect(() => {
        if (response) {
            setNotifications((prevNotifications) => [...prevNotifications, response]);
        }
    }, [response, setNotifications]);

    // Trigger notification (reminder)
    const triggerNotification = async ({ hours, minutes, seconds }) => {
        const userDetails = await firebase.getUserDetails();

        if (!userDetails || !selectedContest) {
            setResponse({ success: false, message: 'Failed to get user details or no contest selected.' });
            return;
        }

        const { userToken } = userDetails;
        setToken(userToken);  // Set user token
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

            // Handle the response from the API
            if (res.data.success) {
                setResponse({ success: true, message: res.data.message });
            } else {
                setResponse({ success: false, message: res.data.message });  // Change to boolean false
            }
        } catch (error) {
            console.error('Error sending reminder', error);
            setResponse({ success: false, message: 'Error sending reminder.' });
        }
    };
    const TestTriggerNotification = async ({ hours, minutes, seconds }) => {
        const userDetails = await firebase.getUserDetails();

        if (!userDetails || !selectedContest) {
            setResponse({ success: false, message: 'Failed to get user details or no contest selected.' });
            return;
        }

        const { userToken } = userDetails;
        setToken(userToken);  // Set user token
        const timeInSeconds = (hours * 3600) + (minutes * 60) + seconds;

        try {
            const res = await axios.post(`${apiUrl}/execute-app-reminder`, {
                hours,
                minutes,
                seconds,
                host: selectedContest.host,
                token: userToken,
                contestId: selectedContest.id,
                email: userDetails.userEmail
            });

            // Handle the response from the API
            if (res.data) {
                setTestApiResponse(res.data);
                console.log('checll')

                alert(res.data)
            } else {
                setTestApiResponse(res.data.message);  // Change to boolean false
            }
        } catch (error) {
            console.error('Error sending reminder', error);
            setResponse({ success: false, message: 'Error sending reminder.' });
        }
    };
    console.log(testApiResponse);
    // Open the modal for a specific contest
    const handleOpenModal = (contest) => {
        setSelectedContest(contest);
        setIsModalOpen(true);
        setResponse(null);  // Reset the response when modal opens
    };

    // Close the modal and reset states
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setResponse(null);  // Reset response on modal close to avoid red popup
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
            <FilterBar
                onFilterByPlatform={(platform) => filterByPlatform(platform)}
                onFilterByStartDate={() => filterByStartDate()}
                onFilterByDuration={(maxDuration) => filterByDuration(maxDuration)}
                onResetFilters={() => resetFilters()}
            />
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
                            {filteredContests.map(contest => (
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

            {/* Modal for setting reminder */}
            <TimeModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={triggerNotification}
                apiResponse={response}
                details={token}
                test={TestTriggerNotification}
                testApi={testApiResponse}
            />
        </div>
    );

}
