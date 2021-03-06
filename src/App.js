import React from "react";
import { Route, Routes } from "react-router-dom";
import TimeLine from "./components/TimeLine";
import Onepost from "./components/OnePost";
import Profile from "./components/Profile";
import Users from "./components/Users";
import ManiPage from "./components/ManiPage";
import Disscation from "./components/Disscation";
import Replay from "./components/Replay";
import LandPage from "./components/LandPage";
import TrainerVerfiy from "./components/TrainerVerfiy";
import VerifyTheAccount from "./components/VerifyTheAccount";
import VerifyFromEmail from "./components/VerifyFromEmail";
import LoginR from "./components/LoginR";
import SignupR from "./components/SignupR";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandPage />} />
        <Route exact path="/signup" element={<SignupR />} />
        <Route exact path="/login" element={<LoginR />} />
        <Route exact path="/post/:id" element={<Onepost />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="/main" element={<ManiPage />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/timeline" element={<TimeLine />} />
        <Route exact path="/discussion" element={<Disscation />} />
        <Route exact path="/reply/:id" element={<Replay />} />
        <Route exact path="/discussion-verify" element={<TrainerVerfiy />} />
        <Route
          exact
          path="/verify_account/:id"
          element={<VerifyTheAccount />}
        />
        <Route exact path="/verify_from_email" element={<VerifyFromEmail />} />
      </Routes>
    </>
  );
}
export default App;
