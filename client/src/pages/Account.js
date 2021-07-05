import React, { useState, useEffect } from "react";
import { Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

import './Styles/Account.css';
import axios from "axios";



const Account = () => {
    const[error, setError] = useState('');
    const[account, setAccount] = useState();
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    const getAccount = async() =>{
        const { data } = await axios.get(`http://localhost:5000/account/${currentUser.email}`);
        setAccount(data);
    }

    const handleLogout = async () => {
        setError("")

        try {
          await logout()
          history.push("/")
        } catch {
          setError("Failed to log out")
        }
    } 
    useEffect(() => {
        getAccount();
    }, [])
    return(
        <div className="account-container">
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email: </strong>{currentUser.email}<br/>
                    <strong>ID: </strong>{account.accountId}<br/>
                    <strong>Balance: $</strong>{account.balance}<br/>
                    <Link to="/update" className="btn btn-primary w-100 mt-3">Update profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <button onClick={handleLogout}>Log out</button>
            </div>
        </div>
    )
}

export default Account;