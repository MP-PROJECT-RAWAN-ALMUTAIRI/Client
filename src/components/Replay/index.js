import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Nav from "../Nav";
import Footer from "./../Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import "./style.css";

const Disscation = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [discussion, setDesscation] = useState([]); // or null ?
  const [question, setQuestion] = useState(null);
  const [reply, setRely] = useState(""); // for answer .....

  const { id } = useParams();

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getOneQuestion();
    getOneComment();
    addAnswer();
    // eslint-disable-next-line
  }, []);

  const getOneQuestion = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/one/${id}`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
      console.log(result.data, ".............rawan....question....");
      setQuestion(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOneComment = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/reply/${id}`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
      setDesscation(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addAnswer = async () => {
    try {
      const result = await axios.post(
        `${BASE_URL}/reply/${id}`,
        {
          reply,
          question: id,
        },
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
      console.log("new answer ||||||| 888888888", result.data);
      setRely("");
      getOneComment();
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
        title: 'Answer Add successfully'
      })
    } catch (error) {
      console.log(error);
    }
  };

  // delete Answer by id
  const deleteAnswer = async (_id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/reply/${_id}`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
      getOneComment();
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
        title: 'Answer Delelted successfully'
      })
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Nav />
      <br></br>
      <div>
        <div className="styleDiv">
          {question && <p> Question :{question.question}</p>}
          <br></br>
          Answer :
          <div className="textAreaDivR">
            <textarea
              required
              rows="2"
              className="descTimeLine"
              placeholder="set you description"
              type="text"
              resize="none"
              onChange={(e) => setRely(e.target.value)}
              style={{ color: "black", fontSize: "15px" }}
            />
            <button className="addAnswer" onClick={addAnswer}>
              Add Answer :
            </button>
            <br></br>
            <br></br>
          </div>
          {discussion.length &&
            discussion.map((item) => {
              return (
                <div className="allInfo" key={item._id}>
                  <div className="divComment">
                    <img src={item.user?.avatar} alt={item.user?.avatar}/>
                    <p>{item.user?.userName}</p>
                  </div>
                  <p>{item.reply}</p>
                  {state.users.role === "Admin" ||
                  // eslint-disable-next-line
                  item.user._id == state.users.user._id ? (
                    <div className="del">
                      <button
                        className="fa fa-trash"
                        onClick={() => deleteAnswer(item._id)}
                      ></button>
                    </div>
                  ) : (
                    <></>
                  )}
                  {state.users.role === "trainer" && ( // trainer && Admin
                    <li className="nav-item1">
                      <form>
                        <input
                          type="checkbox"
                          id="The_Best"
                          name="The_Best"
                          value="The_Best"
                        />
                        <label for="The_Best"> Best ... </label>
                        <input
                          type="submit"
                          className="ProfileBtn"
                          value="Submit"
                        />
                      </form>
                      {/* <button
                        className="ProfileBtn"
                        // onClick={() => deleteTask(item._id)}
                      >
                        <h2>Remove : </h2>
                      </button> */}
                    </li>
                  )}
                  {/* <button
                    className="TimeLineButton"
                    // onClick={() => updateTask(item._id)}
                  >
                    <h2>Update</h2>
                  </button> */}

                  {/* <button
                    className="TimeLineButton"
                    // onClick={() => deleteTask(item._id)}
                  >
                    <h2>Delete</h2>
                  </button> */}
                </div>
              );
            })}
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Disscation;
