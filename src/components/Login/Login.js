import React, { useContext } from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import googleIcon from '../../images/icons/google.png'
import Header from '../Header/Header';

   
const Login = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const history = useHistory()
    const location = useLocation()
    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
        .then((result) => { 
            const {displayName, email, photoURL} = result.user;
            const signedInUser = {name: displayName, email: email, photo: photoURL}
            setLoggedInUser(signedInUser)
            history.replace(from)
        })
        .catch((error) => {
            const errorMessage = error.message;
        });
    }
    
    return (
        <div>
            <Header></Header>
            <div className="login-container"> 
                <h2>Login</h2>
                <div className="google-auth" onClick={handleGoogleSignIn}>
                    <img src={googleIcon} alt="Google Icon"/>
                    <h4>Continue With Google</h4>
                </div>
            </div>
        </div>
    );
};

export default Login;