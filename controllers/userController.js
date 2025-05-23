const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


// Generate JWT token 
const generateToken = (user, secret, expiresIn) => {
  return jwt.sign(
    { email: user.email, userId: user._id},
    secret,
    { expiresIn }
  )
}


exports.signup = async (req, res, next) => {
  const { 
     fullName,
      email,
       phoneNumber, 
       address, 
       password,
        passwordConfirm
  } = req.body; // object destructuring

  // check if user already exists 
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next (new Error('Email is already in use', 400));
  }

  const user = new User({
    fullName,
    email,
     phoneNumber, 
     address, 
     password,
      passwordConfirm 
  });

  const result = await user.save();
  res.status(201).json({
    message: "User Created Successfully",
    result
  });

}


exports.login = async (req, res, next) => {
   const { email, password } = req.body;

   // check if  user exist
   if (!email || !password) {
    return next(new Error("Please provide email and password", 400));
   }

   const user = await User.findOne({ email }).select('+password');
   if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new Error("Incorrect Email or password", 401));
   }

   const token = generateToken(user, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);

   await user.save({validateBeforeSave: false });

   res.status(200).json({
    token
   });
}