import React from "react";

import { MdClose } from "react-icons/md";
import { FiCheck } from "react-icons/fi";
import logo from "../images/logo.png";

const Category = ({ pageNumber, results, singleQuestion, data, answers }) => {
  return (
    <div className={results ? "questions-cat--results" : "questions-cat"}>
      {results && answers ? (
        <>
          <div className="questions-left results-cat">
            <img src={logo} alt="" />
            <h3>Final Results</h3>
          </div>
          <div className="results-score">
            <h2>
              {answers.filter((e) => e.user_answer === e.correct_answer).length}
              /{answers.length}
            </h2>
            <h3>Your Score</h3>
          </div>
          <div className="results-list">
            <ol>
              {answers.length === 0 ? (
                <li style={{ textAlign: "center", justifyContent: "center" }}>
                  No results available
                </li>
              ) : (
                answers.map((item, key) => (
                  <li key={key}>
                   
                    <div className="results-content">
                      <p>
                        {item.question
                          .replaceAll("&#039;", "'")
                          .replaceAll("&quot;", '"')
                          .replaceAll("&eacute;", '"')
                          .replaceAll("&rsquo;", "'")}
                      </p>
                      <p>
                        The correct answer is{" "}
                        <span
                          style={
                            item.correct_answer === "true"
                              ? {
                                  color: "#c1e497",
                                }
                              : { color: "#FF4D00" }
                          }
                        >
                          {item.correct_answer.toUpperCase()}
                        </span>
                        . You answered{" "}
                        <span
                          style={
                            item.user_answer === "true"
                              ? {
                                  color: "rgb(131, 219, 20)",
                                }
                              : { color: "#E23232" }
                          }
                        >
                          {item.user_answer.toUpperCase()}
                        </span>
                        .
                      </p>
                    </div>
                    <div className="results-icons">
                      {item.user_answer === item.correct_answer ? (
                        <FiCheck size={40} color="#83DB14" />
                      ) : (
                        <MdClose size={40} color="#E33131" />
                      )}
                    </div>
                  </li>
                ))
              )}
            </ol>
          </div>
        </>
      ) : (
        <>
          <div className="questions-left">
            <img src={logo} alt="" />
            <h3>Category: {singleQuestion.category}</h3>
          </div>
          <div className="questions-number">
            <span>
              {singleQuestion.id === 0 ? "1" : pageNumber} of {data.length}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Category;
