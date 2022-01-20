import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "./../../reducers/users";
import "./style.css";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { id } = useParams();
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
            <ul className="topnav">
              <li className="active">
                <Link to="/main">Home</Link>{" "}
              </li>
              <li>
                <Link to="/timeline">Projects</Link>{" "}
              </li>
              <li>
                <Link to={`/profile/${state.users.user._id}`}>Profile</Link>
              </li>
              <li className="nav-item1">
                {state.users.user.role.role === "Admin" && ( // Admin
                  <Link to="/users">Users</Link>
                )}
              </li>
              <li>
                {state.users.user.role.role === "trainer" && ( // trainer && Admin
                  <Link to="/discussion-verify">Veryfi Discussions </Link>
                )}
              </li>
              <li>
                <Link to="/discussion">Discussion</Link>
              </li>
              <li class="right">
                <Link onClick={logOut} to="/">Logout</Link>
              </li>
            </ul>
        </nav>
      </header>
    </div>
  );
};

export default Nav;
