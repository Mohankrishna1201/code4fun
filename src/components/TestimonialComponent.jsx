import React, { useState, useEffect } from 'react';
import '../App.css'
const TestimonialWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const script = document.createElement('script');
            script.src = 'https://testimonial.to/js/widget-embed.js';
            script.async = true;
            script.type = 'text/javascript';
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, [isOpen]);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <button
                onClick={openModal}
                className="bg-[#2FB9B3] text-white px-4 py-2 rounded hover:bg-[#36a7a1] transition"
            >
                Feedback😊
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={closeModal}
                >
                    <div
                        className="bg-[#25282c] p-6 rounded-lg shadow-lg relative max-w-lg w-full h-[500px] overflow-auto custom-scrollbar"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <div
                            className="testimonial-to-embed"
                            data-url="https://embed-v2.testimonial.to/c/code4fun?theme=dark"
                            data-allow="camera;microphone"
                            data-resize="true"
                        ></div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TestimonialWidget;
