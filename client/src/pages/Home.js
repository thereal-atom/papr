import React, { useEffect, useState } from 'react';

import './Styles/Home.css';

const Home = () => {
    const [filled, setFilled] = useState('email filled');
    const [email, setEmail] = useState();
    const handleChange = (e) =>{
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const result = re.test(String(e.target.value).toLowerCase());;
        result ? setFilled('email exist') : setFilled('email filled');
    }
    return(
        <div className="container">
            <div className="hero">
                <div className="blob">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#00aeff" d="M38.5,-56.8C53.2,-50.3,71,-45.4,74.8,-34.8C78.7,-24.2,68.6,-7.9,64.5,8.2C60.5,24.2,62.4,40,56.5,51.6C50.5,63.1,36.7,70.5,23.4,70C10.1,69.4,-2.7,61,-15.8,56.1C-29,51.3,-42.5,49.9,-52.3,42.9C-62,35.9,-68,23.3,-67.7,11.1C-67.4,-1.2,-60.8,-13,-56.6,-27.4C-52.4,-41.8,-50.6,-58.8,-41.5,-67.9C-32.5,-77.1,-16.3,-78.2,-2.2,-74.8C11.8,-71.4,23.7,-63.3,38.5,-56.8Z" transform="translate(100 100)" />
                    </svg>
                </div>
                <div className="blob2">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#00dddd" d="M38.5,-56.8C53.2,-50.3,71,-45.4,74.8,-34.8C78.7,-24.2,68.6,-7.9,64.5,8.2C60.5,24.2,62.4,40,56.5,51.6C50.5,63.1,36.7,70.5,23.4,70C10.1,69.4,-2.7,61,-15.8,56.1C-29,51.3,-42.5,49.9,-52.3,42.9C-62,35.9,-68,23.3,-67.7,11.1C-67.4,-1.2,-60.8,-13,-56.6,-27.4C-52.4,-41.8,-50.6,-58.8,-41.5,-67.9C-32.5,-77.1,-16.3,-78.2,-2.2,-74.8C11.8,-71.4,23.7,-63.3,38.5,-56.8Z" transform="translate(100 100)" />
                    </svg>
                </div>
                {/* <svg className="svg1"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#5500ff" fill-opacity="1" d="M0,32L34.3,42.7C68.6,53,137,75,206,90.7C274.3,107,343,117,411,112C480,107,549,85,617,90.7C685.7,96,754,128,823,149.3C891.4,171,960,181,1029,176C1097.1,171,1166,149,1234,128C1302.9,107,1371,85,1406,74.7L1440,64L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg> */}
                <svg className="svg2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#1d1b31" fill-opacity="1" d="M0,288L60,266.7C120,245,240,203,360,202.7C480,203,600,245,720,240C840,235,960,181,1080,181.3C1200,181,1320,235,1380,261.3L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                <div className="cta">
                    <h1>Enjoy tech. Enjoy investing.</h1>
                    <p>Free paper trading platform with advanced features.</p>
                    <div className="btn">
                        <button class="main__btn"><a href="#login">Get started</a></button>
                    </div>
                </div>
            </div>
            <div className="login">
                <div className="wrapper">
                    <div className="text">
                        <h1 className="title">Jump start your crypto portfolio</h1>
                        <p className="description">Coinbase is the easiest place to buy and sell cryptocurrency. Sign up and get started today..</p>
                        <div className="form">
                            <input type="text" placeholder="Email address" className={filled}  id="login" onChange={handleChange} />
                            <button className="submit">Sign up</button>
                        </div>
                    </div>
                    <div className="example">
                        <img src="https://cdn.discordapp.com/attachments/810932922306789406/860457629498081300/f0f9df3550a3d961691a7201c7365273.jpg" alt="phone" />
                    </div>
                </div>
            </div>
            <div className="markets">
                <table class="content-table">
                    <thead>
                        <tr>
                            <th>Pair</th>
                            <th>Price</th>
                            <th>24h Change</th>
                            <th>Trade</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="pairs"><img src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=012" alt="logo" /> Bitcoin <span className="short">BTC</span></td>
                            <td>£23,990.00</td>
                            <td className="percent">-4.14%</td>
                            <td><button><a href="/trade/pair">Buy</a></button></td>
                        </tr>
                        <tr>
                            <td className="pairs"><img src="data:image/png;base64,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" alt="logo" /> Ethereum <span className="short">ETH</span></td>
                            <td>£1,483.17</td>
                            <td className="percent">-6.20%</td>
                            <td><button><a href="/trade/pair">Buy</a></button></td>
                        </tr>
                        <tr>
                            <td className="pairs"><img src="https://cryptologos.cc/logos/bitcoin-cash-bch-logo.svg?v=012" alt="logo" /> Bitcoin cash <span className="short">BCH</span></td>
                            <td>£352.11</td>
                            <td className="percent">-5.65%</td>
                            <td><button><a href="/trade/pair">Buy</a></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="features">
                <div className="header">
                    <h1>Features</h1>
                    <p>Free crypto papaer trading platform</p>
                </div>
                <div className="features-boxes">
                    <div className="features-box">
                        <h1><i class="fas fa-list"></i> Watchlist</h1>
                        <p>Customisable watchlist with info about any crpyto pair you desire. Get notifications of breaking news relating to your watchlist.</p>
                    </div>
                    <div className="features-box">
                        <h1><i class="fas fa-chart-bar"></i> Manage your portfolio</h1>
                        <p>Buy and sell popular digital currencies, keep track of them in the one place. See your past trading data and your current open positions.</p>
                    </div>
                    <div className="features-box">
                        <h1><i class="fas fa-chart-line"></i> Live market data</h1>
                        <p>In depth market data about every pair in real time.</p>
                    </div>
                    <div className="features-box">
                        <h1><i class="fas fa-newspaper"></i> Breaking crypto news</h1>
                        <p>Show you up to date breaking crypto news. Get notifications based on your watchlist.</p>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Home;