import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../contexts/AuthContext";

import './Styles/Portfolio.css'

const Portfolio = () => {

    const[crypto, setCrypto] = useState();
    const[loading, setLoading] = useState(false);

    const fetchData = async () => {
        const accountInfo = await axios.get(`http://localhost:5000/account/${currentUser.email}`)
        console.log(accountInfo.data.accountId);
        const { data } = await axios.get(`http://localhost:5000/position/${accountInfo.data.accountId}`);
        setCrypto(data);
    }
    const handleSell = async (id, entry, amount, pair) => {
        setLoading(true);
        console.log('Loading true')
        const { data } = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${pair}`) 
        const balance = await axios.get(`http://localhost:5000/account/${currentUser.email}`);
        const newBalance = parseFloat(((amount / entry) * data.lastPrice) + balance.data.balance).toFixed(2)
        try {
            await axios.delete(`http://localhost:5000/position/${balance.data.accountId}/${id}`)
            await axios.put("http://localhost:5000/account/update", {
                email: currentUser.email,
                balance: newBalance
            })
            
        } catch (error) {
            console.log(error);
        }
        console.log('Sell')
        setLoading(false);
    }

    const { currentUser } = useAuth();

    useEffect(() => {
        fetchData();
    }, [loading])
    return(
        <div className="container">
            <div className="wrapper">
                {crypto ? crypto.map((position) => (
                    <div key={position.id}>
                        <h2>Pair: {position.pair}</h2>
                        <p>Entry: {position.entry} Margin: ${position.amount} Amount: {parseFloat(position.amount / position.entry).toFixed(6)} BTC</p>
                        <button onClick={() => handleSell(position.id, position.entry, position.amount, position.pair)}>Sell</button>
                    </div>
                )) : <h2>Loading...</h2>}
            </div>
        </div>

    );
}

export default Portfolio;