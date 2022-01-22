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
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // eslint-disable-next-line
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
        role: "61c42cad4b31a32af675468b",
      });
      if (result.status === 200) {
        navigate(`/verify_account/${result.data._id}`);
      } else {
        setMessage(result.data.message);
      }
    } catch (error) {
      // console.log(error);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="signupWrapper">
      <main className="signupPanel">
        <div className="signupPanel__half signupHalf--first">
          <PasswordChecklist
            rules={[
              "minLength",
              "specialChar",
              "number",
              "capital",
              "lowercase",
            ]}
            minLength={6}
            value={password}
            onChange={(isValid) => {
              if (isValid) {
                const button = document.querySelector("#signupSubmitButton");
                button.disabled = false;
              } else {
                const button = document.querySelector("#signupSubmitButton");
                button.disabled = true;
              }
            }}
          />
          <button id="loginButton" onClick={() => navigate("/login")}>
            or go to login
          </button>
        </div>
        <div className="signupPanel__half signupHalf--second">
          <h2>Signup</h2>
          {message ? <div className="message">{message}</div> : ""}
          <form
            className="signupInput"
            onSubmit={(e) => {
              e.preventDefault();
              signup(e);
            }}
          >
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="selector">
            <label
                style={{
                  fontSize: "18px",
                  color: "rgb(255,255,255)",
                  fontWeight: "bold",
                  fontFamily: "Outfit sans-serif" ,
                  textTransform: "capitalize" ,
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
        </div>
      </main>
    </div>
  );
};

export default Signup;
