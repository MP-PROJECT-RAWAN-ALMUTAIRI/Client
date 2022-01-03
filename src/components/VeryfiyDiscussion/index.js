import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "./../Nav";
import axios from "axios";
import { useSelector } from "react-redux";
//import "./style.css";

const VeryfiyDiscussion = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [discussion, setDesscation] = useState([]); // or null ?
  const [question, setQuestion] = useState(null);

  const { id } = useParams();

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getOneQuestion();
    getOneComment();
  }, []);

  const getOneQuestion = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/one/${id}`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
      // console.log(
      //   result.data,
      //   ".............rawan ............question........."
      // );
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
      console.log(result.data, "............rawan..!!.........");
      //console.log(result.data.result);
      setDesscation(result.data);
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
          {question && <p> Question : {question.question}</p>}
          <br></br>
          {discussion.length &&
            discussion.map((item) => {
              return (
                <div key={item._id}>
                  <p>user Name  77777777777: </p>
                  <p>{item.user.userName}</p>
                  <p>{item.reply}</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default VeryfiyDiscussion;
