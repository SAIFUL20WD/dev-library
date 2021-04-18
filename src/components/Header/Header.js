import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <header>
            <nav>
                <div>
                    <Link to="/" className="link"><h1>DEV LIBRARY</h1></Link>
                    <ul>
                        <li><Link to="/" className="link">Home</Link></li>
                        <li><Link to="/orders" className="link">Orders</Link></li>
                        <li><Link to="/admin" className="link">Admin</Link></li>
                        <li><Link to="/deals" className="link">Deals</Link></li>
                        {loggedInUser.email 
                            ? <li className="avater" onClick={() => setLoggedInUser({})}><img src={loggedInUser.photo} alt="" />Sign Out</li>
                            : <li><Link to="/login" className="link login">Login</Link></li>
                        }
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;