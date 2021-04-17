import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Checkout.css';
import cartIcon from '../../images/icons/shopping-cart-black.png';

const Checkout = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [shipmentDetail, setShipmentDetail] = useState({
        address: '',
        mobile: ''
    })
    const {_id} = useParams()
    const history = useHistory()

    const [checkoutBook, setCheckoutBook] = useState({})
    useEffect( () => {
        fetch(`https://frozen-river-26206.herokuapp.com/book/${_id}`)
        .then(res => res.json())
        .then(data => setCheckoutBook(data))
    }, [_id])
    const currentURL = `/checkout/${_id}`

    const handlePlaceOrder = (e) => {
        const orderDetails = {...loggedInUser, product: checkoutBook, shipment: shipmentDetail, orderTime: new Date()}
        fetch('https://frozen-river-26206.herokuapp.com/placeOrder', {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(orderDetails)    
        })
        .then(res => {
            if(res){
                alert("Order Placed")
                history.push('/')
            }
        })
        .catch(err => console.log(err))    
        e.preventDefault()
    }

    const handleShipment = (event) => {
        const inputName = event.target.name
        const inputValue = event.target.value
        if(inputName === 'address'){
            const newShipmentDetail = {...shipmentDetail}
            newShipmentDetail.address = inputValue;
            setShipmentDetail(newShipmentDetail)
        }
        if(inputName === 'mobile'){
            const newShipmentDetail = {...shipmentDetail}
            newShipmentDetail.mobile = inputValue;
            setShipmentDetail(newShipmentDetail)
        }
    }

    return (
        <div>
            <header>
                <nav>
                    <div>
                        <Link to="/" className="link"><h1>DEV LIBRARY</h1></Link>
                        <ul>
                            <li><Link to="/" className="link">Home</Link></li>
                            <li><Link to="/orders" className="link">Orders</Link></li>
                            <li><Link to="/admin" className="link">Admin</Link></li>
                            <li className="cart-icon"><Link to={currentURL} className="link">
                                <img src={cartIcon} alt=""/> Checkout</Link>
                            </li>
                            {loggedInUser.email 
                                ? <li className="avater" onClick={() => setLoggedInUser({})}><img src={loggedInUser.photo} alt="" />Sign Out</li>
                                : <li><Link to="/login" className="link login">Login</Link></li>
                            }
                        </ul>
                    </div>
                </nav>
            </header>

            <div className="checkout-container">
                <h1>Checkout</h1>
                <div className="checkout-details">
                    <table>
                        <thead>
                            <tr>
                                <th className="description-table-data">Description</th>
                                <th>Quantity</th>
                                <th className="price-table-data">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="description-table-data">{checkoutBook.name}</td>
                                <td>1</td>
                                <td className="price-table-data">${checkoutBook.price}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Total with VAT</td>
                                <td></td>
                                <td>${Number(checkoutBook.price) + 35}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                
                <form onSubmit={handlePlaceOrder}>
                    <div className="shipment-details">
                        <div>
                            <label htmlFor="address">Address</label><br/>
                            <input type="text" onBlur={handleShipment} name="address" placeholder="Enter Shipment Address" required/><br/>
                        </div>
                        <div>
                            <label htmlFor="mobile">Mobile Number</label><br/>
                            <input type="text" onBlur={handleShipment} name="mobile" placeholder="Enter Mobile Number" required/><br/>
                        </div>
                        <button className="checkout-btn">Place Order</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;