const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: { type: String, minLength: 4 },
  age: {
    type: Number,
  },
  email: { type: String, required: true, lowercase: true },
  createdAt: { type: Date, default: new Date(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
  bestFriend: { type: mongoose.SchemaTypes.ObjectId, ref: "Users" },
  hobbies: [String],
  address: addressSchema,
});

userSchema.methods.sayHi = function () {
  console.log(`Hi my name is ${this.name}`);
};

module.exports = mongoose.model("Users", userSchema);
