import { useState } from 'react';
import Home from './Home';
import './Login.css';

const Login = (props) => {
    const [showHomePage, setShowHomePage] = useState(false);
    const [credentialNotMatch, setCredentialNotMatch] = useState(false);

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPass, setEnteredPass] = useState('');

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
        setCredentialNotMatch(false);
    }

    const passChangeHandler = (event) => {
        setEnteredPass(event.target.value);
        setCredentialNotMatch(false);
    }

    const onLoginClickHandler = async (event) => {
        const response = await fetch('https://login-signup-portfolio-default-rtdb.firebaseio.com/Users.json');
        const responseData = await response.json();
        const loadedUsers = [];

        for (const i in responseData) {
            loadedUsers.push({
                id: i,
                name: responseData[i].user.name,
                lastName: responseData[i].user.lastName,
                email: responseData[i].user.email,
                password: responseData[i].user.pass
            });
        }
        console.log(loadedUsers, ' user data ');

        for (const em in loadedUsers) {
            if (enteredEmail === loadedUsers[em].email) {
                console.log('email authenticated');
                if (enteredPass === loadedUsers[em].password) {
                    console.log('User Authenticated');
                    setShowHomePage(true);
                    return;
                }
                else {
                    console.log('Invalid password');
                    setCredentialNotMatch(true);
                    setShowHomePage(false);
                }
            }
            else {
                setCredentialNotMatch(true);
            }
        }
    };

    return (
        <div className="container" >
            {!showHomePage &&
                <div className={credentialNotMatch && 'loginfailed'}>
                    <div class="top"></div>
                    <div class="bottom"></div>
                    <div class="center">
                        <h2>Please Log In</h2>
                        {credentialNotMatch && <p className='color-it-red'>Please enter valid email and password combination</p>}
                        <input className='color-black' type="email" placeholder="email" onChange={emailChangeHandler} />
                        <input className='color-black' type="password" placeholder="password" onChange={passChangeHandler} />
                        <div className='buttons'>
                            <button className='login-btn btn-success' onClick={onLoginClickHandler} >Login</button>
                            <button className='signup-btn btn-success' onClick={props.onSignUp} >SignUp</button>
                        </div>
                    </div>
                </div>}
            {showHomePage && <Home />}
        </div>
    );
};

export default Login;
