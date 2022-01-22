import React, { useEffect, useState } from "react";
import Nav from "./../Nav";
import Footer from "./../Footer";
import "./style.css"; 
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VerifyDiscussion = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [discussion, setDesscation] = useState([]); // or null ?
  

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getOneComment();
    // eslint-disable-next-line
  }, []);

  const getOneComment = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/discussion`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
      setDesscation(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Nav />

      <div className="contMap">
        {discussion.length &&
          discussion.map((item) => {
            return (
              <div key={item._id} className="verify">
                <p>Question: 👫 </p>
                <p>{item.question}</p>
                <button
                  className="TimeLineButton"
                  onClick={() => navigate(`/reply/${item._id}`)}
                >
                  <h2> view</h2>
                </button>
              </div>
            );
          })}
      </div>
      <Footer /> 
    </>
  );
};

export default VerifyDiscussion;
