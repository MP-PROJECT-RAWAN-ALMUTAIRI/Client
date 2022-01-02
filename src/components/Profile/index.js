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
  const [updatePost, setUpdatePost] = useState("");
  const [updatePic, setUpdatePic] = useState("");
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
    setUserPostss(user.data.post);
  };

  const getAllPosts = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/post`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
      console.log(result);
      setUserPostss(state.users.token);
    } catch (error) {
      console.log(error);
    }
  };
  // edit task
  const updateTask = async (id) => {
    console.log(state.users.token);
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/post/${id}`,
        {
          pic: updatePic,
          description: updatePost,
        },
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
      getAllPosts(state.users.token);
    } catch (error) {
      console.log(error);
    }
    window.location.reload(false);
  };

  // delete post by id
  const deleteTask = async (_id) => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/post/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
      console.log(result);
      deleteTask(state.users.token);
      //deleteTask(result.data);
    } catch (error) {
      console.log(error);
    }
    window.location.reload(false);
  };

  return (
    <div>
      <Nav />
      <div className="AllPage">
        {user ? (
          <div className="contenerImg">
            <div className="card">
              <div className="emailDiv">
                <br></br>
                <br></br>
                <h2>{user.result.email}</h2>
                <h2> Welcome : {user.result.userName}</h2>
                <h2>{user.result.Bio}</h2>
              </div>
              <div className="borderImg">
                <h2>{user.result.following}</h2>
                <h2>{user.result.followers}</h2>
                <img
                  className="userAvatar"
                  src={user.result.avatar}
                  alt="img"
                />
              </div>
            </div>
            <br></br>
            <br></br>
            <hr />
            <br></br>
            <div className="trainers">
              <b> My Projects : </b>
            </div>
            <div className="contMap">
              {userPostss.length &&
                userPostss.map((item) => {
                  return (
                    <div key={item._id}>
                      <div className="BestPro rotate_right">
                        <img
                          src={item.pic}
                          alt="BeastProject"
                          onClick={() => navigate(`/post/${item._id}`)}
                        />
                        <br></br>
                        <br></br> <h2>user name : {user.result.userName}</h2>
                        <br></br>
                        <p>{item.description}</p>
                        {state.users.role === "Admin" ||
                        item.user == state.users.user._id ? (
                          <div>
                            <button
                              className="TimeLineButton"
                              onClick={() => updateTask(item._id)}
                            >
                              <h2>Update</h2>
                            </button>
                            <button
                              className="TimeLineButton"
                              onClick={() => deleteTask(item._id)}
                            >
                              <h2>Delete</h2>
                            </button>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          " "
        )}
      </div>
    </div>
  );
};
export default Profile;
