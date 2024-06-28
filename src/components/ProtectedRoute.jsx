import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';


const ProtectedRoute = ({ element: Component }) => {
    const { isLoggedIn, currentUser } = useFirebase();

    return isLoggedIn && currentUser ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
