import React, { useState, useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlineLoading3Quarters, AiOutlineCloseCircle } from "react-icons/ai";

const TimeModal = ({ isOpen, onClose, onSubmit, apiResponse, details, test, testApi }) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const [load, setLoad] = useState(false);
    const [text, setText] = useState('');

    const handleSubmit = () => {
        setLoad(true);
        setShowSuccess(false);
        setShowError(false);
        onSubmit({ hours, minutes, seconds });
    };

    useEffect(() => {
        console.log('API Response:', apiResponse); // Add this log to inspect the response
        if (apiResponse && apiResponse.message) {
            setLoad(false);
            if (apiResponse.message.includes('Reminder set')) {
                setShowSuccess(true);
            } else {
                setShowError(true);
            }
        }


    }, [apiResponse]);
    useEffect(() => {
        console.log('API Response:', testApi); // Add this log to inspect the response
        if (testApi) {
            setText(testApi);

        }


    }, [text]);

    const handleClose = () => {
        onClose();
        setShowSuccess(false);
        setShowError(false);
        setLoad(false);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {!showSuccess && !showError ? (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    {load ? (
                        <div className="flex justify-center items-center">
                            <AiOutlineLoading3Quarters
                                size={50}
                                className="animate-spin text-blue-500"
                            />
                        </div>
                    ) : (
                        <>
                            <div>
                                <h2 className="text-lg font-semibold mb-4">
                                    Please enter how many minutes before the start time you would
                                    like to receive the reminder.
                                    <br />
                                    (The time must not be zero.)
                                </h2>

                            </div>

                            <div className="flex space-x-4 mb-4">
                                <div className="flex flex-col gap-2 flex-1">
                                    <label
                                        htmlFor="hours"
                                        className="text-gray-700 font-semibold"
                                    >
                                        Hours
                                    </label>
                                    <input
                                        id="hours"
                                        type="number"
                                        placeholder="Hours"
                                        value={hours}
                                        onChange={(e) => setHours(e.target.value)}
                                        className="border text-black p-2 rounded-md w-full"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <label
                                        htmlFor="minutes"
                                        className="text-gray-700 font-semibold"
                                    >
                                        Minutes
                                    </label>
                                    <input
                                        id="minutes"
                                        type="number"
                                        placeholder="Minutes"
                                        value={minutes}
                                        onChange={(e) => setMinutes(e.target.value)}
                                        className="border text-black p-2 rounded-md w-full"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <label
                                        htmlFor="seconds"
                                        className="text-gray-700 font-semibold"
                                    >
                                        Seconds
                                    </label>
                                    <input
                                        id="seconds"
                                        type="number"
                                        placeholder="Seconds"
                                        value={seconds}
                                        onChange={(e) => setSeconds(e.target.value)}
                                        className="border text-black p-2 rounded-md w-full"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={test}
                                    className=" text-[#2FB9B3] px-4 py-2 rounded-md"
                                >
                                    Test Reminder
                                </button>

                                <button
                                    onClick={handleSubmit}
                                    className="bg-[#2FB9B3] text-white px-4 py-2 rounded-md"
                                >
                                    Set Reminder
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ) : showSuccess ? (
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <AiOutlineCheckCircle size={50} className="text-green-500 mb-4" />
                    <h2 className="text-lg font-semibold mb-4">Success</h2>
                    <p className="text-gray-700 mb-4">{apiResponse?.message}</p>
                    <p className="mb-2">
                        The timings mentioned above are in Coordinated Universal Time. You
                        will receive a reminder at your desired time.
                    </p>
                    <button
                        onClick={handleClose}
                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                        Close
                    </button>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <AiOutlineCloseCircle size={50} className="text-red-500 mb-4" />
                    <h2 className="text-lg font-semibold mb-4">Error</h2>
                    <p className="text-gray-700 mb-4">{apiResponse?.message}</p>
                    <p className="mb-2">
                        Please click "Allow Notifications" and try again.
                    </p>
                    <button
                        onClick={handleClose}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default TimeModal;
