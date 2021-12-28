import React, { useEffect, useState } from "react";
import Nav from "./../Nav";
// import Footer from "./../Footer";
import "./style.css";
import axios from "axios";
import { storage } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Post = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [post, setPost] = useState(null); // firebase
  const [updatePost, setUpdatePost] = useState("");
  const [updatePic, setUpdatePic] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
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
      console.log(result);
      setPosts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // //add new post
  const addNewPost = async () => {
    console.log(description);
    console.log(url);
    console.log(state.users.token);
    try {
      await axios.post(
        `${BASE_URL}/post`,
        {
          pic: url,
          description,
          // file,
          //   video,
        },
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
      // dispatch(addNewTask(result.data));
      setUrl("");
      setDescription("");
      getAllPosts(state.users.token);
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
      deleteTask(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Nav />
      <br></br>
      <br></br>

      <div>
        <h1> ADD POST ... </h1>
        <progress value={progress} max="100" />
        <br></br>
        <hr />
        <br></br>
        <div>
          <h1>Upload Photo here ... </h1>
          <input type="file" name="post" onChange={handleChange} />
          <button
            className="ProfileBtn"
            onClick={handleUpload}
            style={{ color: "white", fontSize: "15px" }}
          >
            <h1> upload</h1>
          </button>
          <br></br>
          <br></br>
          <h1>Image Description:</h1>
          <br></br>
          <img className="RawImg" src={url} />
          <br></br>
          <textarea
            required
            rows="4"
            className="desc"
            placeholder="set you description"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            style={{ color: "black", fontSize: "15px" }}
          />
          <button className="ProfileBtn" onClick={addNewPost}>
            <h1>Add</h1>
          </button>
          <br></br>
          <br></br>
          <div className="content">
            {posts.length &&
              posts.map((item) => (
                <div key={item._id}>
                  <div className="img">
                    <img src={item.pic} alt="firebase" />
                  </div>
                  <br></br>
                  <br></br>
                  <div className="desc">
                    <b>
                      <h1>{item.description}</h1> 
                    </b>
                  </div>
                  <br></br>
                  <br></br>
                  <button
                    className="ProfileBtn"
                    onClick={() => updateTask(item._id)}
                  >
                    <h1>Update</h1>
                  </button>
                  <button
                    className="ProfileBtn"
                    onClick={() => deleteTask(item._id)}
                  >
                    <h1>Delete</h1>
                  </button>
                  <button
                    className="ProfileBtn"
                    onClick={() => navigate(`/post/${item._id}`)}
                  >
                    <h1> view</h1>
                  </button>
                  <br></br>
                  <br></br>
                  <br></br>
                </div>
              ))}
          </div> 
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};
export default Post;
