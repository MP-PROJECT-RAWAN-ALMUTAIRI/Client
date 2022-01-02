import React from "react";
import { Route, Routes } from "react-router-dom";
import Landpage from "./components/LandPage";
// import Login from "./components/Login";
import Signup from "./components/Signup";                         
import Nav from "./components/Nav";
import TimeLine from "./components/TimeLine";
import Onepost from "./components/OnePost";
import Profile from "./components/Profile";
import Users from "./components/Users";
import ManiPage from "./components/ManiPage";
import Login from "./components/Login";                       
import Disscation from "./components/Disscation";
import Single from "./components/Single";
import VeryfiyDiscussion from "./components/VeryfiyDiscussion";
import TrainerVerfiy from "./components/TrainerVerfiy";
import VerifyTheAccount from "./components/VerifyTheAccount";
import ResetPassword from "./components/ResetPassword";
import VerifyFromEmail from "./components/VerifyFromEmail";
// import LoginR from "./components/LoginR"; 
// import SignupR from "./components/SignupR"; 
//import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        
        {/* <Route exact path="/" element={<SignupR />} /> 
        <Route exact path="/login" element={< LoginR />} />  */}

        <Route exact path="/post/:id" element={<Onepost />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="/main" element={<ManiPage />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/timeline" element={<TimeLine />} />
        <Route exact path="/discussion" element={<Disscation />} />
        <Route exact path="/reply/:id" element={<Single />} />
        <Route
          exact
          path="/veryfiyDiscussion/:id"
          element={<VeryfiyDiscussion />}
        />
        <Route exact path="/discussion-verify" element={<TrainerVerfiy />} />
        <Route
          exact
          path="/verify_account/:id"
          element={<VerifyTheAccount />}
        />
        <Route exact path="/reset_password/:id" element={<ResetPassword />} />
        <Route exact path="/verify_from_email" element={<VerifyFromEmail />} />
      </Routes>
    </>
  );
}
export default App;
