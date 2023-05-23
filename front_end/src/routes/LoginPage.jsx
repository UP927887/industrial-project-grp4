import { Login } from '../login/Login'
import "./styles/LoginPage.css";

export const LoginPage = () => {
    return (
        <div className="page">

            <div className="page-content">
                {/* <h1 className="login-title">Login</h1> */}

                <div className="login-container">
                    <Login />
                </div>
            </div>

        </div>
    );
}
