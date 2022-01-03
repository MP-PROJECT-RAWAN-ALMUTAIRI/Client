import React, { useEffect, useState } from "react";
import Nav from "./../Nav";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./style.css";
const Disscation = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [discussion, setDesscation] = useState([]); // or null ?
  const [question, setQuestion] = useState(""); // for Answer the question

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
      console.log(error);
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
      console.log("new question......................", result.data);
      getOneComment();
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
          <input className="textArea" type="text" name="name" onChange={(e) => setQuestion(e.target.value)} />
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
                      user name :
                      {item.user.userName}
                      <p>Question: </p>
                      <p>{item.question}</p>
                      <br></br>
                      <button
                        className="DissButton"
                        onClick={() => navigate(`/reply/${item._id}`)}
                      >
                        <h2> view</h2>
                      </button>
                    </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Disscation;
