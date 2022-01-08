import React from "react";
import { useState } from "react";
import { Link ,useNavigate ,useParams} from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import "./style.css";
 
const Signin = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");


  const Sgin = async (e) => {
   
    try {
      e.preventDefault();
      const result = await axios.post(`${BASE_URL}/signup`, {
        email: email,
        userName: userName, 
        password: password,
        role:"61c42cad4b31a32af675468b",// for user
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
    <div>
      <Container>
        <div className="container">
          <form>
            <h1>Signup</h1>
            <p>Please fill in this form to create an account.</p>
            <hr />
            {/* <div className="mesage">{message} </div> */}
            <label for="e-mail">
              <b>Enter you e-mail :</b>
            </label>
            <input
              type="text"
              value={email}
              placeholder="Enter you e-mail"
              name="e-mail"
              id="e-mail"
              required
              onChange={(e) => {
                // console.log(e);
                setEmail(e.target.value);
              }}
            />
            <label for="e-mail">
              <b>Enter you User Name :</b>
            </label>
            <input
              type="text"
              value={userName}
              placeholder="Enter you e-mail"
              name="e-mail"
              id="e-mail"
              required
              onChange={(e) => {
                // console.log(e);
                setUserName(e.target.value);
              }}
            />
            <label for="password">
              <b>Enter you password :</b>
            </label>
            <input
              type="password"
              value={password}
              placeholder="Enter password "
              name="password"
              id="password"
              required
              onChange={(e) => {
                // console.log(e.target.value);
                setPassword(e.target.value);
              }}
            />
            <hr />
            <button onClick={Sgin} className="registerbtn">
              Signup
            </button>
            <Link to="/login">Login </Link>
          </form>
        </div>
      </Container>
    </div>
  );
};
export default Signin;

