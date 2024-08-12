import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseProvider } from './context/firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </React.StrictMode>
  </BrowserRouter>
);

//wrapping will help to use useFirebase everywhere
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registration successful with scope: ', registration.scope);
    }).catch((err) => {
      console.log('Service Worker registration failed: ', err);
    });
}

