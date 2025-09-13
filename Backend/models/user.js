const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {  
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxLength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [6, 'Password must be at least 6 characters']
  },
  // confirm_password: {
  //   type: String,
  //   required: [true, 'Confirm Password is required'],
  //   minLength: [6, 'Confirm Password must be at least 6 characters'],
  //   validate: {
  //     validator: function(value) {
  //       return value === this.password;
  //     },
  //     message: 'Password and Confirm Password must match'
  //   }
  // },
  role: {
    type: String,
    enum: ['user', 'admin'],  
    default: 'user'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, { timestamps: true });


// Middleware: Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash the password if it was modified
  if (!this.isModified('password')) return next();

  // Hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Remove confirm_password field
  this.confirm_password = undefined;
  next();
});

module.exports = mongoose.model("User", userSchema);
