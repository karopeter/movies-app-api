const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
   fullName: {
    type: String,
    required: [true, 'Please tell us your full name']
   },
   email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true, 
    validate: [validator.isEmail, 'Please provide a valid email']
   },
   phoneNumber: {
    type: String,
    required: [true, 'Please provide your phone Number'],
    minlength: [11, 'Phone number must be at least 11 characters'],
    maxlength: [11, 'Phone must be at least 11 characters'],
    match: [/^\d{11}$/, 'Phone number must be 11 digits'], // this is you using both min and max length, it should be matched
   },
   address: {
    type: String
   },
   password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
   },
}, {timestamps: true});

// Virtual field for password confirmation
userSchema.virtual('passwordConfirm').get(function() {
     return this._passwordConfirm;
});

// validate password confirmation
userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();

    if (this.password !== this.passwordConfirm) {
        return next(new Error("Password are not the same!"));
    }

    next();
});

// Hash the password before saving it to the database 
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
   return await bcrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model("User", userSchema);

module.exports = User;