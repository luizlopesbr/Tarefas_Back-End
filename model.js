const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  _id:{ type: String },
  nome: { type: String, required: true },
  corDoCabelo: { type: String },
  peso: { type: Number },
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
