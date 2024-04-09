//packages
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");

//helpers
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

//middlewares
morgan.token("dev", function getBody(req) {
  return JSON.stringify(req.body);
});
app.use(express.static("dist"));
app.use(express.json());
app.use(cors());
app.use(morgan(":method :url :response-time :dev "));

//controllers
app.get("/", (request, response) => {
  response.send("<h1>Hello world!</h1>");
});

app.get("/api/info", (request, response) => {
  const date = new Date();
  return response.send(`<div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${date.toString()}</p>
    <div>`);
});

app.get("/api/persons", (request, response) => {
  return Person.find({}).then((person) => response.json(person));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((foundPerson) => {
      if (foundPerson) {
        response.json(foundPerson);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      if (result) {
        response.status(204).end();
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      if (updatedPerson) {
        response.status(200).json(updatedPerson).end();
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const name = body.name;
  const number = body.number;
  if (!name || !number) {
    return response.status(400).json({
      error: "Missing name or number",
    });
  }

  const newPerson = new Person({
    name,
    number,
  });

  newPerson.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

//middleware for request no found
app.use(unknownEndpoint);
//middleware for error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
