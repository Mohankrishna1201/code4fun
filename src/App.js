import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CodeForces from './pages/CodeForces';
import OnlineCompiler from './components/OnlineCompiler';
import { useFirebase } from './context/firebase';
import PopupModal from './components/PopupModal';
import ProtectedRoute from './components/ProtectedRoute';
import { onMessage } from 'firebase/messaging';







function App() {

  const [photoURL, setPhotoURL] = useState('');
  const [dname, setDName] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn, currentUser } = useFirebase();
  const firebase = useFirebase();
  useEffect(() => {
    firebase.getUserToken()

    if (isLoggedIn && currentUser) {
      setPhotoURL(currentUser.photoURL);
      setDName(currentUser.displayName);
    } else {
      // Handle when user is not logged in
      setPhotoURL('https://cdn.dribbble.com/userupload/15281012/file/original-18b6e4ae4469cb15d8c5dad00faa4430.png?resize=400x397');
      setDName('');
    }

  }, [isLoggedIn, currentUser, photoURL, dname]);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service Worker registration successful with scope: ', registration.scope);
      }).catch((err) => {
        console.log('Service Worker registration failed: ', err);
      });
  }

  const handleLogin = async (result) => {

    await setPhotoURL(result.user.photoURL);
    await setDName(result.user.displayName);
    navigate('/');

    // Optionally, you can handle other login-related state or actions here
  };




  return (
    <div>

      <NavbarComponent photo={photoURL} dname={dname} />
      <Routes>
        <Route path="/" element={<SignUp onLogIn={handleLogin} />} />
        <Route path="/login" element={<Login onLogIn={handleLogin} />} />
        <Route path="/codeforces" element={<ProtectedRoute element={CodeForces} />} />
        <Route path="/oc" element={<OnlineCompiler />} />
        <Route path='/profile' element={<ProtectedRoute element={PopupModal} />} />

      </Routes>
    </div>
  );
}

export default App;
