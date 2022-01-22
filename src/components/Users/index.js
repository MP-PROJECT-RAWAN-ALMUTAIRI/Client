import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import Nav from "./../Nav";
import Footer from "../Footer";
import "./style.css";

const Users = () => {
  let navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  },);

  const state = useSelector((state) => {
    return state;
  });

  const getAllUsers = async () => {
    const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${state.users.token}`,
      },
    });
    setAllUsers(result.data);
  };
  
  const deleteUser = async (id) => {
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
        `${process.env.REACT_APP_BASE_URL}/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${state.users.token}`,
          },
        }
      );
      getAllUsers();
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
  //   try {
  //     await axios.delete(`${process.env.REACT_APP_BASE_URL}/user/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${state.users.token}`,
  //       },
  //     });
  //     getAllUsers();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <Nav />
      <div className="contener">
        {allUsers &&
          allUsers.map((ele) => {
            return (
              <div className="mincontainer">
                <div key={ele._id}>
                  <img
                    className="usersAv"
                    src={ele.avatar}
                    onClick={() => navigate(`/profile/${ele._id}`)}
                    alt="user Avatar"
                  />
                  <br></br>
                  <div className="users">
                    <h4>
                      {ele.userName}
                      <br></br>
                      {ele.email}
                      <br></br>
                      {ele.createdAt}
                      <br></br>
                    </h4>
                    <br></br>
                    <button
                      className="delButton"
                      onClick={() => deleteUser(ele._id)}
                    >
                      <p> Delete </p>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

        {!allUsers.length && <h2>there is no user OR you are forbidden !!</h2>}
      </div>
      <Footer />
    </>
  );
};
export default Users;
