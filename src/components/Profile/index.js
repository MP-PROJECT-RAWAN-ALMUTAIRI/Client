import React, { useState, useEffect } from "react";
import axios from "axios";
import { storage } from "./../firebase";
import "./style.css";
import Nav from "../../components/Nav";
import Footer from "./../Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import { MdModeEditOutline } from "react-icons/md";
// import TextField from "@mui/material/TextField";

//const MySwal = withReactContent(Swal);

const Profile = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [user, setuser] = useState(null);
  const [userPostss, setUserPostss] = useState([]);
  const [url, setUrl] = useState("");
  const [post, setPost] = useState(null); // firebase
  const [progress, setProgress] = useState(0);
  const { id } = useParams();

  // const [updateavatar, setUpdateavatar] = useState("");
  // const [updatePic, setUpdatePic] = useState("");

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

  // update avatar

  const editAvatar = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/update/${id}`,
        {
          avatar: url,
        },
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  // delete post by id
  const deleteTask = async (_id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/post/${_id}`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
      getUser();
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
                  <img className="userImg" src={user.result.avatar} alt="img" />
                  {/* <MdModeEditOutline
                    className="editUserIcon"
                    onClick={editAvatar}
                  /> */}
                  <>
                    {/* {state.users.role === "Admin" ||
                    user[0]?._id == state.users.user._id ? ( */}
                    <div>
                      <progress value={progress} max="100" />
                      <input type="file" name="post" onChange={handleChange} />
                      <button
                        className="uploadDiv"
                        onClick={handleUpload}
                        style={{ color: "white", fontSize: "15px" }}
                      >
                        <b> upload </b>
                      </button>

                      <img className="RawImg" src={url} />
                      <button className="sendDiv" onClick={editAvatar}>
                        <b>Add</b>
                      </button>
                    </div>
                     {/* ) : (
                      <></>
                    )}  */}
                  </>
                </div>
                <div className="profileInfo">
                  <p>User Name :{user.result.userName}</p>
                  <p>E-mail :{user.result.email}</p>
                  <p>Bio :{user.result.Bio}</p>
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
                        {state.users.role === "Admin" ||
                        item.user == state.users.user._id ? (
                          <button
                            className="TimeLineButton"
                            onClick={() => deleteTask(item._id)}
                          >
                            <h2>Delete</h2>
                          </button>
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
