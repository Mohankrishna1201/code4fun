import { initializeApp } from "firebase/app";
import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, } from 'firebase/auth'
import { FacebookAuthProvider, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, setDoc, getDocs, query, where, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getMessaging, getToken } from "firebase/messaging";
import apiUrl from "./apiConfig";
const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyCdRI3AZ4_1QUsVLxLCozPcDb0ALau_aUw",
    authDomain: "onlinecompiler-bf7c3.firebaseapp.com",
    projectId: "onlinecompiler-bf7c3",
    storageBucket: "onlinecompiler-bf7c3.appspot.com",
    messagingSenderId: "928632387689",
    appId: "1:928632387689:web:deac92025ece69fbde4af8",
    measurementId: "G-9362WLE4FT",
    databaseUrl: "https://console.firebase.google.com/u/0/project/onlinecompiler-bf7c3/database/onlinecompiler-bf7c3-default-rtdb/data/~2F"
};

const Googleprovider = new GoogleAuthProvider();
const Facebookprovider = new FacebookAuthProvider();

export const useFirebase = () => {
    return useContext(FirebaseContext);
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const messaging = getMessaging(firebaseApp);
export const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const firebaseAuth = getAuth(firebaseApp)
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) setUser(user);
            else setUser(null);
            console.log(user);
        })
    }, []);
    const currentUser = user;
    const UserLogout = async () => {
        await signOut(firebaseAuth);
        setUser(null);
    };
    const UserSignUpwithEmailandPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password);
    };

    const UserLoginwithEmailandPassword = (email, password) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password);
    };

    const UserLoginGoogle = () => {
        return signInWithPopup(firebaseAuth, Googleprovider);

    }
    const UserLoginFacebook = () => {
        return signInWithPopup(firebaseAuth, Facebookprovider);

    }
    const isLoggedIn = user ? true : false;

    const handleUpdateProfile = async (name, file) => {
        if (!currentUser) {
            console.error('Current user is null.');
            return;
        }
        const userDocRef = doc(firestore, `users/${currentUser.uid}`);
        const imageRef = ref(storage, `uploads/userProfilePics/${currentUser.uid}-${name}`);
        const uploadResult = await uploadBytes(imageRef, file);
        await setDoc(userDocRef, {
            userName: name,
            coverPic: uploadResult.ref.fullPath || currentUser.photoURL || null,
            userID: currentUser.uid,
            userEmail: currentUser.email,
        }, { merge: true });

        console.log('Profile update successful');
    }

    const handleComment = async (comment) => {
        if (!currentUser) {
            console.error('Current user is null.');
            return;
        }
        const commentsCollectionRef = collection(firestore, 'comments');
        await addDoc(commentsCollectionRef, comment);
    };

    const handleReply = async (commentId, reply) => {
        const repliesCollectionRef = collection(firestore, 'replies');
        await addDoc(repliesCollectionRef, {
            ...reply,
            commentId
        });
    };

    const getComments = async () => {
        const commentsCollectionRef = collection(firestore, 'comments');
        const repliesCollectionRef = collection(firestore, 'replies');
        const commentsSnapshot = await getDocs(commentsCollectionRef);
        const commentsList = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const repliesSnapshot = await getDocs(repliesCollectionRef);
        const repliesList = repliesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        commentsList.forEach(comment => {
            comment.replies = repliesList.filter(reply => reply.commentId === comment.id);
        });

        return commentsList;
    };

    const getUser = () => {
        return getDocs(collection(firestore, 'users'));
    }

    const getImageUrl = (path) => {
        return getDownloadURL(ref(storage, path));
    }

    const getUserToken = async () => {
        try {
            const permission = await Notification.requestPermission();
            console.log(permission);
            if (permission === 'granted') {
                const token = await getToken(messaging, { vapidKey: "BLJG6vjnPiQPk9or_IZ_65xU9yEoQL5X8zE3xv1kjIr50Zfjmufx4O3tbKWyNmqJQwA6YmC2ZReDss-tXSjyhTs" });
                console.log(token);

                // Send the token to your backend
                if (token) {
                    await fetch(`${apiUrl}/save-token`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token }),
                    });
                    console.log('Token sent to backend:', token);
                } else {
                    console.log('No registration token available. Request permission to generate one.');
                }
            }
        } catch (error) {
            console.error('Error retrieving token:', error);
        }
    };

    return (
        <FirebaseContext.Provider value={{ UserSignUpwithEmailandPassword, UserLoginwithEmailandPassword, UserLoginGoogle, UserLoginFacebook, isLoggedIn, UserLogout, currentUser, handleUpdateProfile, getUser, getImageUrl, handleComment, handleReply, getComments, getUserToken, messaging }}>
            {children}
        </FirebaseContext.Provider>
    );
};
