import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "./../Nav";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Disscation = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [discussion, setDesscation] = useState([]); // or null ?
  // const [comment, setComment] = useState("");
  const { id } = useParams();

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getOneComment();
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
        ".............rawan ............discussion........."
      );
      setDesscation(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  //   const addDisscation = async () => {
  //     try {
  //       const result = await axios.post(
  //         `${BASE_URL}/dicss/${id}`,
  //         {
  //           discussion,
  //           comment: id,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${state.users.token}`,
  //           },
  //         }
  //       );
  //       console.log("new Disscation", result.data);
  //       getOneComment();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <>
      <Nav />

      <div className="contMap">
        {discussion.length &&
          discussion.map((item) => {
            return (
              <div key={item._id}>
                <p>Question: </p>
                <p>{item.question}</p>
                <button
                  className="ProfileBtn"
                  onClick={() => navigate(`/reply/${item._id}`)}
                >
                  <h2> view</h2>
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Disscation;
