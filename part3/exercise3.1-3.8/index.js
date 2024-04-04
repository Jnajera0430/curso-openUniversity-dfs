const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());

morgan.token("dev", function getBody(req) {
  return JSON.stringify(req.body);
});

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.use(morgan(":method :url :response-time :dev "));

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
  return response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) {
    response.statusMessage = "Person not found";
    return response.status(404).end();
  }

  return response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
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

  const validName = persons.some((person) => person.name === name);

  if (validName) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const newPerson = {
    name,
    number,
    id: generateId(),
  };

  persons = persons.concat(newPerson);
  response.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
