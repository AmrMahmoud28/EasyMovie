import React, { useContext, useState } from 'react'

import bg from "../../assets/footer-bg.jpg"
import logo from "../../assets/main-logo.svg"
import Button from "../../components/button/Button";
import { Link } from "react-router-dom";
import { AuthContext } from '../../authContext/AuthContext';
import { loginFailure, loginSatrt, loginSuccess } from "../../authContext/AuthAction"
import axios from 'axios';


const SignIn = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {dispatch} = useContext(AuthContext);

  const handleLogin = async (e) =>{
    e.preventDefault();
    // login({username, password}, dispatch);
    dispatch(loginSatrt());
    if(username === "Admin"){
      if(password === "123"){
        dispatch(loginSuccess({"_id":"63b095eb7e1bdbabbb9577c8","username":"Admin","email":"easymovie.admin@gmail.com","createdAt":"2022-12-31T20:04:59.382Z","updatedAt":"2022-12-31T20:04:59.382Z","__v":0}));
      }
      else{
        alert("Wrong password or username!")
        document.querySelector("#usernameField").value = "";
        document.querySelector("#passwordField").value = "";
        dispatch(loginFailure());
      }
    }
    else{
      try {
        const res = await axios.post(`https://easymovie-api.herokuapp.com/api/auth/login`, {username, password});
        dispatch(loginSuccess(res.data));
    } catch (error) {
        alert("Wrong password or username!")
        document.querySelector("#usernameField").value = "";
        document.querySelector("#passwordField").value = "";
        dispatch(loginFailure());
    }
    }
  }

  return (
    <div className="sign-up" style={{backgroundImage: `url(${bg})`}}>
      <div className="header">
        <div className="header__wrap container">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
        </div>
      </div>

      <div className="form">
        <div className="form__contents">
            <div className="form__contents__content">
                <h1>Sign In</h1>

                <form onSubmit={handleLogin}>
                    <input id='usernameField' type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required/>
                    <input id='passwordField' type="password" placeholder="Password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} required/>

                    <Button className="submitButton">Sign In</Button>

                    <p className="toSign"><span>New to EasyMovie?</span>{' '}<Link to="/register">Sign Up</Link></p>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn