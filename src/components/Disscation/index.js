import React, { useEffect, useState } from "react";
import Nav from "./../Nav";
import Footer from "./../Footer";
import Swal from "sweetalert2";
import axios from "axios";
import { MdModeEditOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
const Disscation = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [discussion, setDesscation] = useState([]); // or null ?
  const [question, setQuestion] = useState(""); //for Answer the question

<<<<<<< HEAD
=======
  const { id } = useParams();
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getOneComment();
    addDisscation();
    // eslint-disable-next-line
  }, []);

  const getOneComment = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/discussion`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
<<<<<<< HEAD
=======
      console.log(
        result.data,
        ".............rawan ............details........."
      );
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225
      setDesscation(result.data);
    } catch (error) {
      console.log(error, "error .....");
    }
  };

  const addDisscation = async () => {
    try {
        await axios.post(
        `${BASE_URL}/questions`,
        {
          question ,
        },
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
<<<<<<< HEAD
=======
      console.log(result.data, "Add Disscation |||||||||||");
      getOneComment();
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Question Add successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updateQuestion = async (_id) => {
    const question = prompt("update your question ... ");
    try {
      const result = await axios.put(
        `${BASE_URL}/updQuestion/${_id}`,
        {
          question: question,
        },
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
      getOneComment();
      console.log(result, "resultresultresult");
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Question Updated successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteQuestionByAdmin = async (_id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/deleteQuestionByAdmin/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
      getOneComment();
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Question Deleted successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteQuestions = async (_id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/questions/${_id}`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225
      getOneComment();
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
<<<<<<< HEAD
        title: "Question Add successfully",
=======
        title: "Question Deleted successfully",
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updateQuestion = async (_id) => {
    const question = prompt("update your question ... ");
    try {
          await axios.put(
        `${BASE_URL}/updQuestion/${_id}`,
        {
          question: question,
        },
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
      getOneComment();
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Question Updated successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteQuestionByAdmin = async (_id) => {
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
        `${process.env.REACT_APP_BASE_URL}/deleteQuestionByAdmin/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
      getOneComment();
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
 
  const deleteQuestions = async (_id) => {
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
        `${process.env.REACT_APP_BASE_URL}/questions/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
      getOneComment();
    } else if (
      /* Read more about handling dismissals below */
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
 
  return (
    <div>
      <Nav />

      <br></br>
      <div className="header">
        <h2>Tell Us What is Your Problem : </h2>
        <hr />
        <br></br>

        <div className="textDiss">
          <input
            className="textArea"
            type="text"
            name="name"
            onChange={(e) => setQuestion(e.target.value)}
<<<<<<< HEAD
=======
            style={{ color: "black", fontSize: "15px" }}
          /> */}
          <input
            className="textArea"
            type="text"
            name="name"
            onChange={(e) => setQuestion(e.target.value)}
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225
          />
          <br></br>
          <button className="addDivbtn" onClick={addDisscation}>
            <h2> Send </h2>
          </button>
        </div>
        {discussion.length &&
          discussion.map((item) => {
            return (
              <div className="disContainer">
                <div key={item._id}>
                  <div className="discussionDiv">
                    {item.user.userName}
                    <p>Question: </p>
<<<<<<< HEAD
                    {
                    // eslint-disable-next-line
=======
                    {state.users.role === "Admin" ||
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225
                    item.user._id == state.users.user._id ? (
                      <MdModeEditOutline
                        className="editUserIcon"
                        onClick={() => updateQuestion(item._id)}
                      ></MdModeEditOutline>
                    ) : (
                      <></>
                    )}
                    <p>{item.question}</p>
                    <br></br>
                    <button
<<<<<<< HEAD
                      className="addDivbtn"
=======
                      className="DissButton"
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225
                      onClick={() => navigate(`/reply/${item._id}`)}
                    >
                      <h2> view</h2>
                    </button>
                    <div className="del">
<<<<<<< HEAD
                      { 
                      // eslint-disable-next-line
=======
                      {state.users.role === "Admin" ||
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225
                      item.user._id == state.users.user._id ? (
                        <button
                          className="fa fa-trash"
                          onClick={() => deleteQuestions(item._id)}
                        ></button>
                      ) : (
                        <></>
                      )}
                      {state.users.role === "Admin" ||
<<<<<<< HEAD
                      // eslint-disable-next-line
=======
>>>>>>> 1a186e43f253f872297fd47a65e38e39aa136225
                      item.user == state.users.user._id ? (
                        <button
                          id="ad"
                          className="fa fa-trash"
                          onClick={() => deleteQuestionByAdmin(item._id)}
                        ></button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <Footer />
    </div>
  );
};

export default Disscation;
