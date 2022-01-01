import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "./../Nav";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
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
      <br></br>
      <br></br>
      <div className="BeastProject">
        <Carousel
          className="carousel"
          autoPlay={true}
          infiniteLoop={true}
          interval={2000}
          // showStatus={false}
          thumbWidth={50}
          showIndicators={false}
          showThumbs={false}
          dynamicHeight={false}
          labels={true}
          stopOnHover={false}
        >
          {post.length &&
            post.map((item) => {
              return (
                <div key={item._id}>
                  <div>
                    <img src={item.pic} alt="BeastProject" />
                    <br></br>
                    <p>{item.description}</p>
                  </div>
                </div>
              );
            })}
        </Carousel>
      </div>
      <br></br>
      <br></br>
      <div className="trainers">
        <b>Tuwaiq Trainers</b>
      </div>
      <div className="TuwaiqTrainers">
        {/* <div className="minTuwaiq"> */}
        {user.length &&
          user.map((item) => {
            return (
              <div key={item._id}>
                <img
                  className="userAvatar"
                  src={item.avatar}
                  alt="img"
                  onClick={() => navigate(`/profile/${item._id}`)}
                />
                <br></br>
                <br></br>
                <div className="userNameStyle">
                  <b> {item.userName} </b>
                </div>
              </div>
            );
          })}
        {/* {console.log(state.users.user._id, "state")} */}
        {/* </div> */}
      </div>
      <br></br>
      <br></br>
      <div className="trainers">
        <b>Best Project</b>
      </div>
      <br></br>
      <br></br>
      <div className="TuwaiqTrainers">
        {post.length &&
          post.map((item) => {
            return (
              <div key={item._id}>
                <img
                  className="userAvatar"
                  src={item.pic}
                  alt="BeastProject"
                  onClick={() => navigate(`/post/${item._id}`)}
                />
                <br></br>
                {/* <br></br> <h4>user name :{item.userName}</h4> */}
                <div className="userNameStyle">
                  <b>{item.description}</b>
                </div>
              </div>
            );
          })}
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default MainPage;
