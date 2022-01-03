import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";

const Signup = () => {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const state = useSelector((state) => {
    return {
      users: state.users,
      token: state.token,
    };
  });

  const signup = async () => {
    setMessage("");
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, {
      userName: userName,
      email: email,
      password: password,
      role: "61c42cad4b31a32af675468b", // for user
    });
    if (res.status === 201) {
      // navigate("/verify_from_email");
      navigate("/login");
    } else {
      setMessage(res.data.message);
    }
  };

  return (
    <div className="signupDiv">
      <br></br>
      <br></br>
      <h2>Tuwaiq Clube ..</h2>
      <p>We are a Tuwaiq Clube </p>
      <p>
        Note that the button and the form is fixed - they will always be
        positioned to the bottom of the browser window.
      </p>
      <br></br>
      <br></br>
      <div className="divCon">
        {/* {message ? <div className="message">{message}</div> : ""} */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signup(e);
          }}
          style={{ maxWidth: "500px", margin: "auto" }}
        >
          <div className="input-container">
            <i className="fa fa-envelope icon"></i>
            <input
              className="input-field"
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="input-container">
            <i className="fa fa-user icon"></i>
            <input
              className="input-field"
              type="text"
              placeholder="User Name"
              name="email"
              value={userName}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          <div className="input-container">
            <i className="fa fa-key icon"></i>
            <input
              className="input-field"
              type="password"
              placeholder="Password"
              name="psw"
              value={password}
              onChange={(e) => {
                // console.log(e);
                setPassword(e.target.value);
              }}
            />
          </div>

          <button type="submit" onClick={signup} className="btnlogin">
            Signup
          </button>
          OR  
          <Link to="/login"> Login </Link>
        </form>
        <br></br>
      </div>
    </div>
  );
};
export default Signup;
