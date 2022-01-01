import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../reducers/users";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

const Login = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const state = useSelector((state) => {
    console.log(state);
    return {
      users: state.users,
      token: state.token,
    };
  });

  const getUser = async (e) => {
    e.preventDefault();
    const result = await axios.post(`${BASE_URL}/login`, {
      email: email,
      password: password,
    });
    console.log(result);
    dispatch(
      userLogin({
        role: result.data.result.role.role,
        token: result.data.token,
        user: result.data.result,
      })
    );
    if (result.data.result.role.role === "Admin") {
      navigate("/users");
    } else {
      navigate("/main");
    }
    if (result.data.result.role.role === "trainer") {
      navigate("/main");
    }
  };

  return (
    <>
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
        <form style={{ maxWidth: "500px", margin: "auto" }}>
          {/* <h2>Register Form</h2> */}
          {/* <div class="input-container">
            <i class="fa fa-user icon"></i>
            <input
              class="input-field"
              type="text"
              placeholder="Username"
              name="usrnm"
            />
          </div> */}

          <div class="input-container">
            <i class="fa fa-envelope icon"></i>
            <input
              class="input-field"
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => {
                // console.log(e);
                setEmail(e.target.value);
              }}
            />
          </div>

          <div class="input-container">
            <i class="fa fa-key icon"></i>
            <input
              class="input-field"
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

          <button type="submit" onClick={getUser} class="btnlogin">
            login
          </button>
        </form>
        <br></br>
      </div>
    </>
  );
};
export default Login;
