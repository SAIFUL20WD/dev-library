import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import './Home.css';
import Book from '../Book/Book';

const Home = () => {
    const [books, setBooks] = useState([])
    useEffect( () => {
        fetch('https://frozen-river-26206.herokuapp.com/books')
        .then(res => res.json())
        .then(data => setBooks(data))
    }, [])

    return (
        <div>
            <Header></Header>
            {/* <div>
                <input type="text"/>
                <button>Search</button>
            </div> */}
            <div className="product-container">
                {
                    books.map(book => <Book book={book} key={book._id}></Book>)
                }
            </div>
        </div>
    );
};

export default Home;