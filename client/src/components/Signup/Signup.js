import React, { useEffect, useState, useRef } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from 'react-router-dom';

import './Signup.css'

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const[loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if( passwordRef.current.value !== passwordConfirmRef.current.value) return setError('Passwords do not match');
        if(passwordRef.current.value.length < 6) return setError("Password is too short");

        try {
            setError('')
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push("/trade")
        } catch (error) {
            setError('Failed to create account');
        }
        setLoading(false);
        
    }

    return(
        <div className="signup-container">
            <div  className="signup-card-container">
                <Card className="card-container dark">
                    <Card.Body className="card-body">
                        <h2>Sign up</h2>
                        <div className="form-tab">
                            <a className="login-tab" href="/login">Login</a>
                            <span className="signup-tab">Signup</span>
                        </div>
                        {error && <Alert variant="danger" className="signup-error">{error}</Alert>}
                        <Form onSubmit={handleSubmit} className="card-form" autoComplete="none">
                            <Form.Group id="email" className="card-form-group">
                                <Form.Control type="email" ref={emailRef} required placeholder="Email address" className="card-inputs" autoComplete="none"/>
                            </Form.Group>
                            <Form.Group id="password" className="card-form-group">
                                <Form.Control type="password" ref={passwordRef} required placeholder="Password" className="card-inputs" autoComplete="none"/>
                            </Form.Group>
                            <Form.Group id="password-confirm" className="card-form-group">
                                <Form.Control type="password" ref={passwordConfirmRef} required placeholder="Confirm password" className="card-inputs"/>
                            </Form.Group>
                            <span className="note">Password must be at least 6 letters.</span>
                            <Button disabled={loading} type="submit" className="submit-button signup" id="signup">Sign up</Button>
                        </Form>
                    </Card.Body><br />
                    <p className="account-signup">Already have an account? <Link to="/login" className="card-link">Log in.</Link></p>
                </Card>
            </div>
        </div>
    )
}

export default Signup;

