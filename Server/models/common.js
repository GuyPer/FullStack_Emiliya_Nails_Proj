const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  city: String,
  street: String,
  houseNumber: Number,
  zip: Number,
})

const imageSchema = new mongoose.Schema({
  url: String,
  alt: String,
})

const nameSchema = new mongoose.Schema({
  first: String,
  last: String,
})

module.exports = { addressSchema, imageSchema, nameSchema }