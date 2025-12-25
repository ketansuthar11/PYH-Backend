const Joi = require('joi');
const jwt = require("jsonwebtoken");
const signupValidation = (req, res, next) => {
    const Schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
        role: Joi.string().valid('user', 'admin').optional()
    })
    const { error } = Schema.validate(req.body);
    if (error) {
        res.status(400).json({ message: "Bad request", error })
    }
    next();
}

const loginValidation = (req, res, next) => {
    const Schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
    })
    const { error } = Schema.validate(req.body);
    if (error) {
        res.status(400).json({ message: "Bad request", error })
    }
    next();
}

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided", success: false });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token", success: false });
        req.user = user;
        next();
    });
};


module.exports = {
    signupValidation,
    loginValidation,
    authMiddleware
}

