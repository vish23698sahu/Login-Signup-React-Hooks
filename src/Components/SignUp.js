import { useState } from 'react';
import './SignUp.css'

const SignUp = (props) => {
    const [isSignedUp, setIsSignedUp] = useState(props.userSignedUp);

    const [enteredName, setEnteredName] = useState('');
    const [enteredLastName, setEnteredLastName] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPass, setEnteredPass] = useState('');
    const [userEmpty, setUserEmpty] = useState(false);

    const onNameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    }

    const onLastNameChangeHandler = (event) => {
        setEnteredLastName(event.target.value);
    }

    const onEmailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    }

    const onPassChangeHandler = (event) => {
        setEnteredPass(event.target.value);
    }

    const onRegisterHandler = () => {
        if (enteredName === '' || enteredLastName === '' || enteredEmail === '' || enteredPass === '') {
            setIsSignedUp(true);
            setUserEmpty(true);
            return;
        }

        const newUser = {
            name: enteredName,
            lastName: enteredLastName,
            email: enteredEmail,
            pass: enteredPass
        };
        props.onUserRegistration(newUser);
        setIsSignedUp(false);
    }

    return (
        <div class="container" >
            {isSignedUp &&
                <div> <div class="top"></div>
                    <div class="bottom"></div>
                    <div class="center">
                        <h2>Lets Sign You Up!</h2>
                        {userEmpty && <h4 className='color-it-red'>Please enter valid user details.</h4>}
                        <input className='color-black' type="text" placeholder="First Name" onChange={onNameChangeHandler} />
                        <input className='color-black' type="text" placeholder="Last Name" onChange={onLastNameChangeHandler} />
                        <input className='color-black' type="email" placeholder="email" onChange={onEmailChangeHandler} />
                        <input className='color-black' type="password" placeholder="password" onChange={onPassChangeHandler} />
                        <div className='buttons'>
                            <button className='signup-btn btn-success' onClick={onRegisterHandler}>Register</button>
                        </div>
                    </div>
                </div>
            }
            {!isSignedUp &&
                <h5>User Signed Up Successfully. Go To
                    <button className='login-btn btn-success' onClick={props.onLoginInsideRegister}>Login</button>
                </h5>}
        </div>
    );
};

export default SignUp;
