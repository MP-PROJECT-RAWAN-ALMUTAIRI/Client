import React from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "./../../reducers/users";
import "./style.css";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const state = useSelector((state) => {
    return {
      users: state.users,
    };
  });

  const logOut = () => {
    navigate(`/`);
    dispatch(userLogout({ token: "" }));
    console.log("log out");
  };
  return (
    <div>
      <header className="headerNav">
        <nav className="navBar">
          <ul className="nav-menu1">
          <li className="nav-item1">
              <button
                className="ProfileBtn"
                type="submit"
                onClick={() => navigate(`/main`)}
              >
               Main Page
              </button>
            </li>
            <li className="nav-item1">
              <button
                className="ProfileBtn"
                type="submit"
                onClick={() => navigate(`/timeline`)}
              >
                Posts
              </button>
            </li>
            {console.log(state.users.user._id, "state")}
            <li className="nav-item1">
              <button
                className="ProfileBtn"
                type="submit"
                onClick={() => navigate(`/profile/${state.users.user._id}`)}
              >
                Profile
              </button>
            </li>

            <li className="nav-item1">
              <button
                className="ProfileBtn"
                type="submit"
                onClick={() => navigate(`/users`)}
              >
                Users
              </button>
            </li>

            <li className="nav-item1">
              <button
                className="ProfileBtn"
                type="submit"
                onClick={() => navigate(`/discussion`)}
              > 
                Disscation
              </button>
            </li>


            <li className="nav-item1">
              <button className="ProfileBtn" type="submit" onClick={logOut}>
                Log out
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Nav;