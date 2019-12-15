const mongoose = require("mongoose");

const args = process.argv;
if (args.length < 3 || args.length === 4) {
  console.log("Missing arguments");
  process.exit(1);
} else if (args.length > 5) {
  console.log("Too many arguments");
  process.exit(1);
}

const url = `mongodb+srv://fullstack:${args[2]}@cluster0-3dnvg.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(error => console.error(error));

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});
const Person = mongoose.model("Person", personSchema);

if (args.length === 3) {
  Person.find({}).then(result => {
    console.log("Phonebook:");
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (args.length === 5) {
  const person = new Person({
    name: args[3],
    number: args[4]
  });
  person.save().then(() => {
    console.log(`Added ${person.name} ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}
