import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  console.log(formFields);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(email, password);

      await createUserDocumentFromAuth(user, {displayName});

    } catch (error) {
      console.log('user creation encountered an error', error);
    }
  };

  // on changehandler for each event
  const handleChange = (event) => {
    const { name, value } = event.target;
    // spread in this object and modify one value on this object
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1>Sign up with email and password</h1>
      <form onSubmit={() => {}}>
        <label>Display Name</label>
        <input
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />

        <label>Email</label>
        <input
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <label>Password</label>
        <input
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />

        <label>Confirm Password</label>
        <input
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
