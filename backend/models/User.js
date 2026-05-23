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
  isPro:{
   type: Boolean,
   default: false,
  },
 } ,
 { timestamps: true}
);

userSchema.pre("save", async function (next) {
 if ( !this.isModified("password")) return next();
 const salt = await bcrypt.genSalt(10);
 this.password = await bcrypt.hash(this.password, salt);
 next();
});

userSchema.methods.matchPassword = async function (enterPassword) {
 return await bcrypt.compare(enterPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);


