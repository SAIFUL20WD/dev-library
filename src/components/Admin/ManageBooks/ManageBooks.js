import React, { useEffect, useState } from 'react';
import './ManageBooks.css';
import deleteIcon from '../../../images/icons/delete.png';
import editIcon from '../../../images/icons/edit-colored.png';
import Loader from "react-loader-spinner";

const ManageBooks = () => {
    const [spinning, setSpinning] = useState(true)
    const [manageBooks, setManageBooks] = useState([])
    const loadBooks = () => {
        fetch('https://frozen-river-26206.herokuapp.com/books')
        .then(res => res.json())
        .then(data => {
            setManageBooks(data)
            setSpinning(false)
        })
    }
    useEffect( () => loadBooks(), [])

    const handleDelete = (id) => {
        fetch(`https://frozen-river-26206.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if(res){
                loadBooks()
            }
        })
    }

    const handleEdit = () => {
        alert('Edit option is not developed')
    }

    return (
        <div className="manage-books-container">
            <h2>Manage Books</h2>
            {
                spinning ? <Loader className="spinner" visible={spinning} type="Circles" color="#fb2056" height={100} width={100}/>
                :   <table id="manage-books-table">
                    <thead>
                        <tr>
                            <th>Book Name</th>
                            <th>Author Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            manageBooks.map(bookDetail => <tr key={bookDetail._id}>
                                <td>{bookDetail.name}</td>
                                <td>{bookDetail.author}</td>
                                <td>${bookDetail.price}</td>
                                <td>
                                    <img src={editIcon} alt="" onClick={handleEdit} />
                                    <img src={deleteIcon} alt="" onClick={() => handleDelete(bookDetail._id)} />
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            }
            
        </div>  
    );
};

export default ManageBooks;