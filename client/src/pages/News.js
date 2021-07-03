import React, { useState, useEffect } from 'react';

import './Styles/News.css';

const News = () => {
    return(
        <div className="container">
            <h1 className="title">Crypto News</h1>
            <div className="articles__wrapper">
                <div className="headers__wrapper">
                    <div className="top">
                        <div className="picture">
                            <img src="https://cdn.discordapp.com/attachments/810932922306789406/859483252077887518/https___d1e00ek4ebabms.cloudfront.net_production_27d937d6-411c-4b0e-b4e0-8f26c9d5e651.jpg" alt="article" />
                        </div>
                        <div className="heading">
                            <p className="heading">BITCOIN PRICE – LIVE: CRYPTO RECOVERY ‘FEELS VERY 2013’, LEADING ANALYST SAYS</p>
                        </div>
                    </div>
                    <div className="top">
                        <div className="picture">
                            <img src="https://cdn.discordapp.com/attachments/810932922306789406/859525432399757342/binance.jpg" alt="article" />
                        </div>
                        <div className="heading">
                            <p className="heading">Financial watchdog bans crypto exchange Binance from UK</p>
                        </div>
                    </div>
                </div>
                <div className="main__wrapper">
                    <div className="main">
                        <div className="main-picture">
                            <img src="https://cdn.discordapp.com/attachments/810932922306789406/859527827715522640/775x-1.png" alt="article" />
                        </div>
                        <div className="main-heading">
                            <p className="main-heading">Bitcoin Extends Rebound With Chartists Eyeing Bullish Technicals</p>
                        </div>
                    </div>
                    <div className="main">
                        <div className="main-picture">
                            <img src="https://cdn.discordapp.com/attachments/810932922306789406/859527824406610000/btc.png" alt="article" />
                        </div>
                        <div className="main-heading">
                            <p className="main-heading">Bitcoin, ethereum rise as regulatory action seen as signals of market 'maturing'</p>
                        </div>
                    </div>
                    <div className="main">
                        <div className="main-picture">
                            <img src="https://cdn.discordapp.com/attachments/810932922306789406/859527826528403456/image.jpg" alt="article" />
                        </div>
                        <div className="main-heading">
                            <p className="main-heading">Formula 1 announce Crypto.com as inaugural global partner of the F1 Sprint series | Formula 1®</p>
                        </div>
                    </div>
                </div>
                <div className="other__wrapper">
                    <div className="other">
                        <div className="other-picture">
                            <img src="https://cdn.discordapp.com/attachments/810932922306789406/859667272763047956/Crypto-Up-1.jpg" alt="article" />
                        </div>
                        <div className="other-heading">
                            <h1>Ethereum, Litecoin, and Ripple's XRP – Daily Tech Analysis – June 30th, 2021</h1>
                            <p className="other-description">It's been a mixed start for the majors. A move back through the early highs would be needed to support further upside in the day ahead.</p>
                        </div>
                    </div>
                    <div className="other">
                        <div className="other-heading">
                            <h1>Ethereum price prediction: ETH could soar to $20,000 in 2025 amid 'major changes'</h1>
                            <p className="other-description">ETHEREUM could soar to $20,000 (£14,410) in just four years by 2025 if ETH implements the major changes promised to users, according to an expert panel.</p>
                        </div>
                        <div className="other-picture">
                            <img src="https://cdn.discordapp.com/attachments/810932922306789406/859670108459499600/Ethereum-price-prediction-ETH-could-soar-to-20-000-in-2025-amid-major-changes-3122011.jpg" alt="article" />
                        </div>
                    </div>
                </div>
                {/* <div className="article">              
                    <img src="https://cdn.discordapp.com/attachments/810932922306789406/859483252077887518/https___d1e00ek4ebabms.cloudfront.net_production_27d937d6-411c-4b0e-b4e0-8f26c9d5e651.jpg" alt="article" />
                    <h1>Heading</h1>
                    <p>Description</p>
                </div> */}
            </div>
        </div>
    )
}

export default News;