import React from "react";
import { FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { login } from "../../firebase/authQuery";
import "./landingstyle.css";
import { useAuth } from "./../../context/AuthContext";

function LandingPage() {
  const { isLoading, loginEmail } = useAuth();

  return (
    <div className="landing">
      <div className="section section-left">
        <div className="section-logo">
          <svg
            id="logo-35"
            width="50"
            viewBox="0 0 50 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="logo-svg"
          >
            {" "}
            <path
              d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
              className="ccompli1"
              fill="#55e5b5"
              stopColor="#55e5b5"
            ></path>{" "}
            <path
              d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
              className="ccustom"
              fill="#7fffd4"
              stopColor="#7fffd4"
            ></path>{" "}
          </svg>
        </div>
        <div className="section-title-wrapper">
          <div className="section-title">
            Messaging made simple <br /> and secure
          </div>
        </div>
        <a
          href="https://github.com/subha0511/firebase-chatbox"
          target="_blank"
          rel="noopener noreferrer"
          className="section-footer"
        >
          <FiGithub size={14} />
          Github
        </a>
      </div>
      <div className="section section-right">
        <div className="section-welcome">
          Welcome to <span className="title-highlight">Rechat</span>
        </div>
        {isLoading || loginEmail !== "" ? (
          <div className="loading-button">
            <div className="loading-button-text">Loading...</div>
          </div>
        ) : (
          <div className="google-button" onClick={login}>
            <FcGoogle size={20} />
            <div className="google-button-text">Continue with google</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
