const mongoose = require("mongoose");

const arguments = process.argv;
if (arguments.length < 3 || arguments.length === 4) {
  console.log("Missing arguments");
  process.exit(1);
} else if (arguments.length > 5) {
  console.log("Too many arguments");
  process.exit(1);
}

const url = `mongodb+srv://fullstack:${arguments[2]}@cluster0-3dnvg.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(error => console.error(error));

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});
const Person = mongoose.model("Person", personSchema);

if (arguments.length === 3) {
  Person.find({}).then(result => {
    console.log("Phonebook:");
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (arguments.length === 5) {
  const person = new Person({
    name: arguments[3],
    number: arguments[4]
  });
  person.save().then(response => {
    console.log(`Added ${person.name} ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}
