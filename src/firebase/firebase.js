import {initializeApp} from "firebase/app";
import {getFirestore, collection} from "firebase/firestore"
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBJTK2Cs-YUDl1XsNLcbkKPA1Xoes4NDZE",
    authDomain: "blockchainpoll-caf54.firebaseapp.com",
    projectId: "blockchainpoll-caf54",
    storageBucket: "blockchainpoll-caf54.appspot.com",
    messagingSenderId: "944803374408",
    appId: "1:944803374408:web:2fc441296f020fd328ff7d",
    measurementId: "G-XR5WS5MV9Q"
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const pollStore = collection(firestore, 'polls')
export const userStore = collection(firestore, 'users')