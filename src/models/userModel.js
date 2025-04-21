const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength:[4,"Name must be at least 4 letters"]
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: true, 
    match: [/\S+@\S+\.\S+/, "Enter a valid email"] 
  },
  password: { 
    type: String, 
    required: [true, "Password is required"], 
    minlength: [6, "Password must be at least 6 characters"] 
  },
  role: { 
    type: String, 
    enum: ["user", "admin"], 
    default: "user" 
  },
  resetToken: { type: String },
  resetTokenExpire: { type: Date }
  
},
{ timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
