import React, { useState } from 'react';
 import * as usersService from '../utilities/users-service';
import {signUp, login} from '../utilities/users-service'

export default function LoginForm({ setUser }) {
const [credentials, setCredentials] = useState({
  email: '',
  password: ''
});

const [error, setError] = useState('');

function handleChange(evt) {
  setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
  setError('');
}

async function handleSubmit(evt) {
  // Prevent form from being submitted to the server
  evt.preventDefault();
  try {
    // The promise returned by the signUp service method
    // will resolve to the user object included in the
    // payload of the JSON Web Token (JWT)
    const user = await usersService.login(credentials);
    setUser(user);
  } catch {
    setError('Log In Failed - Try Again');
  }
}


// const LoginForm = ({setUser}) => {
//   const [credentials, setCredentials] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirm: "",
//     error: "",
//   });

//   const handleChange = (evt) => {
//     setCredentials({
//       ...credentials,
//       [evt.target.name]: evt.target.value,
//       error: "",
//     });
//   };

//   const handleSubmit = async (evt) => {
//     evt.preventDefault();

//     try {
//       // Remove 'error' and 'confirm' properties before sending the data
//       const { error, confirm, ...dataToSend } = credentials;

//       const user = await login(dataToSend);
//       setUser(user);
//       console.log(user);
//     } catch {
//       setCredentials({ ...credentials, error: "Sign Up Failed - Try Again" });
//     }
//   };


return (
  <div>
     <h1>Log In Form</h1>
    <div className="form-container">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" name="email" value={credentials.email} onChange={handleChange} required />
        <label>Password</label>
        <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
        <button type="submit">LOG IN</button>
      </form>
    </div>
    <p className="error-message">&nbsp;{error}</p>
  </div>
);
}
// export default LoginForm;