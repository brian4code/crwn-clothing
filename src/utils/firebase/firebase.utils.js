import { initializeApp } from 'firebase/app'
import { 
  getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider
} from 'firebase/auth'
import {
  getFirestore, doc, getDoc, setDoc,
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8HpKUFd3XJKWHHCGEu6Kxjj1KwPqEyFc",
  authDomain: "crwn-clothing-db-34929.firebaseapp.com",
  projectId: "crwn-clothing-db-34929",
  storageBucket: "crwn-clothing-db-34929.appspot.com",
  messagingSenderId: "482175797051",
  appId: "1:482175797051:web:b55cf19535fb760211d91e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  // check if user doc not exists in the collection
  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef
}
