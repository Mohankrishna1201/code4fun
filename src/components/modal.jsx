import React, { useState, useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Importing the loading icon

const TimeModal = ({ isOpen, onClose, onSubmit, apiResponse }) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [load, setLoad] = useState(false); // Using load state for loader

    const handleSubmit = () => {
        setLoad(true); // Start loader when form is submitted
        setShowSuccess(false); // Reset success state
        onSubmit({ hours, minutes, seconds });
    };

    useEffect(() => {
        if (apiResponse) {
            setLoad(false); // Stop loader when API response is received
            setShowSuccess(true); // Show success message
        }
    }, [apiResponse]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {!showSuccess ? (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    {load ? ( // Show loader if load state is true
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
                                    Please enter how many minutes before the start time you would like to receive the reminder.
                                    <br />
                                    (The time must not be zero.)
                                </h2>

                            </div>


                            <div className="flex space-x-4 mb-4">
                                <input
                                    type="number"
                                    placeholder="Hours"
                                    value={hours}
                                    onChange={(e) => setHours(e.target.value)}
                                    className="border text-black p-2 rounded-md w-full"
                                />
                                <input
                                    type="number"
                                    placeholder="Minutes"
                                    value={minutes}
                                    onChange={(e) => setMinutes(e.target.value)}
                                    className="border text-black p-2 rounded-md w-full"
                                />
                                <input
                                    type="number"
                                    placeholder="Seconds"
                                    value={seconds}
                                    onChange={(e) => setSeconds(e.target.value)}
                                    className="border text-black p-2 rounded-md w-full"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={onClose}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="bg-[#2FB9B3] text-white px-4 py-2 rounded-md"
                                >
                                    Set Reminder
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <AiOutlineCheckCircle size={50} className="text-green-500 mb-4" />
                    <h2 className="text-lg font-semibold mb-4">Success</h2>
                    <p className="text-gray-700 mb-4">{apiResponse?.message}</p>
                    <p>The timings mentioned above are in Coordinated Universal Time. You will receive a reminder at your desired time.</p>
                    <button
                        onClick={onClose}
                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default TimeModal;
