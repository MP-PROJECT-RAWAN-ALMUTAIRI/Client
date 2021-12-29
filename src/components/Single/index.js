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
  const [moreReply1, setMoreReply] = useState([]); // for reply on comment...
  const { id } = useParams();

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getOneQuestion();
    getOneComment();
    getReply();
  }, []);

  const getOneQuestion = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/one/${id}`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
       console.log( result.data, ".............rawan ............question........." );
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
       console.log(result.data, ".............rawan ............reply.........");
      //console.log(result.data.result);
      setDesscation(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // <----------------------Need to fix-------------------------------->
  // <----------------------Need to fix-------------------------------->
  // <----------------------Need to fix-------------------------------->

  const getReply = async () => {
    try {
      const massage = await axios.get(`${BASE_URL}/replyMore/${id}`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
      console.log(massage.data, ".........replyMore.........");
      //console.log(result.data.result);
      setMoreReply(massage.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Nav />
      <div>
        <br></br>
        <br></br>
        <div className="styleDiv">
          {question && <p> Question :{question.question}</p>}
          <br></br>
          Answer :
          {discussion.length &&
            discussion.map((item) => {
              return (
                <div key={item._id}>
                  <p>user Name : </p> 
                  <p>{item.reply}</p>
                </div>
              );
            })}
            Reply:
          <div className="replyMore">
            {moreReply1.length &&
              moreReply1.map((item) => {
                return (
                  <div key={item._id}>
                    <p>user Name : </p> 
                    <p>{item.moreReply}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Disscation;

//  <div className="disscationDiv">
//  <textarea
//    required
//    rows="4"
//    className="inputTextArea"
//    placeholder="set you description"
//    type="text"
//    onChange={(e) => setDesscation(e.target.value)}
//  />
//  {/* <button className="btn" onClick={addDisscation}>
//    <h2> Reply :</h2>
//  </button> */}
// </div>
