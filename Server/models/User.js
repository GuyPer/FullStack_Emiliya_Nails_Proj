const mongoose = require("mongoose");
const { addressSchema, nameSchema } = require("./common");
const { boolean } = require("joi");

// define a mongoose schema:
// this describes the shape of one 'user' in our users collection.
const userSchema = new mongoose.Schema(
  {
    name: nameSchema,
    phone: String,
    email: { type:String, unique:true },
    password: String,
    address: addressSchema,
    isAdmin: Boolean
  },
  {
    timestamps: true,
  }
);

// compile the schema into a model.
// we will use this model to access our users collection.
const User = mongoose.model("User", userSchema);

module.exports = User;
