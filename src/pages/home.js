import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/zeniark-logo.png'

export default function HomePage() {
  return (
    <div className="page page-home">
      <div className="page-container">
        <div>
          <img src={logo} alt=''/>
        </div>
        <div className="page-title">
          <h1>Welcome to the Trivia Challenge!</h1>
          <p>You will be presented with 10 True or False questions.</p>
        </div>
        <div className="page-body">
          <p>Can you score 10/10?</p>
        </div>
        <div className="page-control">
          <button>
            <Link to="quiz">LET’S START!</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
