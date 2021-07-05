import axios from 'axios';
import React, { useEffect, useState } from 'react';

import './Styles/trade.css'

const Trade = () => {
    const[price, setPrice]= useState();
    const[vol, setVol] = useState();
    const[percent, setPercent] = useState();
    const[list, setList] = useState();
    const[searchQuery, setSearchQuery] = useState();
    const fetchPrice = () => {
        setInterval(async () => {
            const { data } = await axios.get("https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT");
            const { lastPrice, quoteVolume, lowPrice } = data;
            setPrice(parseFloat(lastPrice).toFixed(2));
            setVol(parseFloat(quoteVolume).toFixed(2))
            setPercent(parseFloat(((lastPrice - lowPrice) / lowPrice) * 100).toFixed(2));
    
            let prices = []
            const filtered = await axios.get(`https://api.binance.com/api/v3/ticker/24hr`);
            filtered.data.forEach(filter => {
                if(parseFloat(filter.quoteVolume).toFixed(0) > 1000000 && filter.lastPrice > 0.01 && (filter.priceChangePercent > 0.25 || filter.priceChangePercent < -0.25) ) prices.push(filter);
            })
            setList(prices);
            console.log('Data fetched');
        }, 3000)
    }
    const handleSearchQuery = (e) => {
        e.target.value ? setSearchQuery(e.target.value.toUpperCase()) : setSearchQuery();
    } 
    useEffect(() => {
        fetchPrice();
    }, [])
    return(
        <div className="container">
            <div className="trending">
                <div className="box">
                    <div className="content">
                        <div className="pair"><i class="fab fa-ethereum"></i> ETH/USDT</div>
                        <div className="price">{price ? price : 'Loading...'} </div><div className="dollars">{price ? `$${price}` : ''}</div>
                        <div className="change"><div className="h_label">{percent ? '24h: ' : ''}</div> {percent > 0 ? `  +${percent}` : percent} <div className="amount">$213.95</div></div>
                    </div>
                </div>
                <div className="box">
                    <div className="content">
                        <div className="pair"><i class="fab fa-bitcoin"></i> BTC/GBP</div>
                        <div className="price">23687.12 <div className="dollars">$33076.46</div></div>
                        <div className="change">24h 
                        +2.69% <div className="amount">$213.95</div></div>
                    </div>
                </div>
                <div className="box">
                    <div className="content minus">
                        <div className="pair">DOT/BTC</div>
                        <div className="price">0.00043055 <div className="dollars">$14.17</div></div>
                        <div className="change">24h -3.97% <div className="amount">$0.76</div></div>
                    </div>
                </div>
                <div className="box">
                    <div className="content">
                        <div className="pair">DOGE/USDT</div>
                        <div className="price">0.24634 <div className="dollars">$0.24634</div></div>
                        <div className="change">24h +3.29% <div className="amount">$0.043</div></div>
                    </div>
                </div>
            </div>

            <div className="trade-markets">
                <div className="searchbar">
                    <input type="text" placeholder="Search" className="search-bar" onChange={handleSearchQuery}/>
                </div>
                {list ? <div className="table">


                <table class="content-table">
                    <thead>
                        <tr>
                            <th className="pairs">Pair</th>
                            <th>Price</th>
                            <th>Change</th>
                            {/* <th>Volume</th> */}
                            <th>Trade</th>   
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((row, i) => (
                            
                                row.symbol.includes("USDT") && (searchQuery ? row.symbol.includes(searchQuery) : true) ? <tr key={i}>
                                    <td className="pairs">{row.symbol}</td>
                                    <td>{parseFloat(row.lastPrice).toFixed(2)}</td>
                                    <td className={parseFloat(row.priceChangePercent).toFixed(2) > 0 ? "%change pos" : "%change neg"}>{parseFloat(row.priceChangePercent).toFixed(2) > 0 ? `+${parseFloat(row.priceChangePercent).toFixed(2)}` : parseFloat(row.priceChangePercent).toFixed(2)}%</td>
                                    {/* <td className="volum">${parseFloat(row.quoteVolume).toFixed(2)}</td> */}
                                    {/* <td className="cap">Unavailable</td> */}
                                    <td><button><a href={`trade/${row.symbol}`}>Trade</a></button></td>
                                </tr> : ''
                            ))}
                    </tbody>
                </table>
                    {/* <table>
                        <thead>
                            <tr>
                                <th className="pair">Pair</th>
                                <th className="price_h">Price</th>
                                <th className="%change">Change</th>
                                <th className="volume">Volume</th>
                                <th className="cap">Market cap</th>
                                <th className="trade">Trade</th>                          
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((row, i) => (
                                row.symbol.includes("USDT") && (searchQuery ? row.symbol.includes(searchQuery) : true) ? <tr key={i}>
                                    <td className="pair">{row.symbol}</td>
                                    <td className={row.lastPrice > row.askPrice ? "price pos" : "price neg"}>{parseFloat(row.lastPrice).toFixed(2)}</td>
                                    <td className={parseFloat(row.priceChangePercent).toFixed(2) > 0 ? "%change pos" : "%change neg"}>{parseFloat(row.priceChangePercent).toFixed(2) > 0 ? `+${parseFloat(row.priceChangePercent).toFixed(2)}` : parseFloat(row.priceChangePercent).toFixed(2)}%</td>
                                    <td className="volum">${parseFloat(row.quoteVolume).toFixed(2)}</td>
                                    <td className="cap">Unavailable</td>
                                    <td className="trade"><button><a href={`trade/${row.symbol}`}>Trade</a></button></td>
                                </tr> : ''
                            ))}
                            
                        </tbody>
                        
                    </table> */}
                </div> : <h1>Loading...</h1>}
            </div>
        </div>
    );
};

export default Trade;