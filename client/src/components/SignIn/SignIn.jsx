import { useState } from 'react';

import FormInput from '../FormInput/FormInput';

import CustomButton from '../CustomButton/CustomButton';

import { auth, signInWithGoogle } from '../../Firebase/FirebaseUtils';

import { ButtonsBarContainer, SignInContainer, SignInTitle } from './SignInStyles';

const SignIn = () =>  {

  const [userCredentials, setUserCredentials] = useState({email: '', password: ''});

  const {email, password} = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setUserCredentials({ email: '', password: '' });
    } catch (error) {
      console.log(error);
    }

  };
  
  const handleChange = event => {
    const { value, name } = event.target;
  
    setUserCredentials({...userCredentials, [name]: value });
  };
  
  return (
    <SignInContainer>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          handleChange={handleChange}
          value={email}
          label='email'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={password}
          handleChange={handleChange}
          label='password'
          required
        />
        <ButtonsBarContainer>
          <CustomButton type='submit'> Sign in </CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </ButtonsBarContainer>
      </form>
    </SignInContainer>
 );
}
  
export default SignIn;