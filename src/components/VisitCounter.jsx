


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiUrl from '../context/apiConfig';

const VisitCounter = () => {
    const [visitCount, setVisitCount] = useState(0);

    useEffect(() => {
        const fetchVisitCount = async () => {
            try {
                const response = await axios.get(`${apiUrl}/visit-count`);
                setVisitCount(response.data.count);
            } catch (error) {
                console.error('Error fetching visit count:', error);
            }
        };

        fetchVisitCount();
    }, []);

    return (
        <div className="fixed bottom-0 w-full text-center bg-[#333333ff] text-white py-2">
            Number of visits: {visitCount}
        </div>
    );
};

export default VisitCounter;
