import { useState } from "react"
import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"

import { 
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils"

const defaultFormFields = {
  email: '',
  password: '',
}

import './sign-in-form.styles.scss'

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {email, password} = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    // Get firebase authentication for google sign in
    const { user } = await signInWithGooglePopup()
    // write user doc into collection in firestore 
    await createUserDocumentFromAuth(user)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      // sign in user profile with email and password in firebase authentication
      const response = await signInAuthUserWithEmailAndPassword(email, password)
      console.log(response)

      // await createUserDocumentFromAuth(response.user)

      resetFormFields()

    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email')
          break
        case 'auth/user-not-found':
          alert('no user assocated with this email')
          break
        default: 
          console.log(error)
      }
    }
  }

  const handleChange = (event) => {
    setFormFields({ 
      ...formFields,
      [event.target.name]: event.target.value 
    })
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        
        <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email} />

        <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password} />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
