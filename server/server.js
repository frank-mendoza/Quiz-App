const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs");

function buildPath() {
  return path.join(process.cwd(), "questions.json");
}

function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

app.use(express.json({ extended: true, limit: "1mb" }));

app.post("/api/results", (req, res) => {
  const { user_answer, record } = req.body;

  const filePath = buildPath();
  const { results } = extractData(filePath);

  const newIncorrectAnswer = results.map((ev, id) => {
    if (id === record.id && ev.correct_answer !== user_answer) {
      return {
        ...ev,
        incorrect_answers: [...ev.incorrect_answers, user_answer],
      };
    }
    console.log(id === record.id);
    return ev;
  });


  fs.writeFileSync(filePath, JSON.stringify({ results: newIncorrectAnswer }));
  res.status(200).json({ record });
});

app.get("/api", (req, res) => {
  const filePath = buildPath();
  const { results } = extractData(filePath);

  res.json(results);
});

app.listen(5000, () => {
  return console.log("Listening on port 5000");
});
