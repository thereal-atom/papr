import React, { useEffect, useState, useRef } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from 'react-router-dom';

import './Login.css';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const[loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('')
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/trade")
        } catch (error) {
            setError('Failed to log in');
        }
        setLoading(false);
        
    }

    return(
        <div className="signup-container">
            <div  className="signup-card-container">
                <Card className="card-container dark">
                    <Card.Body className="card-body">
                        <h2>Login</h2>
                        <div className="form-tab">
                            <a className="signup-tab">Login</a>
                            <a className="login-tab" href="/signup">Signup</a>
                        </div>
                        {error && <Alert variant="danger" className="login-error">{error}</Alert>}
                        <Form onSubmit={handleSubmit} className="card-form">
                            <Form.Group id="email" className="card-form-group">
                                <Form.Control type="email" ref={emailRef} required placeholder="Email address" className="card-inputs"/>
                            </Form.Group>
                            <Form.Group id="password" className="card-form-group">
                                <Form.Control type="password" ref={passwordRef} required placeholder="Password" className="card-inputs"/>
                            </Form.Group>
                            <span className="note">Password must be at least 6 letters.</span>
                            <div className="reset-password">
                                <Link to="/reset" className="card-link"><p>Forgot password?</p></Link>
                            </div>
                            <Button disabled={loading} className="card-form-group" type="submit" className="submit-button" id="login">Login</Button>
                        </Form>
                    </Card.Body><br />
                    <p className="account-login">Dont have an account? <Link to="/signup" className="card-link">Sign up.</Link></p>
                </Card>
            </div>
        </div>
    )
}

export default Login;