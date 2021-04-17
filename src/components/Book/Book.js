import React from 'react';
import { useHistory } from 'react-router-dom';
import './Book.css';

const Book = (props) => {
    const {_id, name, author, price, photo} = props.book
    const history = useHistory()
    const handleCheckoutRedirect = () => {
        history.push(`/checkout/${_id}`)
    }
    return (
        <div className="book-container">
            <div className="book-image-container">
                <img src={photo} alt=""/>
            </div>
            <div className="book-info-container">
                <div>
                    <h3>{name}</h3>
                    <p className="author-name">{author}</p>
                </div>
                <div className="book-price-container">
                    <h2 className="price">${price}</h2>
                    <button className="buy-btn" onClick={() => handleCheckoutRedirect(_id)}>BUY NOW</button>
                </div>
            </div>
        </div>
    );
};

export default Book;