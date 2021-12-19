import mongoose from "mongoose";

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const prospectFormSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20,
  },
  phone: {
    type: String,
    min: 10,
    max: 15,
    unique: true,
    required: true,
    trim: true,
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
  gender: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    min: 6,
    max: 10,
    required: true,
  },
  race:{
    type: String,
    required: true, 
  },
  maritalstatus:{
    type: String,
    required: true, 
  },
  height:{
      type:Number,
      required:true
  },
  weight:{
    type:Number,
    required:true 
  },
  state:{
      type:String,
      required:true
  },
  city:{
      type:String,
      required:true
  },
  picture:{
      type:String,
      required:true
  },
  wantkids:{
      type:Boolean,
      required:true
  },
  havekids:{
    type:Boolean,
    required:true 
  },
  lookingfor:{
      type:String,
      required:true,
      min:10
  },
  lovalanguage:{
      type:String,
      required:true
  },
  hobbies:{
      type:[String],
      required:true
  }},
  {timestamps: true});


const prospectForm = mongoose.model('prospectForm', prospectFormSchema);
export default prospectForm;