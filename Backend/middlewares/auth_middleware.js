const jwt = require('jsonwebtoken'); // ADD THIS IMPORT
const User = require('../models/user'); // ADD THIS IMPORT

// Assuming you have a User model to fetch user details
exports.authenticateToken = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // REMOVE await here
        const currentUser = await User.findById(decoded.userId); // CHANGE decoded.id to decoded.userId
        if (!currentUser) {
            return res.status(401).json({ message: 'The user belonging to this token does no longer exist.' });
        }
        
        req.user = currentUser;
        res.locals.user = currentUser;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token' }); // ADD return here
    }
}

// Role authorization middleware  
exports.roleAuthorization = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You do not have permission to perform this action' });
        }
        next();
    }
}

// Add this convenience middleware for admin-only routes
exports.requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' });
    }
    next();
};
