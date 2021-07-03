import './Navbar.css';
import React, { useState, } from 'react';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';

import Portfolio from '../../pages/Portfolio';
import Trade from '../../pages/Trade';
import News from '../../pages/News'
import Home from '../../pages/Home'
import Pair from '../../pages/Pair'

const Navbar = () => {
    const[active, setActive] = useState('sidebar');
    const handleActive = () => {
        active === 'sidebar' ? setActive(active + ' active') : setActive('sidebar')
    }
    return(
        
        <div className="app">
            <Router>
            <div className={active}>
                <div className="logo_content">
                    <div className="logo">
                        <i class='bx bx-atom'></i>
                        <div className="logo_name">Atom</div>
                    </div>
                    <i className='bx bx-menu' id="btn" onClick={handleActive}></i>
                </div>
                <ul className="nav_list">
                    {/* <li>
                        <i className='bx bx-search' ></i>
                        <input type="text" placeholder="Search..." />
                        <span className="tooltip">Search</span>
                    </li> */}

                    <li>
                        <a href="/">
                            <i class='bx bx-home-alt' ></i>
                        <span className="links_name">Home</span>
                        </a>
                        <span className="tooltip">Home</span>
                    </li>
                    <li>
                        <a href="/trade">
                        <i class='bx bx-exclude'></i>
                        <span className="links_name">Trade</span>
                        </a>
                        <span className="tooltip">Trade</span>
                    </li>
                    <li>
                        <a href="/portfolio">
                        <i className='bx bx-pie-chart-alt-2' ></i>
                        <span className="links_name">Portfolio</span>
                        </a>
                        <span className="tooltip">Portfolio</span>
                    </li>
                    <li>
                        <a href="/news">
                        <i class='bx bx-news' ></i>
                        <span className="links_name">News</span>
                        </a>
                        <span className="tooltip">News</span>
                    </li>
                    <li>
                        <a href="/account">
                        <i className='bx bx-user' ></i>
                        <span className="links_name">Account</span>
                        </a>
                        <span className="tooltip">Account</span>
                    </li>
                    <li>
                        <a href="/settings">
                        <i className='bx bx-cog' ></i>
                        <span className="links_name">Settings</span>
                        </a>
                        <span className="tooltip">Settings</span>
                    </li>
                </ul>
                <div className="profile_content">
                    <div className="profile">
                        <div className="profile_details">
                            <img src="logo512.png" alt="Avatar" />
                            <div className="name_job">
                                <div className="name">Atom</div>
                                <div className="job">Balance: $536.04</div>
                            </div>
                        </div>
                        <i className='bx bx-log-out' id="log_out" ></i>
                    </div>
                </div>
            </div>
            <Switch>
                <div className="home_content">
                    <Route path="/" exact><Home /></Route>
                    <Route path="/trade/:pair" children={<Pair />}></Route>
                    <Route path="/trade" exact><Trade /></Route>
                    <Route path="/portfolio"><Portfolio /></Route>
                    <Route path="/news"><News /></Route>
                    {/* <Route path="/accounts"><Account /></Route>
                    <Route path="/settings"><Settings /></Route> */}
                </div>
            </Switch>
            </Router>


        </div>
        
        
    );
}


export default Navbar;