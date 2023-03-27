import React, {useState} from 'react';
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

    // console.log(errorM.innerText.length);

    const loginfunc = (e) => {
        e.preventDefault();

        let errorMsg = document.getElementsByClassName('error');

        const usernameElem = document.getElementsByClassName('username');
        const passwordElem = document.getElementsByClassName('password');

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
    // const deleteErrorMessage = () => {
    //     let errorMsg = document.getElementById('username');
    //     if (errorMsg) {
    //         errorMsg.addEventListener('focus', function(){
    //             errorMsg.innerHTML = "";
    //         });
    //     }
    // };
    // deleteErrorMessage();

    const renderLoginForm = (
        <div htmlFor="login-form-container">
            <form class="login-form" onSubmit={loginfunc}>
                <fieldset
                htmlFor="login-form"
                >
                    <div>
                        <label htmlFor="username">Username</label>
                        <input 
                            className = "login-form username" 
                            name = "uname" 
                            type = "text" required
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />
                    </div>

                    <div>
                        <label type="password" htmlFor="password">Password</label>
                        <input 
                            className = "login-form password" 
                            name = "pw" 
                            type = "password" required
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </div>

                    <div>
                        <button className="btn-login" type="submit" /*onClick={loginfunc}*/>
                            Login
                        </button>
                    </div>
                </fieldset>
            </form>
            <div id='error'></div>
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
