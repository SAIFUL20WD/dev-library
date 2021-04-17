import axios from 'axios';
import React, { useState } from 'react';
import './AddBook.css';

const AddBook = () => {
    const [bookDetails, setBookDetails] = useState({
        name: '',
        author: '',
        price: '',
        photo: ''
    })
    const handleBlur = (event) => {
        const inputValue = event.target.value
        const inputName = event.target.name
        if(inputName === 'book-name'){
            const bookName = inputValue
            const newBookDetails = {...bookDetails}
            newBookDetails.name = bookName
            setBookDetails(newBookDetails)
        }
        if(inputName === 'author-name'){
            const authorName = inputValue
            const newBookDetails = {...bookDetails}
            newBookDetails.author = authorName
            setBookDetails(newBookDetails)
        }
        if(inputName === 'add-price'){
            const bookPrice = inputValue
            const newBookDetails = {...bookDetails}
            newBookDetails.price = bookPrice
            setBookDetails(newBookDetails)
        }
        if(inputName === 'cover-photo'){
            const bookPrice = inputValue
            const newBookDetails = {...bookDetails}
            newBookDetails.price = bookPrice
            setBookDetails(newBookDetails)
        }
    }
    const handleImageUpload = (event) => {
        const imageData = new FormData()
        imageData.set('key', '65cbf3f653fd546438eae3f8e373fb61')
        imageData.append('image', event.target.files[0])
        
        axios.post('https://api.imgbb.com/1/upload', imageData)
        .then( (response) => {
            const newBookDetails = {...bookDetails}
            newBookDetails.photo = response.data.data.display_url
            setBookDetails(newBookDetails)
        })
        .catch( (error) => {
            console.log(error);
        });
    }
    const handleAddBookSubmit = (e) => {
        if(bookDetails.photo){
            fetch('https://frozen-river-26206.herokuapp.com/addBook', {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(bookDetails)
            })
            .then(res => {
                if(res){
                    alert('Book has been added')
                }
            })
            .catch(err => console.log(err))
        }else {
            alert("Please select the file again")
        }
        e.preventDefault()
    }
    return (
        <div className="add-book-container">
            <h2>Add Book</h2>
            <div className="add-book-form-container"> 
                <form onSubmit={handleAddBookSubmit}>
                    <div className="input-group-container">
                        <div>
                            <label htmlFor="book-name">Book Name</label><br/>
                            <input type="text" onBlur={handleBlur} name="book-name" placeholder="Enter Name" required/><br/>
                        </div>
                        <div>
                            <label htmlFor="author-name">Author Name</label><br/>
                            <input type="text" onBlur={handleBlur} name="author-name" placeholder="Enter Name" required/><br/>
                        </div>
                    </div>
                    <div className="input-group-container">
                        <div>
                            <label htmlFor="add-price">Add Price</label><br/>
                            <input type="number" onBlur={handleBlur} name="add-price" placeholder="Enter Price" required/><br/>
                        </div>
                        <div>
                            <label htmlFor="cover-photo">Add Book Cover Photo</label><br/>
                            <input type="file" name="cover-photo" onChange={handleImageUpload} required/><br/>
                        </div>
                    </div>
                    <button type="submit" className="save">Save</button>
                </form>
            </div>
        </div> 
    );
};

export default AddBook;