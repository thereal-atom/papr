import './Navbar.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {

    const[active, setActive] = useState('sidebar');
    const[balance, setBalance] = useState();
    const[login,setLogin] = useState(false);
    const { currentUser, logout } = useAuth();
    
    const handleActive = () => {
        if(active === 'sidebar') {
            setActive(active + ' active') 
            setLogin(true)} 
        else{ 
            setActive('sidebar')
            setLogin(false)
        }
    }
    const getBalance = async () => {
        if(currentUser) {
            setInterval(async() => {
                const result = await axios.get(`http://localhost:5000/account/${currentUser.email}`);
                const { balance } = result.data
                setBalance(balance) 
            }, 2500);

        }
    }
    const handleLogout = async () => {
        try {
            await logout()
        } catch(error) {
            console.log(error);
            alert("Failed to log out")
        }
    }
    useEffect(() => {
        getBalance();
    }, [])


    return(
        
        <div className="app">
            <div className={active}>
                <div className="logo_content">
                    <div className="logo">
                        <i class='bx bx-atom'></i>
                        <div className="logo_name">papr</div>
                    </div>
                    <i className='bx bx-menu' id="btn" onClick={handleActive}></i>
                </div>
                <ul className="nav_list">
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
                        <span className="links_name">Markets</span>
                        </a>
                        <span className="tooltip">Markets</span>
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
                </ul>
                <div className="profile_content">
                    <div className="profile">
                        <div className="profile_details">
                            {currentUser ? <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Atom_editor_logo.svg/1200px-Atom_editor_logo.svg.png" alt="Avatar" />  : ''}
                            <div className="name_job">
                                <div className="name">{currentUser ? currentUser.email : 
                                    <div className="nav-login-signup">
                                        <a href="/login"><div className="nav-navbar-login">Login</div></a>
                                        <a href="/signup"><div className="nav-navbar-signup">Signup</div></a>
                                    </div>}
                                </div>
                                <div className="job">{currentUser && balance ? `Available: $${parseFloat(balance).toFixed(2)}` : ''}</div>
                            </div>
                        </div>
                        {currentUser ? <a href="/"><button onClick={handleLogout}><i className='bx bx-log-out' id="log_out"></i></button></a> : login !== true ? <a href="/login"><i className='bx bx-log-in' id="log_out"></i></a> : '' }
                    </div>
                </div>
            </div>
        </div>
        
        
    );
}


export default Navbar;