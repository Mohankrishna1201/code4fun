import React from 'react';

const NotificationPanel = ({ notifications }) => {
    // Assuming notifications is already an array of objects
    return (
        <div>

            <ul >
                {notifications.map((notification, index) => (
                    <li className=" text-white" key={index}>{JSON.stringify(notification)}</li>
                ))}
            </ul>
        </div>
    );
};


export default NotificationPanel;
