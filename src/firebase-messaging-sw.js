importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");
importScripts('/__/firebase/8.6.7/firebase-messaging.js');
importScripts('/__/firebase/init.js');

const firebaseConfig = {
    apiKey: "AIzaSyCdRI3AZ4_1QUsVLxLCozPcDb0ALau_aUw",
    authDomain: "onlinecompiler-bf7c3.firebaseapp.com",
    projectId: "onlinecompiler-bf7c3",
    storageBucket: "onlinecompiler-bf7c3.appspot.com",
    messagingSenderId: "928632387689",
    appId: "1:928632387689:web:deac92025ece69fbde4af8",
    measurementId: "G-9362WLE4FT"
};

// Initialize Firebase app in the service worker context
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image
    };

    self.ServiceWorkerRegistration.notification(notificationTitle, notificationOptions)
});


