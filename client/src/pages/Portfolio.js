import React, { useEffect, useState } from 'react';
import { fetchPositions } from '../api/index';
import axios from 'axios';

import './Styles/Portfolio.css'

const Portfolio = () => {
    const fetchData = async () => {
        const response = await fetchPositions();
        setCrypto(response);
    }
    const handleSell = async (id) => {
        setLoading(true);
        await axios.delete(`http://localhost:5000/position/${id}`)
        console.log('Sell')
        setLoading(false);
    }

    const[crypto, setCrypto] = useState();
    const[loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, [loading])
    return(
        <div className="container">
            <div className="wrapper">
                {crypto ? crypto.map((position) => (
                    <div key={position.id}>
                        <h2>Pair: {position.pair}</h2>
                        <p>Entry: {position.entry} Margin: ${position.cost}</p>
                        <button onClick={() => handleSell(position.id)}>Sell</button>
                    </div>
                )) : <h2>Loading...</h2>}
            </div>
        </div>

    );
}

export default Portfolio;