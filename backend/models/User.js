// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
 {
  name: {
   type: String,
   require: true,
  },
  email:{
   type: String,
   require: true,
   unique: true,
   lowercase: true,
  },
  passwor: {
   type: String,
   require: true,
   minlength: 6,
   select: false,
  },
  avatar: {
   type: String,
   default: "",
  },
  isPro:{}
 }
)