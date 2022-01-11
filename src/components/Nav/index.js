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
          {state.users.token.length !== 0 ? (
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
                {/* <button className="delButton" onClick={logOut}>
                  logout
                </button>  */}
              </li>

              {/* {console.log(state.users.user.role.role ,"rawan state users role ?!!")} */}
              {/* <button
                  className="ProfileBtn"
                  type="submit"
                  onClick={() => navigate(`/main`)}
                >
                  Main Page
                </button> */}

              {/* <li className="nav-item1">
                <button
                  className="ProfileBtn"
                  type="submit"
                  onClick={() => navigate(`/timeline`)}
                >
                  Posts
                </button>
              </li> */}
              {/* {console.log(state.users.user._id, "state")} */}
              {/* {console.log(state.users.role, "role ..............")} */}
              {/* <li className="nav-item1">
                <button
                  className="ProfileBtn"
                  type="submit"
                  onClick={() => navigate(`/profile/${state.users.user._id}`)}
                >
                  Profile
                </button>
              </li> */}
              {/* {state.users.role === "Admin" && ( // Admin
                <li className="nav-item1">
                  <button
                    className="ProfileBtn"
                    type="submit"
                    onClick={() => navigate(`/users`)}
                  >
                    Users
                  </button>
                </li>
              )}
              {state.users.role === "trainer" && ( // trainer && Admin
                <li className="nav-item1">
                  <button
                    className="ProfileBtn"
                    type="submit"
                    onClick={() => navigate(`/discussion-verify`)}
                  >
                    Veryfi Discussions
                  </button>
                </li>
              )}
              <li className="nav-item1">
                <button
                  className="ProfileBtn"
                  type="submit"
                  onClick={() => navigate(`/discussion`)}
                >
                  Discussion
                </button>
              </li>
              <li className="nav-item1">
                <button className="ProfileBtn" type="submit" onClick={logOut}>
                  Log out
                </button>
              </li> */}
            </ul>
          ) : (
            console.log("RAWAN ...")
          )}
        </nav>
      </header>
    </div>
  );
};

export default Nav;
