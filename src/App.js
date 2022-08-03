import { Fragment, useState } from 'react';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

function App() {
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const signUpInsideLoginHandler = () => {
    setIsUserRegistered(true);
    setIsUserLoggedIn(true);
    setShowLogin(false);
  }

  const loginInsideRegister = () => {
    setShowLogin(true);
  }

  const userRegisteredHandler = async (newUserData) => {
    await fetch('https://login-signup-portfolio-default-rtdb.firebaseio.com/Users.json', {
      method: 'POST',
      body: JSON.stringify({
        user: newUserData,
      })
    });
  }

  return (
    <Fragment>
      {showLogin && <Login onSignUp={signUpInsideLoginHandler} userLoggedIn={isUserLoggedIn} />}
      {!showLogin && <SignUp userSignedUp={isUserRegistered} onLoginInsideRegister={loginInsideRegister} onUserRegistration={userRegisteredHandler} />}
    </Fragment>
  );
}

export default App;
