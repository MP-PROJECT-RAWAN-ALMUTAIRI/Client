import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import Nav from "../../components/Nav";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [user, setuser] = useState(null);
  const [userPostss, setUserPostss] = useState(null);
  const { id } = useParams();

  let navigate = useNavigate();
  const state = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const getUser = async () => {
    const user = await axios.get(`${BASE_URL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${state.users.token}`,
      },
    });
    console.log("user", user.data.result);
    console.log("post", user.data.post);
    setuser(user.data);
  };

  return (
    <>
      <Nav />
      <div>
        <>
          {user ? (
            <div className="contenerImg">
              <br></br> 
              <br></br>
              <div className="userInfo">
              <div className="emailDiv">
                <h1>{user.result.email}</h1>
                <h1>welcome : {user.result.userName}</h1>
                <h1>{user.result.Bio}</h1>
              </div>
              <div className="borderImg">
                <h1>{user.result.following}</h1>
                <h1>{user.result.followers}</h1>
                <h1>{user.result.role}</h1>
                <br></br>
                <br></br>
                <img className="userAvatar" src={user.result.avatar} alt="img" />
              </div>
              </div>
              <div className="postDiv">
              <img className="Picture" src={user.post.pic} alt="img" />
              <br></br>
              <br></br>
              <p className="desc"><b>{user.post.description}</b></p>
              </div>
            </div> 
          ) : (
            " "
          )}
        </>
      </div>
    </>
  );
};
export default Profile;
