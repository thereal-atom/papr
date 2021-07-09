import './App.css';
import'./components/Navbar/Navbar.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';

import Portfolio from './pages/Portfolio';
import Trade from './pages/Trade';
import News from './pages/News';
import Home from './pages/Home';
import Pair from './pages/Pair';
import Account from './pages/Account';
import Signup from './components/Signup/Signup';
import Login from './components/Signup/Login';
import Reset from './components/Signup/Reset';
import Update from './components/Signup/Update'
import Footer from './components/Footer/Footer';
import Privacy from './pages/Privacy';

import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute'

import { fetchListData } from './api';

function App() {
  const[pairList, setPairList] = useState();

  const fetchListPrice = async () => {
    const returnedData = await fetchListData();
    setPairList(returnedData);
  }

  useEffect(() => {
    fetchListPrice();
    setInterval(() => {
        fetchListPrice();
        console.log('API')
    }, 2000)
  }, [])

  return (
    <AuthProvider>
      <div className="App">
        <Navbar /> 
        <Router>
            <Switch>
                <div className="home_content">
                    <Route path="/" exact><Home /></Route>
                    <Route path="/trade/:pair"><Pair marketList={pairList}/></Route>
                    <Route path="/trade" exact marketList={pairList}><Trade /></Route>
                    <PrivateRoute path="/portfolio" children={<Portfolio />} />
                    <Route path="/news"><News /></Route>
                    <PrivateRoute path="/account" children={<Account marketList={pairList}/>} />
                    <Route path="/signup"><Signup/></Route>
                    <Route path="/login"><Login/></Route>
                    <Route path="/reset" component={<Reset/>} />
                    <PrivateRoute path="/update" children={<Update/>} />
                    <Route path="/privacy"><Privacy /></Route>
                    <Footer />
                </div>
            </Switch>
          </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
