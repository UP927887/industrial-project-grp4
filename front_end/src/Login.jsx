import React, {useState, useEffect} from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import { VideoLiveFeed } from './videofeed/VideoFeed';

// import "./App.css";
// import { dbConnect } from './database';
import axios from 'axios';

import "./App.css";

export default function Login() {


    const [isSubmitted, setIsSubmitted] = useState(false);

    const [usernameLog, setUsername] = useState('');
    const [passwordLog, setPassword] = useState('');

    // const errorM = document.getElementById('error');

    // console.log(errorM.innerText.length);x

    const loginfunc = (e) => {
        e.preventDefault();

        let errorMsg = document.querySelector('.error');

        const usernameElem = document.querySelector('.username');
        const passwordElem = document.querySelector('.password');
        // console.log("AHAHAH", usernameElem);

        [usernameElem, passwordElem].forEach(elem => {
            elem.addEventListener('click', function(){
                errorMsg.innerHTML = "";
            })
        });

        axios.post("http://localhost:3001/login", { // "https://aws-eu-west-2.connect.psdb.cloud:3306/login"
            usernameSub: usernameLog, 
            passwordSub: passwordLog}).then((response) => {
                if (response.data.length > 0) {
                    setIsSubmitted(true);
                } else {
                    setIsSubmitted(false);
                    errorMsg.innerHTML = "Incorrect username/password";

                }
            }).catch((error) => {
                console.log(error);
            });
    };


    useEffect(() => {
        const blurBackground = document.querySelector('.login-form');
        const forgotPassword = document.querySelector('.forgotPassword');
        const forgotPassBox = document.querySelector('.forgot-pass-container');
        const notClickableLoginButton = document.querySelector('.btn-login');
        const username = document.querySelector('.login-form.username');
        const password = document.querySelector('.login-form.password');
        
        const exitButton = document.querySelector('.exit');
        forgotPassBox.style.display = 'none';

        const blurContainers = () => {
            blurBackground.style.filter = 'blur(5px)';
            notClickableLoginButton.style.pointerEvents = 'none';
            forgotPassBox.style.display = 'block';
            username.disabled = true;
            password.disabled = true;
            forgotPassword.style.pointerEvents ='none';
        }
        const unBlurContainers = () => {
            blurBackground.style.filter = 'none';
            notClickableLoginButton.style.pointerEvents = 'auto';
            forgotPassBox.style.display = 'none';
            username.disabled = false;
            password.disabled = false;
            forgotPassword.style.pointerEvents ='auto';

        }
        exitButton.addEventListener('click', unBlurContainers);
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Escape' && forgotPassBox.style.display === 'block'){
                unBlurContainers();
            }
        });
        forgotPassword.addEventListener('click', blurContainers);

    }, []);

    const renderLoginForm = (

        <div htmlFor="login-form-container">
                <form className="login-form" onSubmit={loginfunc}>

                        <div>
                            <label type="username" htmlFor="username">Username</label>
                            <input
                                className='login-form username'
                                name="uname"
                                placeholder="Username"
                                type="uname" required
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                } } />
                        </div>
                        <div>
                            <label type="password" htmlFor="password">Password</label>
                            <input
                                className='login-form password'
                                name="pw"
                                placeholder='Password'
                                type="password" required
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                } } />
                        </div>

                        <div>
                            <p className="forgot-pw">Forgot your password? Click <a className="forgotPassword" href="#">here</a></p>
                        </div>

                        <div className="btn-wrapper">
                            <button className="btn-login" type="btn-shadow" /*onClick={loginfunc}*/>
                                LOGIN
                            </button>
                        </div>
                        <div className='error'></div>


                </form>
                    <div className='forgot-pass-container'>
                        <button className='exit'>X</button>
                        <label type="forgot-username">Please enter your username: </label>
                        <input
                            className="forgot-form username"
                            name="uname"
                            placeholder="Username"
                            type="forgot-input" required />
                        <div className="btn-wrapper">
                            <button className="btn-login" type="submit">SUBMIT</button>
                        </div> 
                    </div>
        </div>
    );

    return(
        <div className="login">
            <div className="login-form-container">
                {isSubmitted ? <VideoLiveFeed /> : renderLoginForm}
            </div>
        </div>
    );
}
