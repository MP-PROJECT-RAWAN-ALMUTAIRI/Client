import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
//import { useParams } from "react-router-dom";
import Nav from "./../Nav";
import "./style.css";

const Users = () => {
  //let navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  //const { id } = useParams();

  useEffect(() => {
    getAllUsers();
  }, []);

  const state = useSelector((state) => {
    return state;
  });
  const getAllUsers = async () => {
    const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${state.users.token}`,
      },
    });
    console.log(state.users.token);
    setAllUsers(result.data);
  };
  // const deleteUser = async (_id) => {
  //    await axios.delete(
  //     `${process.env.REACT_APP_BASE_URL}/user/${_id}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${state.users.token}`,
  //       },
  //     }
  //   );
  //    getAllUsers();
  // };
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
      deleteUser(state.users.token);
      // getAllUsers();
    } catch (error) {
      console.log(error);
    }
    window.location.reload(false);
  };

  return (
    <>
      <Nav />
      <div className="contener">
        {allUsers &&
          allUsers.map((ele) => {
            return (
              <div className="mincontainer">
                <div key={ele._id} className="users">
                  <h4 className="userName">
                    {ele.userName}
                    <br></br>
                    {ele.email}
                    <br></br>
                    {ele.createdAt}
                    <br></br>
                    <img
                      className="usersImage"
                      src={ele.avatar}
                      alt="user Avatar"
                    />
                  </h4>
                </div>
                <button
                  className="ProfileBtn"
                  onClick={() => deleteUser(ele._id)}
                >
                  delete
                </button>
              </div>
            );
          })}

        {!allUsers.length && <h2>there is no user OR you are forbidden !!</h2>}
      </div>
    </>
  );
};
export default Users;
