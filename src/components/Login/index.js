import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../reducers/users";
import { useDispatch, useSelector } from "react-redux";


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
      navigate("/post");
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
              type="password"
              name="pass"
              value={password}
              id="pass"
              placeholder="password"
              onChange={(e) => {
                // console.log(e);
                setPassword(e.target.value);
              }}
            />
          </div>

          <button onClick={getUser} type="submit"> LOGIN </button>
          <p> Or Login Using</p>
          <div class="options">
            {/* <button class="fb">Facebook</button> */}
            <button class="gl">GitHup</button>
          </div>
          <p>
            New User? <Link to="/signup" onClick={() => navigate(`/task`)}>Create an account</Link>
          </p>
        </form> 
      </div>
    </>
  );
};
export default Login;
