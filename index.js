const express = require("express");
const morgan = require("morgan");
const app = express();

const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
morgan.token("body", (request, response) => JSON.stringify(request.body));

app.use(bodyParser.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  },
  {
    name: "Pentti Hirvonen",
    number: "123456",
    id: 5
  },
  {
    name: "Alli Kuusi",
    number: "8764",
    id: 6
  }
];

app.get("/info", (request, response) => {
  const info = `<p>Phonebook has info for ${
    persons.length
  } people</p><p>${new Date()}</p>`;
  response.send(info);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Request missing data"
    });
  }

  if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({
      error: "Name must be unique"
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000000000000000)
  };
  persons = persons.concat(person);
  response.status(201).json(person);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  return person ? response.json(person) : response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    persons = persons.filter(p => p.id !== person.id);
    response.status(204).end();
  } else {
    response.send(404).end();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
