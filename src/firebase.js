import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB95th_StzBQB2IlqDuWrqKrwjR-QaA0uA",
    authDomain: "cocreate-459a3.firebaseapp.com",
    databaseURL: "https://cocreate-459a3-default-rtdb.firebaseio.com",
    projectId: "cocreate-459a3",
    storageBucket: "cocreate-459a3.appspot.com",
    messagingSenderId: "290039324766",
    appId: "1:290039324766:web:52451f0796a3d2c8f054cf",
    measurementId: "G-LDMPYRW432"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;