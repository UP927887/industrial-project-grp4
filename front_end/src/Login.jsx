export const Login = () => {
    return (
        <div className="login-form-container">
            <form className="login-form">
                <fieldset>
                    <div>
                        <label for="username">Username</label>
                        <input 
                            id = "username" 
                            name = "username" 
                            type = "text" required
                        />
                    </div>

                    <div>
                        <label for="password">Password</label>
                        <input 
                            id = "password" 
                            name = "password" 
                            type = "text" required
                        />
                    </div>

                    <div>
                        <button type="submit">
                            Submit 
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>

        // <>Login</>
    )
}