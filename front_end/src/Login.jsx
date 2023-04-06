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

        let errorMsg = document.querySelector('.error');

        const usernameElem = document.querySelector('.username');
        const passwordElem = document.querySelector('.password');
        // console.log("AHAHAH", usernameElem);
        errorMsg.innerHTML+="HELLO";

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

    const renderLoginForm = (
        <div htmlFor="login-form-container">
            <form className="login-form" onSubmit={loginfunc}>
                <fieldset
                htmlFor="login-form"
                >
                    <div>
                        <label type="username" htmlFor="username">Username</label>
                        <input 
                            className = "login-form username" 
                            name = "uname" 
                            placeholder = "something@pcc.co.uk"
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
            <div className='error'></div>
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
