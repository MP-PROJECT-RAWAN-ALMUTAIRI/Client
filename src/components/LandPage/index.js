import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const LandPage = () => {
  const navigate = useNavigate();
  return (
    <div className="land">
      <img className="landImg" src="/project.jpg" alt="LandPage" />
      <h2 className="t">Tuwaiq Clube 2022</h2>
      <p className="tu">
        We are a platform that collects Tuwaiq members projects in al Qassim
        area. Signup now to see our projects ...
      </p>
      <div>
        <br></br>
        <Link to="/Singip" className="landbtn" onClick={() => navigate(`/main`)}>
          Sign up
        </Link>
        <Link to="/login" className="landbtn" onClick={() => navigate(`/main`)}>
          Login
        </Link>
      </div>
    </div>
  );
};
export default LandPage;
