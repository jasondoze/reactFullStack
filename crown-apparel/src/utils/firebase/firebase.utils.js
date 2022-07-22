import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDTt8p7Fauq7oU1r_6QJdCK8xSyXs_-cIY',
  authDomain: 'crown-apparel-c5bff.firebaseapp.com',
  projectId: 'crown-apparel-c5bff',
  storageBucket: 'crown-apparel-c5bff.appspot.com',
  messagingSenderId: '806289779098',
  appId: '1:806289779098:web:edc1e9e796edf511bfb223',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // if user data does not exist
  if (!userSnapshot.exists()) {
    // set the doc with this object
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    // return userDocRef
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userDocRef;
};
