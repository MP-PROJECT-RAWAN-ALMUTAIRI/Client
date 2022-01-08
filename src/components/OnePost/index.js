import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "./../Nav";
import Footer from "./../Footer";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const Onepost = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();

  const state = useSelector((state) => {
    return state;
  });
  console.log(state, "//////////////////////////////");

  useEffect(() => {
    getOnePosts();
    getAllComment();
    // getUser();
    // console.log(url);
  }, []);

  const getOnePosts = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/post/${id}`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
      console.log(result.data, "0000000000000000000");
      console.log(result.data.like);
      // console.log(posts.comment);
      setPosts(result.data.result);
      console.log(state.users);
      if (result.data.like.find((like) => like.user === state.users.user._id)) {
        console.log("like............................................");
        setLike(true);
      }
      console.log(result.data.commnet);
      console.log(result, "WOW USER IS NULL HOW ?? !!");
      // console.log(result.data. ,,,,)

      // posts.result
      // setLike(result.data);
      setComment(result.data);

      getAllComment();
      setNewComment("");
      setNewComment(result.data);
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
      if (like) {
        setLike(false);
      } else {
        setLike(true);
      }
      console.log(result.data, ".....like ....................");
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
    console.log(newComment);
    console.log(state.users.token);
    try {
      const result = await axios.post(
        `${BASE_URL}/comment/${id}`,
        {
          comment: newComment,
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
        {/* <h2>{user.result.userName}</h2> */}
        {posts && (
          <div>
            <div className="imgOne">
              <div className="contOne">
                <div className="inm">
                  <img src={posts.pic} />
                </div>
                {/* <div className="userNameDiv">
                  <b>User Name: {posts.user.userName}</b>
                </div> */}
                <div className="decOnePage">
                  <button>
                    {like ? (
                      <MdFavorite className="likeIcon" onClick={addLike} />
                    ) : (
                      <MdFavoriteBorder
                        className="likeIcon"
                        onClick={addLike}
                      />
                    )}
                  </button>
                </div>
              </div>
              <div className="details">
              <div className="paragTitle">
              <b>{posts.title}</b>
              </div>
              <div className="ParaDiss">
              <p><div>{posts.description}</div></p>
              <div className="nm"></div>
              </div>
            </div>
            </div>
            {/* <textarea
              required
              rows="2"
              className="descTimeLine"
              placeholder="leave a comment..."
              type="text"
              onChange={(e) => setNewComment(e.target.value)}
              style={{ color: "black", fontSize: "15px" }}
            /> */} 
            <div className="box"> 
            <p className="pa"><b>Write your comments:</b></p>
             <input className="input" type="text" name="name" onChange={(e) => setNewComment(e.target.value)} /> 
             <br></br>
            
            <button className="btnOne" onClick={addNewComment}>
              <h2>Add Comment</h2>
            </button>
            </div>
            {/* className="content" */}
            <div className="boxcomments">
              {comment.length &&
                comment.map((item) => (
                  <div className="allInfo" key={item._id}>
                    <div className="divComment">
                      <img src={item.user.avatar} />
                      <p>{item.user.userName}</p>
                    </div>
                    <div className="paragraph">
                      <p>{item.comment}</p>
                      {state.users.role._id === "Admin" ? (
                        <div>
                          <button className="btn">
                            Delete {/* <i class="fa fa-trash"></i> */}
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      {/* </Container> */}
      <Footer />
    </div>
  );
};
export default Onepost;
