import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home";
import QuestionsPage from "./pages/questions";
import Results from "./pages/results";

import "./styles/main.scss";

function App() {
  const [data, setData] = useState([]);
  const [singleQuestion, setSingleQuestion] = useState({});
  const [pageNumber, setpageNumber] = useState(0);
  const [question, setQuestion] = useState("");
  const [getAnswer, setGetAnswer] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      const response = await fetch("/api");
      const data = await response.json();

      if (!data ) {
        return data = [];
      }
      const newArray = data.map((ind, id) => ({
        ...ind,
        id: id,
      }));
      setData(newArray);
      filteredList(newArray);
    }

    fetchdata();
  }, [pageNumber]);

  const submitAnswer = async (answer, record) => {
    const requestOptions = await fetch(
      "/api/results",

      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_answer: answer,
          record: record,
        }),
      }
    );

    try {
      const response = await requestOptions.json();
      if (pageNumber === response.length) {
        return setpageNumber(response.length);
      }
      setpageNumber(pageNumber + 1);

      setSingleQuestion(response.record);
      console.log(singleQuestion);

      record = response.record;
      setGetAnswer((res) => [
        ...res,
        {
          ...record,
          user_answer: answer.toLowerCase(),
          correct_answer: record.correct_answer.toLowerCase(),
          id: record.id,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredList = (newArray) =>
    newArray
      .filter((ind) => ind.id === pageNumber)
      .map((evt) => {
        let newText = evt.question;
        newText = newText
          .replaceAll("&#039;", "'")
          .replaceAll("&quot;", '"')
          .replaceAll("&eacute;", '"')
          .replaceAll("&rsquo;", "'");

        setSingleQuestion(evt);
        return setQuestion(newText);
      });

  const resetQuestions = () => {
    setSingleQuestion({});
    setpageNumber(0);
    setQuestion("");
    setGetAnswer([]);
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route
            element={
              <QuestionsPage
                submitAnswer={submitAnswer}
                data={data}
                question={question}
                pageNumber={pageNumber}
                singleQuestion={singleQuestion}
              />
            }
            path="/quiz"
          />
          <Route
            element={
              <Results resetQuestions={resetQuestions} answers={getAnswer} />
            }
            path="/results"
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
