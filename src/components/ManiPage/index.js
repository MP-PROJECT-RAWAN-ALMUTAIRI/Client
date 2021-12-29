import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "./../Nav";
import "./style.css";

const MainPage = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [post, setPost] = useState([]); // trainer avatar...
  const { id } = useParams();
  const state = useSelector((state) => {
    return state;
  });

  console.log(post, "......post ....................");

  useEffect(() => {
    getAllPosts();
    // getUser();
    // eslint-disable-next-line
    // console.log(url);
  }, []);

  // const getUser = async () => {
  //   const user = await axios.get(`${BASE_URL}/user/${id}`, {
  //     headers: {
  //       Authorization: `Bearer ${state.users.token}`,
  //     },
  //   });
  //   console.log("user", user.data.result);
  //   console.log("post", user.data.post);
  //   setuser(user.data);
  // };

  const getAllPosts = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/post`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
      console.log(result);
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
        <img src="./tuwaiq.jpg" alt="BeastProject" />
      </div>
      <p className="trainers">Tuwaiq Trainers</p>
      <div className="TuwaiqTrainers">
        {console.log(state.users.user._id, "state")}

        <div className="minTuwaiq">
          {/* <img className="userAvatar" src={post.result.avatar} alt="img" /> */}
          <img 
            src="./avatar.png"
            alt="TuwaiqTrainers"
            onClick={() => navigate(`/profile/${state.users.user._id}`)}
          />
          </div>
          <div className="minTuwaiq">
           <img
            src="./avatar.png"
            alt="TuwaiqTrainers"
            onClick={() => navigate(`/profile/${state.users.user._id}`)}
          />
          </div>
          <div className="minTuwaiq">
           <img
            src="./avatar.png"
            alt="TuwaiqTrainers"
            onClick={() => navigate(`/profile/${state.users.user._id}`)}
          />
        </div>
      </div>
      <br></br>
      <br></br>
      <p className="Bproject">
        <b>Best Project</b>
      </p>
      <br></br>
      <br></br>
      <div className="contMap">
      {post.length &&
        post.map((item) => {
          return (
            <div key={item._id}>
              <div className="BestPro rotate_right">
                <img
                  src={item.pic}
                  alt="BeastProject"
                  onClick={() => navigate(`/post/${item._id}`)}
                />
                <br></br>
                <p>{item.description}</p> 
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
