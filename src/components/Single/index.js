import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "./../Nav";
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
      console.log(result.data, "....rawan ...reply....");
      //console.log(result.data.result);
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
      getOneComment();
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
          <div className="textAreaDiv">
            <textarea
              required
              rows="2"
              className="descTimeLine"
              placeholder="set you description"
              type="text"
              onChange={(e) => setRely(e.target.value)}
              style={{ color: "black", fontSize: "15px" }}
            />
            <button className="TimeLineButton" onClick={addAnswer}>
              add Answer :
            </button>
            <br></br>
            <br></br>
          </div>
          {discussion.length &&
            discussion.map((item) => {
              return (
                <div key={item._id}>
                  {/* if(){

                  }
                  else {

                  } */}
                  <p>user Name : </p>
                  {item.user.userName}
                  <p>{item.reply}</p>
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
      </div>
    </>
  );
};
export default Disscation;
