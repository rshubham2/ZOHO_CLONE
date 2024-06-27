const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true, match: /^\d{10}$/ },
    dept: { type: String, required: true },
    gender: { type: String, required: true },
    verified: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    });
    return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        mobile: Joi.string().pattern(/^\d{10}$/).required().label("Mobile Number"),
        dept: Joi.string().required().label("Department"),
        gender: Joi.string().required().label("Gender"),
    });
    return schema.validate(data);
};

module.exports = { User, validate };