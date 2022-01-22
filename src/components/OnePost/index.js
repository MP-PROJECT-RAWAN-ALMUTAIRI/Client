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
<<<<<<< HEAD
=======
  //const [user, setUser] = useState(null);
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225
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

  useEffect(() => {
    getOnePosts();
    getAllComment();
<<<<<<< HEAD
    // eslint-disable-next-line
  },[]);
=======
  }, []);
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225

  const getOnePosts = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/post/${id}`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
<<<<<<< HEAD
=======
      console.log(result.data, "getOnePosts");
      console.log(result.data.like);
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225
      setPosts(result.data.result);
      if (result.data.like.find((like) => like.user === state.users.user._id)) {
        setLike(true);
      }
<<<<<<< HEAD
      setComment(result.data);
      getAllComment();
      setNewComment(result.data);
=======
      console.log(result.data.commnet);
      console.log(result, "WOW USER IS NULL HOW ?? !!");
      setComment(result.data);
      getAllComment();
      setNewComment(result.data);
      // setComment("");
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225
    } catch (error) {
      console.log(error);
    }
  };
  
  const addLike = async () => {
    try {
       await axios.post(
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
     
      setComment(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewComment = async () => {
    try {
    await axios.post(
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
<<<<<<< HEAD
=======
      console.log("new comment", result.data);
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225
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
<<<<<<< HEAD
=======
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
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225
    try {
    await axios.put(`${BASE_URL}/comment/${_id}`,
        {
          comment: comment,
        },
<<<<<<< HEAD
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
=======
      });
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225
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
<<<<<<< HEAD
        title: 'Comment Updated Successfully'
=======
        title: 'Comment Deleted Successfully'
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225
      })
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCommentByAdmin = async (_id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(async(result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/deleteCommentByAdmin/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
      getAllComment();
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })
  };

  const deleteComment = async (_id) => {
<<<<<<< HEAD
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(async(result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/comment/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
      getAllComment();
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
=======
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
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225
    }
  })
  };
    
  return (
    <div>
      <Nav />
      {posts && (
        <div>
          <div className="imgOne">
            <div className="contOne">
              <div className="inm">
<<<<<<< HEAD
                <img className="imgPost"src={posts.pic} alt={posts.pic} />
=======
                <img className="imgPost"src={posts.pic} />
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225
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
<<<<<<< HEAD
                <br></br>
=======
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225
                <div className="git">
                <a href={posts.GitHubLink}>{posts.GitHubLink}</a>
                </div>
                <div className="nm"></div>
              </div>
            </div>
          </div>
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
          <div className="boxcomments">
            {comment.length &&
              comment.map((item) => (
                <div className="allInfo" key={item._id}>
                  <div className="divComment">
<<<<<<< HEAD
                    <img src={item.user?.avatar} alt={item.user?.avatar}
=======
                    <img src={item.user?.avatar}
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225
                    onClick={() => navigate(`/profile/${item.user._id}`)}/>
                    <p>{item.user?.userName}</p>
                  </div> 
                  <div className="paragraph">
                    <p>{item.comment}</p>
                    <div className="up">
<<<<<<< HEAD
                    {state.users.role === "Admin" &&
                    // eslint-disable-next-line
                    item.user._id == state.users.user._id ? (
                      <button>
                      <MdCreate 
                      onClick={() => updatecomment(item._id)}>
                        </MdCreate>
                    </button>
                     
                    ) : (
                      <></>
                    )}
=======
                      <button>
                        <MdCreate 
                        onClick={() => updatecomment(item._id)}>
                          </MdCreate>
                      </button>
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225
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
