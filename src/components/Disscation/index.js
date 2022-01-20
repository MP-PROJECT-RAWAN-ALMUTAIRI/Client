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

  const { id } = useParams();

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getOneComment();
    addDisscation();
  }, []);

  const getOneComment = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/discussion`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
      console.log(
        result.data,
        ".............rawan ............details........."
      );
      setDesscation(result.data);
    } catch (error) {
      console.log(error, "error .....");
    }
  };

  const addDisscation = async () => {
    try {
      const result = await axios.post(
        `${BASE_URL}/questions`,
        {
          question,
        },
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
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

  return (
    <>
      <Nav />

      <br></br>
      <div className="header">
        <h2>Tell Us What is Your Problem : </h2>
        <hr />
        <br></br>

        <div className="textDiss">
          {/* <textarea
            required
            rows="3"
            className="textArea"
            placeholder="set you description"
            type="text"
            onChange={(e) => setQuestion(e.target.value)}
            style={{ color: "black", fontSize: "15px" }}
          /> */}
          <input
            className="textArea"
            type="text"
            name="name"
            onChange={(e) => setQuestion(e.target.value)}
          />
          <br></br>
          <button className="sendDiv" onClick={addDisscation}>
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
                    {state.users.role === "Admin" ||
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
                      className="DissButton"
                      onClick={() => navigate(`/reply/${item._id}`)}
                    >
                      <h2> view</h2>
                    </button>
                    <div className="del">
                      {state.users.role === "Admin" ||
                      item.user._id == state.users.user._id ? (
                        <button
                          className="fa fa-trash"
                          onClick={() => deleteQuestions(item._id)}
                        ></button>
                      ) : (
                        <></>
                      )}
                      {state.users.role === "Admin" ||
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
    </>
  );
};

export default Disscation;
