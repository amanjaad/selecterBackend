import mongoose from "mongoose";

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  phone: {
    type: String,
    min: 10,
    max: 15,
    unique: true,
    required: true,
    trim: true,
  },
  dob: {
    type: String,
    min: 6,
    max: 10,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    min: 3,
  },
  state: {
    type: String,
    required: true,
    min: 3,
  },
  country: {
    type: String,
    required: true,
    min: 3,
  },
  password: {
    type: String,
    required: true,
  },
  profilepic: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
    min: 150,
    max: 400,
  },
  likedislike: {
    type: String,
    required: true,
  },
  interestedin: {
    type: String,
    required: true,
  },
  token:{
    type:String
  }
});

const user = mongoose.model("user", userSchema);
export default user;
