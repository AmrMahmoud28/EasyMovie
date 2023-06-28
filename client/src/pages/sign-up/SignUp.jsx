import React, { useEffect, useState } from "react";
import "./sign-up.scss";

import bg from "../../assets/footer-bg.jpg"
import logo from "../../assets/main-logo.svg"
import Button from "../../components/button/Button";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const SignUp = () => {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() =>{
    document.title = 'EasyMovie | Register'
  });

  const handleSignUp = async (e) =>{
    e.preventDefault();

    try {
      await axios.post("https://easymovie-api.herokuapp.com/api/auth/register", {email, username, password});
      history.push("/login");
      alert("Account created successfully\nPlease Login");
    } catch (error) {
      document.querySelector("#emailField").value = "";
      document.querySelector("#usernameField").value = "";
      document.querySelector("#passwordField").value = "";
      alert("Username or Email is already taken!");
    }
  };

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
                <h1>Sign Up</h1>

                <form onSubmit={handleSignUp}>
                    <input id='emailField' type="email" placeholder="Email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} required/>
                    <input id='usernameField' type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required/>
                    <input id='passwordField' type="password" placeholder="Password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} required/>

                    <Button className="submitButton">Sign Up</Button>

                    <p className="toSign"><span>Already registered on EasyMovie?</span>{' '}<Link to="/login">Sign In</Link></p>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
