import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import {
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  writeBatch, 
  query, 
  getDocs
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

// there can be multiple service provider instance - Google, Facebook, Twitter...
const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()   // can only have 1 authentication instance 
                                // keeps track of the authentication stage of entire app
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

// use this one-off function to import initial data to firestore 
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey)
  
  // to write a successful transaction (that contains multiple write to the db)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()
  console.log('done')
}


// Sample category object in firestore
/*
{
  hats: {
    title: 'Hats',
    items: [
      {
        id: 1,
        name: 'test',
        imageUrl: 'test.com',
        price: 10
      },
      {}
    ]
  },
  sneakers: {
    title: 'Sneakers',
    items: [
      {},
      {}
    ]
  }
}

*/

// retrieve category mapping from firestore and convert to an object
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)
  
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data())
  
  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   const {title, items} = docSnapshot.data()
  //   acc[title.toLowerCase()] = items
  //   return acc
  // }, {})

  // return categoryMap
}

// Get firebase authentication for user,
// then write user doc into collection in firestore 
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return 

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
        ...additionalInformation,
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef
}

// exporting helper functions 

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return 

  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => 
  onAuthStateChanged(auth, callback)
