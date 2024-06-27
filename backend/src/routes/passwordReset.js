const router = require("express").Router();
const { User } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");

// send password link
router.post("/", async (req, res) => {
    console.log("Received request to send password reset link");
    try {
        const emailSchema = Joi.object({
            email: Joi.string().email().required().label("Email"),
        });
        const { error } = emailSchema.validate(req.body);
        if (error) {
            console.log("Email validation failed:", error.details[0].message);
            return res.status(400).send({ message: error.details[0].message });
        }

        console.log("Finding user with email:", req.body.email);
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            console.log("User not found");
            return res
                .status(409)
                .send({ message: "User with given email does not exist!" });
        }
        console.log("User found");

        console.log("Checking for existing token");
        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            console.log("Creating new token");
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }
        console.log("Token ready");

        const url = `${process.env.BASE_URL}password-reset/${user._id}/${token.token}/`;
        console.log("Sending email to:", user.email);
        await sendEmail(user.email, "Password Reset", url);

        console.log("Password reset link sent successfully");
        res
            .status(200)
            .send({ message: "Password reset link sent to your email account" });
    } catch (error) {
        console.error("Error in sending password reset link:", error);
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});

// verify password reset link
router.get("/:id/:token", async (req, res) => {
    console.log("Received request to verify password reset link");
    try {
        console.log("Finding user with id:", req.params.id);
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            console.log("User not found");
            return res.status(400).send({ message: "Invalid link" });
        }
        console.log("User found");

        console.log("Finding token");
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) {
            console.log("Token not found");
            return res.status(400).send({ message: "Invalid link" });
        }
        console.log("Token found");

        console.log("Link verified successfully");
        res.status(200).send("Valid Url");
    } catch (error) {
        console.error("Error in verifying password reset link:", error);
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});

//  set new password
router.post("/:id/:token", async (req, res) => {
    console.log("Received request to set new password");
    try {
        const passwordSchema = Joi.object({
            password: passwordComplexity().required().label("Password"),
        });
        console.log("Validating password");
        const { error } = passwordSchema.validate(req.body);
        if (error) {
            console.log("Password validation failed:", error.details[0].message);
            return res.status(400).send({ message: error.details[0].message });
        }

        console.log("Finding user with id:", req.params.id);
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            console.log("User not found");
            return res.status(400).send({ message: "Invalid link" });
        }
        console.log("User found");

        console.log("Finding token");
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) {
            console.log("Token not found");
            return res.status(400).send({ message: "Invalid link" });
        }
        console.log("Token found");

        if (!user.verified) {
            console.log("User was not verified, setting verified to true");
            user.verified = true;
        }

        console.log("Generating salt for password hashing");
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        console.log("Hashing password");
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        console.log("Updating user password");
        user.password = hashPassword;
        await user.save();
        console.log("User password updated");

        console.log("Deleting used token");
        await Token.deleteOne({ _id: token._id });
        console.log("Token deleted");

        console.log("Password reset successful");
        res.status(200).send({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Error in setting new password:", error);
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = router;