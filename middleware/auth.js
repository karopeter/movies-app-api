const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.protect = async(req, res, next) => {
    let token;

    // Check for token in headers 
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // IF no token found, deny access
    // Handling missing token-> if not token is provided, the middleware stops and send a 401 ERROR.
    if (!token) {
        return res.status(401).json({ error: 'You are not logged in. Please log in to get access.'});
    }

    try {
       // Verify token using the secret key
       const decoded = jwt.verify(token, process.env.JWT_SECRET);

       // CHECK IF the user still exists in the database 
       const currentUser = await User.findById(decoded.userId);
       if (!currentUser) {
        return res.status(401).json({ error: "The user belonging to this token does not exists."});
       }

       // Attach the user data to the request object 
       req.user = currentUser;
       
       next();
    } catch(err) {
       return res.status(401).json({ error: "Invalid token or token expired already." });
    }
};
