import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
const firebaseConfig = {
    storageBucket: "gs://next-dashboard-3cfe2.appspot.com",
}


const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const storageRef = ref(storage)