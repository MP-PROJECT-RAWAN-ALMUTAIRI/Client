import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "./../Nav";
import Footer from "./../Footer";
import "./style.css";

const MainPage = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [post, setPost] = useState([]); // trainer avatar...
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const state = useSelector((state) => {
    return state;
  });

  //console.log(post, "......post ....................");

  useEffect(() => {
    getAllPosts();
    getUser();
    // eslint-disable-next-line
    // console.log(url);
  }, []);

  const getUser = async () => {
    const user = await axios.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${state.users.token}`,
      },
    });
    console.log("user rawan .............", user.data);
    // console.log("post", user.data.post);
    setUser(user.data);
  };

  const getAllPosts = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/post`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
      console.log(result.data, "post .....................2022");
      setPost(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mainPage">
      <Nav />
      <div className="BeastProject"></div>
      <br></br>
      <br></br>
      <div className="trainers">
        <b>Tuwaiq Trainers</b>
      </div>
      <div className="TuwaiqTrainers">
        {/* <div className="minTuwaiq"> */}
        {user.length &&
          user
            .filter((ele) => {
              console.log(ele.role);
              if (ele.role === "61c42d094b31a32af675468e") {
                return ele;
              }
            })
            .map((item) => {
              return (
                <div key={item._id}>
                  <div className="minDivTimeLine">
                    <img
                      className="imgDiv"
                      src={item.avatar}
                      alt="img"
                      onClick={() => navigate(`/profile/${item._id}`)}
                    />
                    <br></br>
                    <br></br>
                    <div className="TimeLine">
                      <b>
                        <h2 className="parag">
                          <b> {item.userName} </b>
                        </h2>
                      </b>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
     <hr />
    <br></br>
      <div className="trainers">
        <b>Best Project</b>
      </div>
      <br></br>
      <br></br>
      <div className="TuwaiqProjectMain">
        {post.length &&
          post.map((item) => {
            return (
              <div key={item._id}>
                <div className="userManiPage">
                  <img
                    className="imgDivMain"
                    src={item.pic}
                    alt="BeastProject"
                    onClick={() => navigate(`/post/${item._id}`)}
                  />
                  <br></br>
                  {/* <br></br> <h4>user name :{item.userName}</h4> */}
                  <div className="TimeLineDecrrepton">
                    <b className="paragMain">{item.title}</b>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <Footer />
    </div>
  );
};
export default MainPage;
