import React, {useState, useEffect} from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import { VideoLiveFeed } from '../videofeed/VideoFeed';

// import "./App.css";
// import { dbConnect } from './database';
import axios from 'axios';

import eyecon from '../images/eye-solid.svg'
import noEyecon from '../images/eye-slash-solid.svg'
import logo from '../images/colas_logo.png'

import "./Login.css";

export const Login = () => {


    const [isSubmitted, setIsSubmitted] = useState(false);

    const [usernameLog, setUsername] = useState('');
    const [passwordLog, setPassword] = useState('');

    const [seePw, setTogglePw] = useState(false);

    // const errorM = document.getElementById('error');

    // console.log(errorM.innerText.length);x

    const togglePwVisibility = () => {
        setTogglePw(seePw ? false : true)
    };

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
        const username = document.querySelector('.username');
        const password = document.querySelector('.password');
        const imageSelector = document.querySelector('.banner');
        // const body = document.querySelector('body');
        // const children = body.querySelectorAll(':scope > :not(.forgot-pass-container)');

        // IMPORTANT NOTE: TRY TO USE THE QUERYSELECTORALL TO SELECT ALL THE CHILDREN OF THE BODY ELEMENT. helps reduce lines of code when trying to blur
        
        const exitButton = document.querySelector('.exit');
        forgotPassBox.style.display = 'none';

        const blurContainers = () => {
            // for(let i = 0; i < children.length; i++){
            //     children[i].style.filter = 'blur(5px)';
            // }
            // document.querySelectorAll('body >*:not(.forgot-pass-container)').forEach(e => e.style.filter = "blur(2px)");
            imageSelector.style.filter = "blur(5px)";
            blurBackground.style.filter = 'blur(5px)';
            notClickableLoginButton.style.pointerEvents = 'none';
            forgotPassBox.style.display = 'block';
            username.disabled = true;
            password.disabled = true;
            forgotPassword.style.pointerEvents ='none';
        }
        const unBlurContainers = () => {
            imageSelector.style.filter = 'none';
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

            <div className="banner">
                <img 
                className='logo'
                src={logo}
                alt="colas_logo"
                />
            </div>

                <form className="login-form" onSubmit={loginfunc}>

                        <div>
                            <label type="username" htmlFor="username"/>
                            <input
                                className="login-form username"
                                name="uname"
                                placeholder="Username"
                                type="uname" required
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                } } />
                        </div>
                        <div>
                            <label type="password" htmlFor="password"/>

                            <input
                                className="login-form password"
                                name="pw"
                                placeholder='Password'
                                type={seePw ? "text":"password"} required
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                } } />

                            <img 
                            className='eye-icon'
                            onClick={togglePwVisibility}
                            src={seePw ? eyecon:noEyecon}
                            alt="eyecon"
                            />

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
                        <div className="forgot-inp-wrapper">
                            <input
                                className="forgot-form username"
                                name="uname"
                                placeholder="Username"
                                type="forgot-input" required />
                        </div>
                        <div className="btn-wrapper">
                            <button className="btn-login" type="submit">SUBMIT</button>
                        </div> 
                    </div>

        </div>
    );

    return(
        <div className="login">
            {isSubmitted ? <VideoLiveFeed /> : renderLoginForm}
        </div>
    );
}
