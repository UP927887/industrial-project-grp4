import React, {useState} from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';

import "./App.css";

export default function Login() {

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [usernameLog, setUsername] = useState('');
    const [passwordLog, setPassword] = useState('');

    const loginfunc = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3001/login", { // "https://aws-eu-west-2.connect.psdb.cloud:3306/login"
            usernameSub: usernameLog, 
            passwordSub: passwordLog}).then((response) => {
                if (response.data.length > 0) {
                    setIsSubmitted(true);
                } else {
                    setIsSubmitted(false);
                }
            }).catch((error) => {
                console.log(error);
            });
    };
    
    const renderLoginForm = (
        <div htmlFor="login-form-container">
            <form onSubmit={loginfunc}>
                <fieldset
                htmlFor="login-form"
                >
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

    return (
        <div>
          <div className="login-form-container">
            <div className="title">Login</div>
            {isSubmitted ? <a href='./VideoFeed.jsx'>l</a> : renderLoginForm}
          </div>
        </div>
    );
}
