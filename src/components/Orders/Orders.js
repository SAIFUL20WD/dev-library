import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import './Orders.css';
import Loader from "react-loader-spinner";

const Orders = () => {
    const [waiting, setWaiting] = useState(true)
    const [orderedBook, setOrderedBook] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    useEffect(() => {
        fetch(`https://frozen-river-26206.herokuapp.com/orders?email=${loggedInUser.email}`)
        .then(res => res.json())
        .then(data => {
            setOrderedBook(data)
            setWaiting(false)
        })
    }, [loggedInUser.email])

    return (
        <div className="orders-container">
            <Header></Header>
            <h2>Order Summary</h2>
            {
                waiting ? <Loader className="spinner" visible={waiting} type="Circles" color="#fb2056" height={100} width={100}/> 
                :   <table id="orders-table">
                    <thead>
                        <tr>
                            <th>Order Item</th>
                            <th>Order Date</th>
                            <th>Price</th>
                        </tr>
                    </thead>  
                    <tbody>
                    {
                        orderedBook.map(order => <tr key={order._id}>
                            <td>{order.product.name}</td>
                            <td>{(new Date(order.orderTime).toDateString('dd/MM/yyyy'))}</td>
                            <td>{Number(order.product.price) + 35}</td>
                            <td></td>
                        </tr>)
                    } 
                    </tbody> 
                </table> 
            }
            
        </div>
    );
};

export default Orders;