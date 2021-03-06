const express = require("express");
const morgan = require("morgan");
const app = express();
const Person = require("./models/person");

const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
morgan.token("body", request => JSON.stringify(request.body));

const logger = morgan(
  ":method :url :status :res[content-length] - :response-time ms :body"
);

const errorHandler = (error, request, response) => {
  console.error(error);
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  response.status(404).end();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(express.static("build"));
app.use(bodyParser.json());
app.use(logger);

app.get("/info", (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.send(
        `<p>Phonebook has info for ${
          persons.length
        } people</p><p>${new Date()}</p>`
      );
    })
    .catch(error => next(error));
});

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons.map(person => person.toJSON()));
    })
    .catch(error => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  const person = new Person({
    name: body.name,
    number: body.number
  });

  person
    .save()
    .then(createdPerson => response.status(201).json(createdPerson.toJSON()))
    .catch(error => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.find({ _id: request.params.id })
    .then(personArray => {
      if (personArray.length === 0) {
        return response.status(404).end();
      }
      response.json(...personArray);
    })
    .catch(error => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const person = {
    name: request.body.name,
    number: request.body.number
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON());
    })
    .catch(error => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
