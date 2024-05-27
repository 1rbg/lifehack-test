import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDRgr7sRQbiRmuMd-1VGauV8dJdDYy0yaE",
  authDomain: "bhq-bros.firebaseapp.com",
  projectId: "bhq-bros",
  storageBucket: "bhq-bros.appspot.com",
  messagingSenderId: "92046836003",
  appId: "1:92046836003:web:2a50ee2092821d5d050c96",
  measurementId: "G-7EZ4H9K7SP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
