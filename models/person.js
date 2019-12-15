const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const dotenv = require("dotenv");
dotenv.config();

const url = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

mongoose
  .connect(url, options)
  .then(() => console.log("connected"))
  .catch(error => console.error(error));

const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true, unique: true },
  number: { type: String, minlength: 8, required: true }
}).plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Person", personSchema);
