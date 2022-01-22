import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PasswordChecklist from "react-password-checklist";
import axios from "axios";
import "./style.css";

const Signup = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
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
    try {
      const result = await axios.post(`${BASE_URL}/signup`, {
        email: email,
        userName: userName,
        password: password,
        // role: "61c42cad4b31a32af675468b",
        role: "61c42d094b31a32af675468e",
      });
      console.log(result.data._id, ".............................");
      if (result.status === 200) {
        navigate(`/verify_account/${result.data._id}`);
      } else {
        setMessage(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
      <div class="login">
        <div class="image">
          <img
            src="https://images.unsplash.com/photo-1625321643039-ed4aa7f9ceeb?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYzMjgxMjM5OQ&ixlib=rb-1.2.1&q=85"
            alt=""
          />
        </div>
        <div class="details">
          <h1 class="title">Log in</h1>
          {message ? <div className="message">{message}</div> : ""}
          <form
            className="signupInput"
            onSubmit={(e) => {
              e.preventDefault();
              signup(e);
            }}
          >
            <div class="input">
              <label for="">User Name</label>
              <input
                type="text"
                placeholder="Enter your User Name"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div class="input">
              <label for="">Email</label>
              <input
                type="text"
                placeholder="Enter your email address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div class="input">
              <label for="">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="selector">
              <label
                style={{
                  fontSize: "18px",
                  color: "rgb(255,255,255)",
                  fontWeight: "bold",
                  fontFamily: "Outfit sans-serif",
                  // fontSize: "1.9rem" ,
                  textTransform: "capitalize",
                }}
              >
                Are you Student OR Teacher ?
              </label>
              <select className="select" name="role">
                <option value="61c42d094b31a32af675468e">Teacher</option>
                <option value="61c42cad4b31a32af675468b">Student</option>
              </select>
            </div>
            <input
              id="signupSubmitButton"
              type="submit"
              value="Submit"
              disabled
            />
          </form>
          <button class="login-button">Log in</button>
          <span class="signup">Can't log in? ∙ Sign up for an account</span>
        </div>
      </div>
  );
};
export default Signup;
