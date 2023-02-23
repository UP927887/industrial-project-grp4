import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import "./App.css";

export default function Login() {

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const dummyLogin = [{
        username: "presh",
        password: "abc123"
    }];

    const errors = {
        uname: "invalid username",
        pw: "invalid password"
    };

    const handleSumbit = (event) => {
        //page does not reload
        event.preventDefault();
    
        var {uname,pw} = document.forms[0];
    
        //Find user info
        const userData = dummyLogin.find((user) => user.username === uname.value);
    
        //Compare data
        if (userData) {
            if (userData.password !== pw.value) {
                //invalid password
                setErrorMessages({ name: "pw", message: errors.pw});
            } else {
                setIsSubmitted(true);
            }
        } else {
            //Invalid username
            setErrorMessages({name: "uname", message: errors.uname});
        }
    };
    
    //error messages for username and password
    const renderErrorMessages = (name) => 

        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );
    

    const renderLoginForm = (
        <div className="login-form-container">
            <form 
            onSubmit={handleSumbit}
            >
                <fieldset
                className="login-form"
                >
                    <div>
                        <label for="username">Username</label>
                        <input 
                            id = "username" 
                            name = "uname" 
                            type = "text" required
                        />
                        {renderErrorMessages("uname")}
                    </div>

                    <div>
                        <label for="password">Password</label>
                        <input 
                            id = "password" 
                            name = "pw" 
                            type = "password" required
                        />
                        {renderErrorMessages("pw")}
                    </div>

                    <div>
                        <button 
                        type="submit"
                        >
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
                <div className="title">Login</div>
                {isSubmitted ? <div>User successfully logged in</div> : renderLoginForm}
            </div>
        </div>
    )

}
