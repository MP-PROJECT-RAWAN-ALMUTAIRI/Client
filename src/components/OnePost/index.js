import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Nav from "./../Nav";
import Footer from "./../Footer";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder, MdCreate } from "react-icons/md";

const Onepost = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [cont , setCont] = useState(0); 
  const { id } = useParams();

  const state = useSelector((state) => {
    return state;
  });
  console.log(state, "//////////////////////////////");

  useEffect(() => {
    getOnePosts();
    getAllComment();
  },);

  const getOnePosts = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/post/${id}`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
      console.log(result.data, "getOnePosts");
      console.log(result.data.like);
      setPosts(result.data.result);
      console.log(state.users);
      if (result.data.like.find((like) => like.user === state.users.user._id)) {
        console.log("like............................................");
        setLike(true);
      }
      console.log(result.data.commnet);
      console.log(result, "WOW USER IS NULL HOW ?? !!");
      setComment(result.data);
      getAllComment();
      setNewComment(result.data);
      // setComment("");
    } catch (error) {
      console.log(error);
    }
  };
  
  const addLike = async () => {
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
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Like Removed Successfully'
        })
      } else {
        setLike(true);
        setCont(cont + 1 ); // error ! like conuter is not saved
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Like Add Successfully'
        })
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
      setNewComment("");
      getOnePosts();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Comment Add Successfully'
      })
    } catch (error) {
      console.log(error);
    }
  };
 
  const updatecomment = async (_id) => {
    const comment = prompt("update your comment ... ");
    try {
      const result = await axios.put(`${BASE_URL}/comment/${_id}`,
        {
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
      getAllComment();
      console.log(result, "resultresultresult");
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Comment Updated Successfully'
      })
    } catch (error) {
      console.log(error ," update comment");
    }
  };

  const deleteCommentByAdmin = async (_id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteCommentByAdmin/${_id}`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
      getAllComment();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Comment Deleted Successfully'
      })
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (_id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/comment/${_id}`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
      getAllComment();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Comment Deleted Successfully'
      })
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Nav />
      {/* <h2>{user.result.userName}</h2> */}
      {posts && (
        <div>
          <div className="imgOne">
            <div className="contOne">
              <div className="inm">
                <img className="imgPost"src={posts.pic} alt={posts.pic} />
              </div>
              <br></br>
              <br></br>
              <div className="userNameDiv">
              <img
                      className="ava"
                      src={posts.user.avatar}
                      alt="img"
                      onClick={() => navigate(`/profile/${posts.user._id}`)}
                    />
                    </div>
                    <div>
                  <b>{posts.user.userName}</b> 
                </div>
              <div className="decOnePage">
                <button>
                  {like ? (
                    <MdFavorite className="likeIcon" onClick={addLike} />
                  ) : (
                    <MdFavoriteBorder className="likeIcon" onClick={addLike} />
                  )}
                  {cont}
                </button>
              </div>
            </div>
            <div className="details">
              <div className="paragTitle">
                <b>{posts.title}</b>
              </div>
              <div className="ParaDiss">
                <p>
                  <div>{posts.description}</div>
                </p>
                <div className="git">
                <a href={posts.GitHubLink}>{posts.GitHubLink}</a>
                </div>
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
               resize: none;
              onChange={(e) => setNewComment(e.target.value)}
              style={{ color: "black", fontSize: "15px" }}
            /> */}
          <div className="box">
            <p className="pa">
              <b>Write your comments:</b>
            </p>
            <input
              className="input"
              type="text"
              name="name"
              onChange={(e) => setNewComment(e.target.value)}
            />
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
                    <img src={item.user?.avatar} alt={item.user?.avatar}
                    onClick={() => navigate(`/profile/${item.user._id}`)}/>
                    <p>{item.user?.userName}</p>
                  </div> 
                  <div className="paragraph">
                    <p>{item.comment}</p>
                    <div className="up">
                      <button>
                        <MdCreate 
                        onClick={() => updatecomment(item._id)}>
                          </MdCreate>
                      </button>
                    </div>
                    <div className="del">
                    {state.users.role === "Admin" ||
                    // eslint-disable-next-line
                    item.user._id == state.users.user._id ? (
                        <button
                          className="fa fa-trash"
                          onClick={() => deleteComment(item._id)}
                        ></button>
                     
                    ) : (
                      <></>
                    )}
                     {state.users.role === "Admin" ||
                     // eslint-disable-next-line
                    item.user == state.users.user._id ? (
                        <button id="ad"
                          className="fa fa-trash"
                          onClick={() => deleteCommentByAdmin(item._id)}
                        ></button>
                     
                    ) : (
                      <></>
                    )}
                     </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};
export default Onepost;
