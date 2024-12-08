import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDrCMtsrTuCbnLWj-NaHtxTO1KG_2X1VY0',
    authDomain: 'nominas-vue-ut.firebaseapp.com',
    projectId: 'nominas-vue-ut',
    storageBucket: 'nominas-vue-ut.appspot.com',
    messagingSenderId: '58400371978',
    appId: '1:58400371978:web:8c0478505ed10cd8c8b6f3'
}

export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp);
