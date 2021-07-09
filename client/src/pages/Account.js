import React, { useState, useEffect, useRef } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Doughnut } from 'react-chartjs-2';

import './Styles/Account.css';
import axios from "axios";



const Account = ({marketList}) => {
    const[list, setList] = useState();
    const[error, setError] = useState('');
    const[account, setAccount] = useState();
    const[loading, setLoading] = useState(false);
    const[openPositions, setOpenPoisitions] = useState([]);
    const[balance, setBalance] = useState();

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const history = useHistory();    
    const { currentUser, updatePassword, updateEmail, logout } = useAuth();

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
    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Passwords do not match")
        }
    
        const promises = []
        setLoading(true)
        setError("")
    
        if (emailRef.current.value !== currentUser.email) {
          promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
          promises.push(updatePassword(passwordRef.current.value))
        }
    
        Promise.all(promises)
        .then(() => {
            history.push("/account")
        })
        .catch(() => {
            if(!passwordRef.current.value.length < 6) setError("Password is too short") 
            else{
                setError("Failed to update account")
            }
        })
        .finally(() => {
            setLoading(false)
        })
    }
    const handleSell = async (id, amount, pair) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${pair}`) 
            const balance = await axios.get(`http://localhost:5000/account/${currentUser.email}`);
            const newBalance = parseFloat((amount * data.lastPrice) + balance.data.balance).toFixed(2)
            await axios.delete(`http://localhost:5000/position/${balance.data.accountId}/${id}`)
            await axios.put("http://localhost:5000/account/update", {
                email: currentUser.email,
                balance: newBalance
            })
            console.log('Succesfully sold')
        } catch (error) {
            console.log(error);
        }
        setLoading(false);

    }
    const fetchPositions = async () => {
        const { data } = await axios.get(`http://localhost:5000/account/${currentUser.email}`);
        const positions = await axios.get(`http://localhost:5000/position/${data.accountId}`);
        setOpenPoisitions(positions.data);
    }
    const getTotalBalance = () => {
        if(account && openPositions && list) {
            let accountBalance = account.balance;
            openPositions.map(position => {
                list.map(ticker => {
                    if(ticker.symbol == position.pair){
                        accountBalance = (parseFloat(position.margin - (((position.amount * position.entry) - (position.amount * ticker.lastPrice)) * position.leverage)).toFixed(2) * 1000 + parseFloat(accountBalance).toFixed(2) * 1000) / 1000;
                    }
                })
            })
            setBalance(parseFloat(accountBalance).toFixed(2));
        }
    }
    useEffect(() => {
        fetchPositions();
        getAccount();
        getTotalBalance();
        setList(marketList)
    }, [marketList])
    
    return(
        account && openPositions && balance && currentUser ? 
        <div className="account-container">
            <div className="account-bar">
                <div className="account-bar-info">
                    <div className="account-avatar">
                        <img src="https://cdn.discordapp.com/avatars/810934820297375804/20c81c5108d60b5128adbf4447b0bbde.webp" alt="Avatar" />
                    </div>
                    <div className="account-text">
                        <div className="account-username">Atom</div>
                        <div className="account-email-address">{currentUser.email}</div>
                        <div className="account-id">User ID: {<p className="account-id-text">{account.accountId}</p>}</div>
                    </div>
                </div>
                <div className="account-bar-reset">
                    <button className="reset-account">Reset account</button>
                    <button className="delete-account">Delete account</button>
                </div>
            </div>
            <div className="holdings-update-box">
                <div className="holdings-box">
                    Holdings
                    <div className="holdings-wrapper">
                        <div className="holdings-info">
                            <p>Account balance:</p>
                            <p className="holdings-amount">${balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                            <p className="available-title">Available:</p>
                            <p className="holdings-amount available">${account.balance}</p>
                        </div>
                        <div className="doughnut">
                            <div className="doughtnut-data">
                                <Doughnut data={{datasets: [{
                                        data: [6856, 5250, 477, 896, 4236],
                                        backgroundColor: [
                                            '#aaa',
                                            '#ffcc00',
                                            '#00aeff',
                                            '#ffee00',
                                            '#11ff00',
                                        ],
                                            hoverOffset: 4
                                        }]
                                    }}
                                    options={{
                                        cutout: 120,
                                        radius: 100,
                                    }}
                                />
                            </div>
                            <div className="holdings-small-info">
                                <div className="holding"><i class='bx bxs-checkbox' id="grey"></i> USDT: 6,856.47</div>
                                <div className="holding"><i class='bx bxs-checkbox' id="orange"></i> BTC: 0.15</div>
                                <div className="holding"><i class='bx bxs-checkbox' id="blue"></i> LTC: 3.67</div>
                                <div className="holding"><i class='bx bxs-checkbox' id="yellow"></i> DOGE: 4270.94</div>
                                <div className="holding"><i class='bx bxs-checkbox' id="green"></i> ETH: 1.94</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="update-box">
                    <p>Profile</p>
                    <span>Username</span>
                    <input type="text" placeholder="Atom"/>
                    <span>Email</span>
                    <input type="email" placeholder={currentUser.email}/>
                    <span>Password</span>
                    <input type="text" placeholder="********"/>
                    <div className="update-button-container">
                        <button className="account-update-button">Update</button>
                    </div>
                </div>
            </div>
            <div className="open-positions">
                <table className="open_positions-table">
                    <thead>
                        <tr>
                            <th className="position__symbol-head">Symbol</th>
                            <th className="position__size-head">Size</th>
                            <th className="nah">Entry Price</th>
                            <th className="position__price-head">Price</th>
                            <th className="position__entry-margin-head">Entry Margin</th>
                            <th className="position__margin-head">Margin</th>
                            <th className="position__pnl-head">PNL(ROE %)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {openPositions.map(position => (
                                
                                    list.map(ticker => (
                                        ticker.symbol == position.pair ? (
                                                <tr>
                                                <td className="position__symbol">{position.pair} <span className="multiplier">{position.leverage}x</span></td>
                                                <td className="position__size">{(position.margin * position.leverage).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} USDT</td>
                                                <td className="position__entry-price">{position.entry.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                                <td className="position__price grey">{ticker.lastPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                                <td className="position__entry-margin">{position.margin} USDT</td>
                                                <td className={`position__margin grey`}>{parseFloat(position.margin - (((position.amount * position.entry) - (position.amount * ticker.lastPrice)) * position.leverage)).toFixed(2)} USDT</td>
                                                <td className={`position__pnl ${position.margin < parseFloat(position.amount * ticker.lastPrice).toFixed(2) ? 'green' : 'red'}`}>{position.margin > parseFloat(position.amount * ticker.lastPrice).toFixed(2) ? '' : '+'}{(parseFloat((position.amount * ticker.lastPrice - position.margin)  * position.leverage).toFixed(2))}USDT({(((position.amount * ticker.lastPrice) - position.margin) * (10/position.margin)) > 0 ? '+' : ''}{parseFloat((((position.amount * ticker.lastPrice) - position.margin) * (100/position.margin)) * position.leverage).toFixed(2)}%)</td>
                                                <td className="position__close"><button onClick={() => handleSell(position.id, position.amount, position.pair)}>Close</button></td>
                                            </tr>
                                        ) : ''
                                    ))
                                    
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <div className="account-wrapper">
                <div className="account-info">
                    <Card>
                        {account ?<Card.Body>
                            <h2 className="text-center mb-4">Profile</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <div className="account-information">
                                <div className="account-avatar">
                                </div>
                                <div className="account-text">
                                    Atom<span className="account-id">({account.accountId})</span><br/>
                                    {currentUser.email}<br/>
                                    Balance: <span className="account-id">${account.balance}</span><br/>
                                </div>
                            </div>
                        </Card.Body> : ''}
                        <button onClick={handleLogout}>Log out</button>
                    </Card>
                </div>
                <div className="account-update">
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Update profile</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required defaultvalue={currentUser.email}/>
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} placeholder="Leave password to keep the same"/>
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave password to keep the same"/>
                                </Form.Group>
                                <Button disabled={loading} className="w-100" type="submit">Update</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div> */}
            
        </div> : ''
    );
};

export default Account;