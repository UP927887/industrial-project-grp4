import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    function formValidate() {
        return email.length > 0 && pw.length > 0;
    }

    function handleSubmit(event){
        event.preventDefault();
    }
    return(
        <div className = "Login">
            <Form onSubmit = {handleSubmit}>
                <Form.Group size="ig" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    autofocus 
                    type = "email" 
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group size="Ig" controlId="pw">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type = "pw"
                    value = {pw}
                    onChange = {(e) => setPw(e.target.value)}
                    />
                </Form.Group>

                <Button block size="Ig" type="submit" disabled = {!formValidate()}>
                    Login
                </Button>
            </Form>
        </div>
    );
}