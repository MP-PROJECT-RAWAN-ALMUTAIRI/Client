import React from "react";
import { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import axios from "axios";
import "./style.css";  
 
const Signin = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [Avatar, setAvatar] = useState("");
  //const [message, setMessage] = useState("");

  const Sgin = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(`${BASE_URL}/signup`, {
        email: email,
        password: password,
        userName: userName,
        role: "61c42cad4b31a32af675468b", // for user
      });
      navigate("/login");
      console.log(result);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <> 
    <div class="background"></div>
      <div class="container">
        <h2>Login Form</h2>
        <form action="">
          <div class="form-item">
            <span class="material-icons-outlined">account_circle</span>
            <input
              type="text"
              value={email}
              name="e-mail"
              id="text"
              placeholder="Enter your email"
              onChange={(e) => {
                // console.log(e);
                setEmail(e.target.value);
              }}
            />
          </div>

          <div class="form-item">
            <span class="material-icons-outlined">lock</span>
            <input
              type="text"
              name="text"
              value={userName}
              id="text"
              placeholder="user Name"
              onChange={(e) => {
                // console.log(e);
                setUserName(e.target.value);
              }}
            />
          </div>

          <div class="form-item">
            <span class="material-icons-outlined">account_circle</span>
            <input
              type="password"
              value={password}
              name="password"
              id="text"
              placeholder="Enter your password"
              onChange={(e) => {
                // console.log(e);
                setPassword(e.target.value);
              }}
            />
          </div>

          <div class="form-item">
            <span class="material-icons-outlined">account_circle</span>
            <input
              type="text"
              value={Avatar}
              name="password"
              id="text"
              placeholder="Enter your Avatar"
              onChange={(e) => {
                // console.log(e);
                setAvatar(e.target.value);
              }}
            />
          </div>
          

          <button onClick={Sgin} type="submit"> LOGIN </button>
          <p> Or Login Using</p>
          <Link to="/login">login</Link>
           <div class="options">
            <button class="gl">GitHup</button>
          </div>
        </form> 
      </div>
    </>
  );
};
export default Signin;
