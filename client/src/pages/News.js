import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../contexts/AuthContext";

import './Styles/News.css';

const News = () => {
    const [news, setNews] = useState();
    const { currentUser } = useAuth();

    const fetchNews = async () => {
        const { data } = await axios.get("https://gnews.io/api/v4/search?q=crypto&token=88295d3d8b7a7bf40694e4c0b5c50c0e");
        setNews(data)
    } 
    useEffect(() => {
        fetchNews();
    }, [])

    return(
        <div className="news-container">
            <h1 className="title">Crypto News</h1>
            {currentUser ? '' : <div className="login-signup">
                <a href="/login"><div className="navbar-login">Login</div></a>
                <a href="/signup"><div className="navbar-signup">Signup</div></a>
            </div>}
            <div className="articles__wrapper">
                <div className="headers__wrapper">
                    {news ? news.articles.map((item, i) => (
                        i < 2 ? <a href={item.source.url}><div className="top">
                            <div className="picture">
                                <img src={item.image} alt="article" />
                            </div>
                            <div className="heading">
                                <p className="heading">{item.title}</p>
                            </div>
                        </div></a> : ''
                    )) : ''}
                </div>
                <div className="main__wrapper">
                    {news ? news.articles.map((item, i) => (
                        i > 2 && i < 6 ? <a href={item.source.url}><div className="main">
                            <div className="main-picture">
                                <img src={item.image} alt="article" />
                            </div>
                            <div className="main-heading">
                                <p className="main-heading">{item.title}</p>
                            </div>
                        </div></a> : ''
                    )) : ''}

                </div>
                <div className="other__wrapper">
                    {news ? news.articles.map((item, i) => (
                        i > 6 && i % 2 === 0 ?  <a href={item.source.url}><div className="other">
                            <div className="other-picture">
                                <img src={item.image} alt="article" />
                            </div>
                            <div className="other-heading">
                                <h1>{item.title}</h1>
                                <p className="other-description">{item.content}</p>
                            </div>
                        </div></a> : i > 6 ? <a href={item.source.url}><div className="other">
                            <div className="other-heading">
                                <h1>{item.title}</h1>
                                <p className="other-description">{item.content}</p>
                            </div>
                            <div className="other-picture">
                                <img src={item.image} alt="article" />
                            </div> 
                        </div> </a> : ''
                    )) : ''}

                </div>
            </div>
        </div>
    )
}

export default News;