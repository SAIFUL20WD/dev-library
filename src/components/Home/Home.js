import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import './Home.css';
import Book from '../Book/Book';
import Loader from "react-loader-spinner";

const Home = () => {
    const [spinner, setSpinner] = useState(true)
    const [books, setBooks] = useState([])
    useEffect( () => {
        fetch('https://frozen-river-26206.herokuapp.com/books')
        .then(res => res.json())
        .then(data => {
            setBooks(data)
            setSpinner(false)
        })
    }, [])

    return (
        <div>
            <Header></Header>
            <Loader className="spinner" visible={spinner} type="Circles" color="#fb2056" height={100} width={100}/>
            <div className="product-container">
                {
                    books.map(book => <Book book={book} key={book._id}></Book>)
                }
            </div>
        </div>
    );
};

export default Home;