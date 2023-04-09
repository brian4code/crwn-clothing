import { useEffect } from 'react'
import { getRedirectResult } from 'firebase/auth'
import FormInput from '../../components/form-input/form-input.component'

import { 
  auth,
  signInWithGooglePopup, 
  createUserDocumentFromAuth 
} from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import SignInForm from '../../components/sign-in-form/sign-in-form.component'

import './authentication.styles.scss'

const Authentication = () => {

  // to keep track of the auth stage when come back from redirect 
  // useEffect(async () => {
  //   const response = await getRedirectResult(auth)

  //   // write user doc into collection in firestore 
  //   if (response) {
  //     const userDocRef = await createUserDocumentFromAuth(response.user)
  //   }
  // }, [])


  return (
    <div className='authentication-container'>
      <SignInForm />
      <SignUpForm />

      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
    </div>
  )
}

export default Authentication
