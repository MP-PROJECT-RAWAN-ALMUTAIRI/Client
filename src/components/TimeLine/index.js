import React, { useEffect, useState } from "react";
import Nav from "./../Nav";
import Footer from "./../Footer";
import "./style.css";
import axios from "axios";
import Swal from "sweetalert2";
import { storage } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Post = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [post, setPost] = useState(null); // firebase
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [title, settitle] = useState("");
  const [GitHubLink , setGithub] = useState(""); 
  const [progress, setProgress] = useState(0);
  const { id } = useParams();

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getAllPosts();
    // console.log(url);
  }, []);

  const handleChange = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setPost(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    console.log("post", post);
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
            console.log(url);
            setUrl(url);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  };

  const getAllPosts = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/post`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
      // console.log(result);
      setPosts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  ////add new post
  const addNewPost = async () => {
    console.log(description);
    console.log(url);
    console.log(state.users.token);
    try {
      await axios.post(
        `${BASE_URL}/post`,
        {
          pic: url,
          title,
          GitHubLink,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
      setUrl("");
      setDescription("");
      settitle("");
      getAllPosts();
      Swal.fire("Done", "", "success");
    } catch (error) {
      console.log(error);
    }
  };

  const deletePostByAdmin = async (id) => {
    console.log(id);
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/deletePostByAdmin/${id}`,
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
      getAllPosts();
      Swal.fire("Done", "", "success");
      console.log(result.data,"Delete post");
    } catch (error) {
      console.log(error ,"error ");
    }
  };

  return (
    <div>
      <Nav />
      <br></br>
      <div className="header">
        <h1> Upload Your Project Demo </h1>
        <progress className="prog" value={progress} width="33rem"/>
        <hr />
        <br></br>
        <div>
          <div className="info">
            <div className="infoDiv">
              <h2>Upload Project Image ... </h2>
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

            <div className="textDiss">
              <div className="titleDiv">
                Title
                <input 
                  required
                  className="titleInput"
                  type="text"
                  value={title}
                  placeholder="set your project title"
                  onChange={(e) => {
                    settitle(e.target.value);
                  }}
                 
                />
              </div>
              <div className="Repo">
              Repository Link:
              <input 
                  required
                  className="titleInput"
                  type="text"
                  value={GitHubLink}
                  placeholder="set your project Repository Link"
                  onChange={(e) => {
                    setGithub(e.target.value);
                  }}
                 
                />
              </div>
              <textarea
                required
                rows="3"
                className="textArea"
                placeholder="set you description"
                type="text"
                resize="none"
                onChange={(e) => setDescription(e.target.value)}
              />
              <br></br>
              <button className="sendDiv" onClick={addNewPost}>
                <b>Add</b>
              </button>
            </div>
          </div>
          <br></br>

          <div className="DivTimeLine">
            {posts.length &&
              posts.map((item) => (
                <div key={item._id}>
                  <div className="minDivTimeLine">
                    <img
                      className="imgDiv"
                      src={item.pic}
                      alt="project image"
                    />

                    <div className="TimeLineTitle">
                      <b>
                        <h2 className="parag">{item.title}</h2>
                      </b>
                    </div>
                    <div className="TimeLine">
                      {state.users.role === "Admin" ||
                      item.user._id == state.users.user._id ? (
                        <button
                          className="TimeLineButton"
                          onClick={() => deletePostByAdmin(item._id)}
                        >
                          <b>Delete</b>
                        </button>
                      ) : (
                        <></>
                      )}
                      <div>
                      <button
                        className="TimeLineButton"
                        onClick={() => navigate(`/post/${item._id}`)}
                      >
                        <b> view</b>
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Post;
