import React from "react";
import Footer from "../components/Footer";

const AboutUs = () => {
    return (
        <>
            <div className="bg-[#1C1C1C] text-white min-h-screen py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-[#2FB9B3]">About Code4fun</h1>
                        <p className="mt-4 text-lg text-gray-300">
                            Welcome to Code4Fun, where coding becomes fun and efficient! We are
                            dedicated to offering a seamless platform for competitive programming, contest preparation, and collaboration.
                        </p>
                    </div>

                    {/* Mission Section */}
                    <div className="bg-[#333333ff] shadow-md rounded-lg p-6 mb-10">
                        <h2 className="text-2xl font-semibold text-[#2FB9B3] mb-4">Our Mission</h2>
                        <p className="text-gray-300">
                            At Code4Fun, we believe coding should be both challenging and enjoyable. Our goal is to provide a platform where coders can not only compete in coding contests but also collaborate and grow together. We integrate the best features from competitive coding platforms, adding functionalities to make your experience smoother and more interactive.
                        </p>
                    </div>

                    {/* How Code4Fun Helps Section */}
                    <div className="bg-[#333333ff] shadow-md rounded-lg p-6 mb-10">
                        <h2 className="text-2xl font-semibold text-[#2FB9B3] mb-4">
                            How Code4Fun Helps with Codeforces Contests
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-[#2FB9B3]">
                                    Side-by-Side Layout for Contests
                                </h3>
                                <p className="text-gray-300 mt-2">
                                    Code4Fun offers a side-by-side layout that lets you view contest problems and code simultaneously. No more switching between windows – get everything you need on a single screen when participating in live contests.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-[#2FB9B3]">Real-Time Problem Updates</h3>
                                <p className="text-gray-300 mt-2">
                                    During Codeforces contests, problem statements are automatically fetched and displayed in real-time. You can start coding the moment the contest goes live.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-[#2FB9B3]">Two Types of Code Editors</h3>
                                <p className="text-gray-300 mt-2">
                                    Code4Fun offers two distinct editors:
                                </p>
                                <ul className="list-disc list-inside text-gray-300 mt-2">
                                    <li>
                                        <strong>Basic Editor:</strong> Simple, user-friendly, and perfect for beginners.
                                    </li>
                                    <li>
                                        <strong>Advanced Editor:</strong> Ideal for experienced users, with additional features like debugging tools and multi-language support.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-[#2FB9B3]">Contest Reminders</h3>
                                <p className="text-gray-300 mt-2">
                                    Never miss a contest! Set reminders directly within the platform, and receive push notifications to your device, ensuring you're always prepared.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Code Execution Section */}
                    <div className=" bg-[#333333ff] shadow-md rounded-lg p-6 mb-10">
                        <h2 className="text-2xl font-semibold text-[#2FB9B3] mb-4">Code Execution</h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-[#2FB9B3]">File Upload</h3>
                                <p className="text-gray-300 mt-2">
                                    Multer handles file uploads and temporarily stores them, ensuring a smooth and efficient upload process.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-[#2FB9B3]">Save to MongoDB</h3>
                                <p className="text-gray-300 mt-2">
                                    Uploaded code files are saved to MongoDB along with relevant metadata, allowing for easy retrieval and management.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-[#2FB9B3]">Code Execution</h3>
                                <p className="text-gray-300 mt-2">
                                    The code is executed using Node.js's child_process module, with Promises ensuring asynchronous handling and non-blocking execution.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-[#2FB9B3]">Results</h3>
                                <p className="text-gray-300 mt-2">
                                    Execution results or errors are captured and returned asynchronously to users, providing timely feedback on their code.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tech Stack Section */}
                    <div className="bg-[#333333ff] shadow-md rounded-lg p-6 mb-10">
                        <h2 className="text-2xl font-semibold text-[#2FB9B3] mb-4">Tech Stack</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold text-[#2FB9B3]">Frontend:</h3>
                                <p className="text-gray-300">React</p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-[#2FB9B3]">Backend:</h3>
                                <p className="text-gray-300">Node.js, Express.js</p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-[#2FB9B3]">Database:</h3>
                                <p className="text-gray-300">
                                    MongoDB for storing codes, inputs, and outputs.
                                    Firebase for user management, storing user tokens, and handling contest notifications.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-[#2FB9B3]">Chatbot:</h3>
                                <p className="text-gray-300">
                                    Integrated with Gemini AI Model and cloudRun API for an AI-powered chatbot experience.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-[#2FB9B3]">Backend API Deployment:</h3>
                                <p className="text-gray-300">
                                    Deployed on Google CloudRun  for high availability and scalability.
                                </p>
                            </div>



                            <div>
                                <h3 className="text-xl font-semibold text-[#2FB9B3]">Additional Features:</h3>
                                <p className="text-gray-300">
                                    - AskGemini: AI chatbot assistance.<br />
                                    - Setting Reminders: Used Google Cloud Schedule and Cron Jobs.<br />
                                    - Compiling Codes without any external API<br />
                                    - User Management and contest handling through Firebase.
                                </p>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
            <Footer />
        </>

    );
};

export default AboutUs;
