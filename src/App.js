import { Fragment, useState } from 'react';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

const DUMMY_USERS = [
  {
    id: 'e1',
    name: 'Vishakha',
    lastName: 'Sahu',
    email: 'vish@gmail.com',
    pass: 'vish'
  },
  {
    id: 'e2',
    name: 'Kiran',
    lastName: 'Sahu',
    email: 'kiran@gmail.com',
    pass: 'kiran'
  },
  {
    id: 'e3',
    name: 'Mohit',
    lastName: 'Sharma',
    email: 'mohit@gmail.com',
    pass: 'mohit'
  }
];

function App() {
  const [dummyUsers, setDummyUsers] = useState(DUMMY_USERS);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const loginHandler = () => {
    setIsUserLoggedIn(true);
  }

  const signUpInsideLoginHandler = () => {
    setIsUserRegistered(true);
    setIsUserLoggedIn(true);
    setShowLogin(false);
  }

  const loginInsideRegister = () => {
    setShowLogin(true);
  }

  const userRegisteredHandler = async (newUserData) => {
    // setDummyUsers((prevusers) => {
    //   return [newUserData, ...prevusers];
    // })
    await fetch('https://login-signup-portfolio-default-rtdb.firebaseio.com/Users.json', {
      method: 'POST',
      body: JSON.stringify({
        user: newUserData,
      })
    });
  }

  return (
    <Fragment>
      {showLogin && <Login onSignUp={signUpInsideLoginHandler} userLoggedIn={isUserLoggedIn} users={dummyUsers} />}
      {!showLogin && <SignUp userSignedUp={isUserRegistered} onLoginInsideRegister={loginInsideRegister} onUserRegistration={userRegisteredHandler} />}
    </Fragment>
  );
}

export default App;
