import React, {useState} from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import { VideoLiveFeed } from './videofeed/VideoFeed';

// import "./App.css";
// import { dbConnect } from './database';
import axios from 'axios';
// import loginCreds from "dbConnect.py";

import "./App.css";

export default function Login() {

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [usernameLog, setUsername] = useState('');
    const [passwordLog, setPassword] = useState('');

    const loginfunc = (e) => {
        e.preventDefault();
        
        axios.post("http://127.0.0.1:5000/login", {
            username: usernameLog, 
            password: passwordLog}).then((response) => {
                console.log(response);
                if (response.data.message === 'True') {
                    setIsSubmitted(true);
                } else {
                    setIsSubmitted(false);
                }
            }).catch((error) => {
                console.log(error);
            });

        // axios.post("aws.connect.psdb.cloud/login"/*"http://localhost:3001/login"*/, {
        //     usernameSub: usernameLog, 
        //     passwordSub: passwordLog}, {withCredentials: true}).then((response) => {
        //         if (response.data.length > 0) {
        //             setIsSubmitted(true);
        //         } else {
        //             setIsSubmitted(false);
        //         }
        //     }).catch((error) => {
        //         console.log(error);
        //     });

        
    };
    
    const renderLoginForm = (
        <div htmlFor="login-form-container">
            <form onSubmit={loginfunc}>
                <fieldset htmlFor="login-form">
                    <div>
                        <label htmlFor="username">Username</label>
                        <input 
                            id = "username" 
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
                            id = "password" 
                            name = "pw" 
                            type = "password" required
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </div>

                    <div>
                        <button type="submit" /*onClick={loginfunc}*/>
                            Submit
                        </button>
                    </div>
                </fieldset>
            </form>
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
