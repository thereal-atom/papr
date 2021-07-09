import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './Styles/Pair.css'  
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { useAuth } from "../contexts/AuthContext";
  
const Pair = ({marketList}) => {
    const[margin, setMargin] = useState();
    const[type, setType] = useState('long');
    const[status, setStatus] = useState();
    const[percent, setPercent] = useState(0);
    const[account, setAccount] = useState(0);
    const[loading, setLoading] = useState(false);
    const[pairPrice, setPairPrice] = useState();
    const[openPositions, setOpenPoisitions] = useState([]);
    const[list, setList] = useState();
    const[leverage, setLeverage] = useState();

    const { currentUser } = useAuth();
    let { pair } = useParams();

    useEffect(() => {
        handleExist();
        getPairPrice();
        setList(marketList);
    }, [loading, marketList])

    const getPairPrice = () => {
        if(list) { 
            list.map(ticker => {
                if(ticker.symbol == pair){
                    setPairPrice(ticker);
                }
            })
        }
    }

    const handleExist = async () => {
        const { status } = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${pair}`);
        const { data } = await axios.get(`http://localhost:5000/account/${currentUser.email}`);
        const positions = await axios.get(`http://localhost:5000/position/${data.accountId}`);
        setOpenPoisitions(positions.data);
        setAccount(data.balance);
        setStatus(status);
    }
    const handleType = (e) => {
        setType(e.target.value);
    }
    const handleMargin = (e) => {
        console.log(e.target.value);
        e.target.value ? e.target.value < account ? setMargin(e.target.value) : setMargin(account) : setMargin(0);
    }
    const handleLeverage = (e) => {
        e.target.value ? e.target.value < 125 ? setLeverage(e.target.value) : setLeverage(125) : setLeverage(0);
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
            setTimeout(() => {
                setLoading(false)
            }, 250)
        } catch (error) {
            console.log(error);
        }

    }
    const handleSubmit = async () => {
        setLoading(true);
        if(margin && leverage){
            try {
                const result = await axios.get(`http://localhost:5000/account/${currentUser.email}`);
                const { data } = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${pair}`);
                console.log(leverage);
                await axios.post(`http://localhost:5000/position`, {
                    user: currentUser.email,
                    accountId: result.data.accountId,
                    entry: parseFloat(data.lastPrice).toFixed(2),
                    margin, 
                    amount: parseFloat(margin/data.lastPrice).toFixed(10),
                    pair,
                    leverage,
                })
                await axios.put(`http://localhost:5000/account/update`, {
                    email: currentUser.email,
                    balance: result.data.balance - margin
                })
                console.log('Succesfully bought')
                setTimeout(() => {
                    setLoading(false)
                }, 250)
            } catch (error) {console.log(error)}
            setMargin();
            setPercent(0);
        }else{
            console.log('No margin')
            if(loading) setLoading(false);
        }
        setLoading(false)
    }
    function nFormatter(num, digits) {
        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "Mil" },
            { value: 1e9, symbol: " Billion" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" }
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup.slice().reverse().find(function(item) {
            return num >= item.value;
        });
            return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    }
    return(
        status && list && openPositions && pairPrice ? <div>
            <div className="pair-container">
                <div className="bar">
                    <div className="pair-info-text">
                        <span className="pair-info-pair">
                            {pair}
                        </span>
                        <div className="pair-info-price green">
                            <p className={pairPrice.lastPrice > 0 ? 'info green' : 'info'}>${pairPrice.lastPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                        </div>
                        <div className="pair-info-change">
                            <label>24h Change</label>
                            <span className={pairPrice.priceChangePercent > 0 ? 'info green' : 'info'}>
                                <p>${pairPrice.priceChange}</p>
                                <p className="right">{parseFloat(pairPrice.priceChangePercent).toFixed(2)}%</p>
                            </span>
                        </div>
                        <div className="pair-info-low">
                            <label>24h Low</label>
                            <p>${pairPrice.lowPrice}</p>
                        </div>
                        <div className="pair-info-high">
                            <label>24h High</label>
                            <p>${pairPrice.highPrice}</p>
                        </div>
                        <div className="pair-info-quote">
                            <label>24h Volume(USDT)</label>
                            <p>{parseFloat(pairPrice.quoteVolume).toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                        </div>
                        <div className="pair-info-volume">
                            <label>24h Volume(BTC)</label>
                            <p>{pairPrice.volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                        </div>
                        
                         
                        
                        
                        
                         
                        
                    </div>
                </div>
                <div className="trading">
                    <div className="trade-info">
                        <div className="chart">
                            <TradingViewWidget symbol={`BINANCE:${pair}PERP`} theme={Themes.DARK} autosize/>
                        </div>
                        <div className="trade-open-positions">

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
                                                        <td className="position__size">{position.margin * position.leverage} USDT</td>
                                                        <td className="position__entry-price">{position.entry}</td>
                                                        <td className="position__price grey">{ticker.lastPrice}</td>
                                                        <td className="position__entry-margin">{position.margin} USDT</td>
                                                        <td className={`position__margin grey`}>{parseFloat(position.margin - (((position.amount * position.entry) - (position.amount * ticker.lastPrice)) * position.leverage)).toFixed(2)} USDT</td>
                                                        <td className={`position__pnl ${position.margin < parseFloat(position.amount * ticker.lastPrice).toFixed(2) ? 'green' : 'red'}`}>{position.margin > parseFloat(position.amount * ticker.lastPrice).toFixed(2) ? '' : '+'}{(parseFloat((position.amount * ticker.lastPrice - position.margin)  * position.leverage).toFixed(2))}USDT({(((position.amount * ticker.lastPrice) - position.margin) * (10/position.margin)) > 0 ? '+' : ''}{parseFloat((((position.amount * ticker.lastPrice) - position.margin) * (100/position.margin)) * position.leverage).toFixed(2)}%)</td>
                                                        <td className={loading ? "position__close unavail" : 'position__close'}><button disabled={loading} onClick={() => !loading ? handleSell(position.id, position.amount, position.pair) : ''}>Close</button></td>
                                                    </tr> 
                                            ) : ''
                                        ))   
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* <div className="trades">
                        <div className="book">
                            <h1>Order book</h1>
                        </div>
                        <div className="recent-trades">
                            <h1>Recent trades</h1>
                        </div>
                    </div> */}
                    <div className="order">
                        <div className="trade">
                            <h1>Trade</h1>
                            <div className="percent-label-box">
                                <label className="percent-label">Leverage</label>
                            </div>
                            <input type="number" placeholder="1x-125x" value={leverage ? leverage : ''} className="leverage-input" onChange={handleLeverage} onEmptied={(e) => setLeverage()}/>
                            <hr className="trade-divide"/>
                            <div className="percent-label-box">
                                <label className="percent-label">{`Available : $${parseFloat(account).toFixed(2)}`}</label>
                            </div>
                            <input type="number" placeholder={margin ? '$' + parseFloat(margin).toFixed(2) : '$0.00'} className="margin" onChange={handleMargin} onEmptied={(e) => setMargin()} value={margin ? + margin : ''}/>
                            <div className="percent-label-box">
                                <label for="margin" className="percent-label">{percent + '%' }</label>
                            </div>
                            <input type="range" name="margin" className="margin-percent" defaultValue="0" min="0" max="100" onChange={(event) => {setMargin(parseFloat(account * (event.target.value/100)).toFixed(2)); setPercent(event.target.value)}}/>
                            <div className="trade-buy-buttons">
                                <button className={loading ? "trade-long-button unavailable" : 'trade-long-button'} disabled={loading} onClick={handleSubmit}>Long</button>
                                <button className="trade-short-button" disabled={loading} onClick={handleSubmit}>Short</button>
                            </div>
                        </div>
                    </div>
                    <div className="watchlist">
                        <h1>Watchlist</h1>
                        <div className="watchlist-table-container">
                            <table className="watchlist-table">
                                <thead>
                                    <tr>
                                        <th className="watchlist-symbol">Symbol</th>
                                        <th className="watchlist-change">Change</th> 
                                        <th className="watchlist-price">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="watchlist-symbol">BTCUSDT</td>
                                        <td>1.48%</td>
                                        <td>33,480.67</td>
                                        <td><i class='bx bxs-x-square'></i></td>
                                    </tr>
                                    <tr>
                                        <td className="watchlist-symbol">ETHUSDT</td>
                                        <td>2.12%</td>
                                        <td>2,159.22</td>
                                        <td><i class='bx bxs-x-square'></i></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                
            </div> 
            

        </div> : <div className="error">
            
        </div>
    )
}
export default Pair;