import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "./../Nav";
// import Footer from "./../Footer";
// import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { Container } from "react-bootstrap";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const Onepost = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();
  const [like, setLike] = useState(null);
  const [comment, setComment] = useState("");
  const [ratting, setRatting] = useState("");
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getOnePosts();
    getAllComment();
    // console.log(url);
  }, []);

  const getOnePosts = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/post/${id}`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
      console.log(result.data);
      // console.log(posts.comment);
      setPosts(result.data);
      if (result.data.like.find((like) => like.user === state.users._id)) {
        setLike(true);
      }
      // setLike(result.data);
      // setComment(result.data);

      // getAllComment();
      setNewComment("");
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };
  //
  const addLike = async () => {
    console.log(state.users.token);
    try {
      const result = await axios.post(
        `${BASE_URL}/Likeposts/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
      console.log(result.data , ".....like ....................");
    } catch (error) {
      console.log(error);
    }
  };

  const getAllComment = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/comment/${id}`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
      console.log(result);
      setComment(result.data); 
    } catch (error) {
      console.log(error);
    }
  };

  const addNewComment = async () => {
    console.log(comment);
    console.log(state.users.token);
    try {
      const result = await axios.post(
        `${BASE_URL}/comment/${id}`,
        {
          comment,
          post: id,
        },
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
      console.log("new comment", result.data);
      getOnePosts();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Nav />
      {/* <Container> */}
      {posts && (
        <div>
          <img src={posts.result.pic} />
          <div className="decOnePage">
            <button> 
                {like ? (
                  <MdFavorite className="likeIcon" onClick={addLike} />
                ) : (
                  <MdFavoriteBorder className="unLikeIcon" onClick={addLike} />
                )}
            </button>
            <p>{posts.result.description}</p> 
          </div>
          <textarea
            required
            rows="4"
            className="inputTextArea"
            placeholder="set you description"
            type="text"
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="btn" onClick={addNewComment}>
            <h2>Add Comment</h2>
          </button>
          <div className="content">
            {posts.commnet.map((ele) => {
              return (
                <div>
                  <p>user: {ele.userName}</p>
                  <br></br>
                  <p>comment: {ele.comment}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* </Container>
      <Footer /> */}
    </div>
  );
};
export default Onepost;
