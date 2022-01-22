import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "./../Nav";
import Footer from "./../Footer";
import "./style.css";

const MainPage = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [post, setPost] = useState([]); // trainer avatar...
  const [user, setUser] = useState([]);
  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getAllPosts();
    getUser();
    // eslint-disable-next-line
  }, []);

  const getUser = async () => {
    const user = await axios.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${state.users.token}`,
      },
    });
    setUser(user.data);
  };

  const getAllPosts = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/post`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
      setPost(result.data.slice(-3)); // display last 3 post
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mainPage">
      <Nav />
      <div className="mainPic">
      </div>
      <br></br>
      <br></br>
      <b className="clube">Tuwaiq Club </b>
      <b className="clube-tuwaiq">We are a platform that has been structured in the English Language by Saudi spirit who is a skilled programmer from the Tuwaiq academy team, leading its execution. The goal of its establishment is to collect the projects and tasks for the students who are in the academy and to help local ambitious programmers to broaden their knowledge in the projects.</b>
      <br></br>
      <div className="trainers">
        <b>Tuwaiq Trainers</b>
      </div>
      <div className="TuwaiqTrainers">
        {user.length &&
          user
          // eslint-disable-next-line
            .filter((ele) => {
              if (ele.role === "61c42d094b31a32af675468e") {
                return ele;
              }
            })
            .map((item) => {
              return (
                <div key={item._id}>
                  <div className="minDivTimeLine">
                    <img
                      className="imgDivMain"
                      src={item.avatar}
                      alt="img"
                      onClick={() => navigate(`/profile/${item._id}`)}
                    />
                    <br></br>
                    <br></br>
                    <div className="TimeLine">
                      <b>
                        <h2 className="parag">
                          <b>Teacher:  {item.userName} </b>
                        </h2>
                      </b>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    <br></br>
      <div className="trainers">
        <b>Latest Project</b>
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
                  <div className="TimeLine">
                      <b>
                        <h2 className="parag">
                          <b>{item.title}</b>
                        </h2>
                      </b>
                    </div>
                </div>
              </div>
            );
          })}
      </div>
      <br></br>
      <Footer />
    </div>
  );
};
export default MainPage;
