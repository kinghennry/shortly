import React from "react";
import workingImage from "../../Assets/illustration-working.svg";
import { Link } from "react-router-dom";
import "./hero.css";

const Hero = () => {
  return (
    <>
      <div className="banner">
        <div className="intro">
          <div className="intro__text">
            <h1 className="intro__title">More than just shorter links</h1>
            <p className="intro__info">
              Build your brand's recognition and get detailed insights on how
              your links are performing.
            </p>
            <Link to="/register" className="btn">
              Get Started
            </Link>
          </div>
          <div className="intro__imagedIV">
            <img className="intro__image" src={workingImage} alt="working" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
