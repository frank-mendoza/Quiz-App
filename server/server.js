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

app.post("/api", (req, res) => {

  const { id} = req.body

  const filePath = buildPath();
  const { results } = extractData(filePath);

  const newIncorrectAnswer = results.map((ev) => {
    if (ev.id === id) {
      return {
        ...ev,
        incorrect_answers: [...ev.incorrect_answers],
      };
    }

    console.log(ev);
    return ev;
  });

  fs.writeFileSync(filePath, JSON.stringify({ newIncorrectAnswer }));
});
app.get("/api", (req, res) => {
  const filePath = buildPath();
  const { results } = extractData(filePath);

  res.json(results);
});

app.listen(5000, () => {
  return console.log("Listening on port 5000");
});
