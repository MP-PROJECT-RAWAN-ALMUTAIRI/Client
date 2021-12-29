import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import Nav from "../../components/Nav";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [user, setuser] = useState(null);
  const [userPostss, setUserPostss] = useState([]);
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
    // console.log("...", user.data.post[0].pic);
    console.log("user........", user.data.result);
    console.log("post.........", user.data.post);
    setuser(user.data);
    setUserPostss(user.data.post)
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
                <h2>{user.result.email}</h2>
                <h2>welcome : {user.result.userName}</h2>
                <h2>{user.result.Bio}</h2>
              </div>
              <div className="borderImg">
                <h2>{user.result.following}</h2>
                <h2>{user.result.followers}</h2>
                <h2>{user.result.role}</h2>
                <br></br>
                <br></br>
                <img className="userAvatar" src={user.result.avatar} alt="img" />
              </div>
              </div>
              {/* <---------------------------------------------------------------> */}
              {/* <---------------------------------------------------------------> */}
              {/* <---------------------------------------------------------------> */}
              
              <div className="postDiv">
                {userPostss.length && 
                userPostss.map((item) =>{
                  return(
                    <div key={item._id}>
                    <img className="Picture" src={item.pic} alt="rawan img" />
                    <br></br>
                    <br></br> <h2>user name : {user.result.userName}</h2>
                    <p className="desc"><b>{item.description}</b></p>
                    </div>
                  )
                })}
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
