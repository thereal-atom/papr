import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './Styles/Pair.css'
  
const Pair = () => {
    const[amount, setAmount] = useState();
    const[type, setType] = useState('short');
    const[validation, setValidation] = useState();
    const[status, setStatus] = useState();

    useEffect(() => {
        console.log(amount);
        handleExist();
        isNaN(amount) || amount == 0 ? setValidation('input false') : setValidation('input');
    }, [amount])

    const handleExist = async () => {
        try {
            const { status } = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${pair}`);
            const { data } = await axios.get(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=5m`);
            console.log(data.length);
            setStatus(status);
        } catch (error) {
            setStatus(0);
            console.log(error);         
        }


    }
    const handleTyping = (e) => {
        setAmount(e.target.value);
    }
    const handleType = (e) => {
        setType(e.target.value);
    }
    const fetchPrice = async () => {
        const { data } = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${pair}`);
        await axios.post(`http://localhost:5000/position`, {
            entry: parseFloat(data.lastPrice).toFixed(2),
            amount, 
            pair,
            cost: parseFloat(parseFloat(data.lastPrice).toFixed(2) * amount).toFixed(2),
        })
    }
    let { pair } = useParams();
    return(
        status ? <div>
            <h3>Pair: {pair}</h3>
            <input type="text" className={validation} onChange={handleTyping}/>
            <select name="type" onChange={handleType}>
                <option value="short">Short</option>
                <option value="long">Long</option>
            </select>
            <button onClick={fetchPrice}>Submit</button>
        </div> : <div className="error">
            
        </div>
    )
}
export default Pair;