import { useState } from 'react';
import Home from './Home';
import './Login.css';

const Login = (props) => {
    const [showHomePage, setShowHomePage] = useState(false);
    const [credentialsMatched, setCredentialsMatched] = useState(false);

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPass, setEnteredPass] = useState('');

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
        setCredentialsMatched(false);
    }

    const passChangeHandler = (event) => {
        setEnteredPass(event.target.value);
        setCredentialsMatched(false);
    }

    const onLoginClickHandler = (event) => {
        const emailsInDB = props.users.map(user => user.email);
        const passInDB = props.users.map(user => user.pass);
        for (const e of emailsInDB) {
            if (e === enteredEmail) {
                console.log(enteredEmail, 'Login succesful');
                setShowHomePage(true);
                return;
            }
        }
        for (const p of passInDB) {
            if (p === enteredPass) {
                setShowHomePage(true);
                return;
            }
        }

        //If credentials r not valid credentials:
        setShowHomePage(false);
        setCredentialsMatched(true);
    };

    return (
        <div className="container" >
            {!showHomePage &&
                <div className={credentialsMatched && 'loginfailed'}>
                    <div class="top"></div>
                    <div class="bottom"></div>
                    <div class="center">
                        <h2>Please Log In</h2>
                        {credentialsMatched && <p className='color-it-red'>Please enter valid email and password combination</p>}
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
