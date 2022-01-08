import React, { useState, useEffect } from "react";
import axios from "axios";
import { storage } from "./../firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MdModeEditOutline } from "react-icons/md";
import TextField from "@mui/material/TextField";
import "./style.css";
import Nav from "../../components/Nav";
import Footer from "./../Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const MySwal = withReactContent(Swal);

const Profile = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [user, setuser] = useState(null);
  const [userPostss, setUserPostss] = useState([]);
  const [updateavatar, setUpdateavatar] = useState("");
  const [updatePic, setUpdatePic] = useState("");
  const [url, setUrl] = useState("");
  const [post, setPost] = useState(null); // firebase
  const [progress, setProgress] = useState(0);
  const { id } = useParams();

  let navigate = useNavigate();
  const state = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setPost(e.target.files[0]);
    }
  };

  // useEffect(() => {
  //   if (url.trim().length > 0) {
  //     updateTask();
  //   }
  //   // eslint-disable-next-line
  // }, [url]);

  const handleUpload = () => {
    console.log("post ///////////", post);
    const uploadTask = storage.ref(`image/${post.name}`).put(post);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("image")
          .child(post.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url, "/////////////////");
            setUrl(url);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  };

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
      //console.log(result);
      setUserPostss(state.users.token);
    } catch (error) {
      console.log(error);
    }
  };

  // update avatar

  const editAvatar = async () => {
    console.log(state.users.token);
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/update/${id}`,
        {
          avatar: url,
          // description: updatePost,
        },
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
      getAllPosts();
    } catch (error) {
      console.log(error);
    }
  };
  //   <button
  //   className="uploadDiv"
  //   onClick={handleUpload}
  //   style={{ color: "white", fontSize: "15px" }}
  // >
  //   <b> upload </b>
  // </button>
  //}
  // const editAvatar = async () => {
  //   const { value: file } = await MySwal.fire({
  //     title: "New Avatar",
  //     input: "file",
  //     inputLabel: "Chose your image",
  //     showCancelButton: true,
  //     confirmButtonText: "Update",
  //     confirmButtonColor: "#1D3557",
  //     cancelButtonText: "Cancel",
  //     reverseButtons: true,
  //     inputAttributes: {
  //       accept: "image/*",
  //       "aria-label": "Upload your profile picture",
  //     },
  //   });

  //   if (file) {
  //     handleUpload(file);
  //   }
  // };

  // const updateTask = async (id) => {
  //   console.log(state.users.token);
  //   try {
  //     await axios.put(
  //       `${process.env.REACT_APP_BASE_URL}/update/${id}`,
  //       {
  //         avatar: url,
  //         // description: updatePost,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${state.users.token}`,
  //         },
  //       }
  //     );
  //     getAllPosts();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // delete post by id
  const deleteTask = async (id) => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/post/${id}`,
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
  };

  return (
    <div>
      <Nav />

      <div className="AllPage">
        {user ? (
          <div className="contenerImg">
            <div className="mainCard">
              <div className="emailDiv">
                <br></br>
                <br></br>
                <div className="borderImg">
                  <progress value={progress} max="100" />
                  <img className="userImg" src={user.result.avatar} alt="img" />
                  {/* <MdModeEditOutline
                    className="editUserIcon"
                    onClick={editAvatar}
                  /> */}
                  <input type="file" name="post" onChange={handleChange} />
                  <button
                    className="uploadDiv"
                    onClick={handleUpload}
                    style={{ color: "white", fontSize: "15px" }}
                  >
                    <b> upload </b>
                  </button>
                </div>
                <img className="RawImg" src={url} />
                <button className="sendDiv" onClick={editAvatar}>
                <b>Add</b>
              </button>
                <div className="profileInfo">
                  <p>User Name :{user.result.userName}</p>
                  <p>E-mail :{user.result.email}</p>
                  <p>Bio :{user.result.Bio}</p>
                  <p>GitHub Link : </p>
                  <br></br>
                  <br></br>
                </div>
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
                            {/* <button
                              className="TimeLineButton"
                              onClick={() => updateTask(item._id)}
                            >
                              <h2>Update</h2>
                            </button> */}
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
      <Footer />
    </div>
  );
};
export default Profile;
