const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid, v4 } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const repository = ({ title, url, techs } = request.body);
  repository.id = uuid();
  repository.likes = 0;

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repository = repositories.find((r) => r.id === id);

  if (repository) {
    repository.title = title;
    repository.url = url;
    repository.techs = techs;
    return response.status(200).send(repository);
  }
  return response.status(400).send();
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((r) => r.id === id);

  console.log(index);

  if (index < 1) {
    return response.status(400).send();
  }

  repositories.splice(index, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find((r) => r.id === id);

  if (repository) {
    repository.likes++;
    return response.status(201).send(repository);
  }
  return response.status(400).send();
});

module.exports = app;
