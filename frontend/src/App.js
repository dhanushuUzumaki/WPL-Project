import React from 'react';
import {useDispatch} from 'react-redux';
import { listMyOrders } from './actions/orderActions';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Product from './components/Product';
import Cart from './components/Cart';
import Signin from './components/Signin';
import { useSelector } from 'react-redux';
import Register from './components/Register';
import Products from './components/Products';
import PlaceOrder from './components/PlaceOrder';
import Order from './components/OrderScreen';
import Profile from './components/Profile';
import Orders from './components/Orders';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();  
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
         
            <Link to="/">DAS BISTRO WINE BAR</Link>

          </div>
          <div className="header-links">
            <Link to="/cart">Cart</Link>
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>      
        <main className="main">
          <div className="content">
            <Route path="/orders" component={Orders} />
            <Route path="/profile" component={Profile} onEnter={() => dispatch(listMyOrders())}/>
            <Route path="/order/:id" component={Order} />
            <Route path="/products" component={Products} />
            <Route path="/placeorder" component={PlaceOrder} />
            <Route path="/signin" component={Signin} />
            <Route path="/register" component={Register} />
            <Route path="/product/:id" component={Product} />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/category/:id" component={Home} />
            <Route path="/" exact={true} component={Home} />
          </div>
        </main>
        <footer className="footer">
        <p>Contact us at @dasbistro@gmail.com  Address:7575 Frankford Road, Estates on Frankford, 75252 Dallas Texas</p></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
