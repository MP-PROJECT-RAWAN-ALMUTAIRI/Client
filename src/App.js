import React from "react";
import {  Route, Routes } from "react-router-dom";
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
//import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  return(
 <>
      <Routes>

        <Route exact path="/login"element={<Signup/>}/>
        <Route exact path="/"element={<Login/>}/> 
        <Route exact path="/post/:id"element={<Onepost/>}/> 
        <Route exact path="/profile/:id"element={<Profile/>}/> 
        <Route exact path="/main"element={<ManiPage/>}/> 
        <Route exact path="/users"element={<Users/>}/>  
        <Route exact path="/timeline"element={<TimeLine/>}/>
        <Route exact path="/discussion"element={<Disscation/>}/>
        <Route exact path="/reply/:id"element={<Single/>}/> 

      </Routes>
 
 </>
  )

}
export default App; 