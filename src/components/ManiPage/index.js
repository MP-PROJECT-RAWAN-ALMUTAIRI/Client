import React from "react";
import Nav from "./../Nav";
//import "./style.css";

const MainPage = () => {
  return (
    <div className="mainPage">
      <Nav />
      <br></br> 
      <br></br>
      <div className="BeastProject">
        <img src="./tuwaiq.jpg" alt="BeastProject" />
      </div>
      <p className="trainers">Tuwaiq Trainers</p>
      <div className="TuwaiqTrainers">
        <img src="./" alt="TuwaiqTrainers" />
        <img src="./" alt="TuwaiqTrainers" />
        <img src="./" alt="TuwaiqTrainers" />
        <img src="./" alt="TuwaiqTrainers" />
      </div>
      <p className="Bproject">Best Project</p>
      <div className="BestPro">
        <img src="./" alt="BeastProject" />
        <img src="./" alt="BeastProject" />
        <img src="./" alt="BeastProject" />
        <img src="./" alt="BeastProject" />
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default MainPage;
