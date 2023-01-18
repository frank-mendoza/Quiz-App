import React from "react";
import { MdClose } from "react-icons/md";
import { FiCheck } from "react-icons/fi";
import Category from "../customComponent/category";
import { Link } from "react-router-dom";

const QuestionsPage = (props) => {
  const { submitAnswer, question, pageNumber, singleQuestion, data } = props;

  return (
    <div className="page page-home">
      <div className="page-container page-container--questions">
        <Category
          pageNumber={pageNumber}
          singleQuestion={singleQuestion}
          data={data}
        />
        <div className="questions-body">
          <div className="questions-content">{question}</div>
          <div className="questions-button">
            <Link
              onClick={() => submitAnswer('True', singleQuestion)}
              className="button"
              to={pageNumber === data.length ? "/results" : ''}
            >
              <FiCheck size={40} />
              True
            </Link>
            <Link
              onClick={() => submitAnswer('False', singleQuestion)}
              className="button"
              to={pageNumber === data.length ? "/results" : ''}
            >
              <MdClose size={40} />
              False
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
