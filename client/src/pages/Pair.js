import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './Styles/Pair.css'  
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { useAuth } from "../contexts/AuthContext";
  
const Pair = () => {
    const[margin, setMargin] = useState();
    const[type, setType] = useState('long');
    const[status, setStatus] = useState();
    const[percent, setPercent] = useState(0);
    const[account, setAccount] = useState(0);
    const[loading, setLoading] = useState(false);
    const[openPositions, setOpenPoisitions] = useState([]);

    const { currentUser } = useAuth();

    useEffect(() => {
        handleExist();
    }, [margin, loading])


    const handleExist = async () => {
        const { status } = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${pair}`);
        const { data } = await axios.get(`http://localhost:5000/account/${currentUser.email}`);
        const positions = await axios.get(`http://localhost:5000/position/${data.accountId}`);
        setOpenPoisitions(positions.data);
        setAccount(data.balance);
        setStatus(status);
        if(openPositions) console.log(openPositions);
    }
    const handleType = (e) => {
        setType(e.target.value);
    }
    const handlePercent = (e) => {
        setPercent(e.target.value);
        console.log(`Percent: ${e.target.value}`)
        console.log(`Set percent: ${percent}`)
        setMargin(parseFloat(parseFloat(account).toFixed(2) * (percent * 1 + 1 * 1)/100).toFixed(2))
    } 
    const handleMargin = (e) => {
        e.target.value ? e.target.value < account ? setMargin(e.target.value) : setMargin(account) : setMargin(0);
    }
    const handleSell = async (id, entry, margin, pair) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${pair}`) 
            const balance = await axios.get(`http://localhost:5000/account/${currentUser.email}`);
            const newBalance = parseFloat(((margin / entry) * data.lastPrice) + balance.data.balance).toFixed(2)
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
    const handleSubmit = async () => {
        setLoading(true);
        if(margin){
            try {
                const result = await axios.get(`http://localhost:5000/account/${currentUser.email}`);
                const { data } = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${pair}`);
                await axios.post(`http://localhost:5000/position`, {
                    user: currentUser.email,
                    accountId: result.data.accountId,
                    entry: parseFloat(data.lastPrice).toFixed(2),
                    margin, 
                    amount: parseFloat(margin/data.lastPrice).toFixed(10),
                    pair,
                })
                await axios.put(`http://localhost:5000/account/update`, {
                    email: currentUser.email,
                    balance: result.data.balance - margin
                })
                console.log('Succesfully bought')
            } catch (error) {console.log(error)}
        }else{
            console.log('You didnt specify an margin to buy');
        }
        setLoading(false)
    }
    let { pair } = useParams();
    return(
        status ? <div>
            <div className="pair-container">
                <div className="bar">
                    <h3 className="pair-info">Pair: {pair}</h3>
                </div>
                <div className="trading">
                    <div className="trade-info">
                        <div className="chart">
                            <TradingViewWidget symbol={`BINANCE:${pair}`} theme={Themes.DARK} autosize/>
                        </div>
                        <div className="open-orders">
                            <h1>Open positions</h1>
                            {openPositions.map(position => (
                                <div className="position">
                                    <p><h5>Pair:</h5> {position.pair}</p><p> <h5>Entry:</h5> {position.entry}</p><p> <h5>Entry Margin:</h5> ${position.margin}</p> <p><h5>Margin:</h5> ${parseFloat((parseFloat(position.entry * 1.1 - position.entry).toFixed(2)) * (parseFloat(position.margin / position.entry).toFixed(6)) + position.margin).toFixed(2)}</p><button onClick={() => handleSell(position.id, position.entry, position.margin, position.pair)}>Sell</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="trades">
                        <div className="book">
                            <h1>Order book</h1>
                        </div>
                        <div className="recent-trades">
                            <h1>Recent trades</h1>
                        </div>
                    </div>
                    <div className="order">
                        <div className="trade">
                            <h1>Trade</h1>
                            <input type="number" placeholder={margin ? '$' + parseFloat(margin).toFixed(2) : '$0.00'} className="margin" onChange={handleMargin} onEmptied={(e) => setMargin()} value={margin ? + margin : ''}/>
                            <input type="range" id="margin" name="margin" min="0" max="100" value={percent} onChange={handlePercent}/>
                            <label for="volume">{percent + '%'}</label>
                            <select name="type" onChange={handleType}>
                                <option value="long">Long</option>
                                <option value="short">Short</option>
                            </select>
                            <button onClick={handleSubmit}>Buy</button>
                        </div>
                    </div>
                    {/* <div className="watchlist">
                        <h1>Watchlist</h1>
                    </div> */}
                </div>
                
                
            </div> 
            

        </div> : <div className="error">
            
        </div>
    )
}
export default Pair;