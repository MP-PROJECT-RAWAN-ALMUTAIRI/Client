import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Footer = () => {
  return (
    <div className="footer-basic">
      <p className="footer">
        Tuwaiq Club © 2022
        <br />
        {/* <Link to="mailto:tuwaiqclub@gmail.com">tuwaiqclub@gmail.com</Link> */}
      </p>
    </div>
  );
};
export default Footer;
