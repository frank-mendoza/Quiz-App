import React from "react";
import { Link } from "react-router-dom";
import Category from "../customComponent/category";

const Results = ({ answers, resetQuestions }) => {
  return (
    <div className="page page-home">
      <div className="page-container page-container--results">
        <Category answers={answers} results={true} />
        <div className="page-control">
          <button onClick={() => resetQuestions()}>
            <Link to="/">PLAY AGAIN</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
